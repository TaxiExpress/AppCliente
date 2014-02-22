class __Controller.NearDriverCtrl extends Monocle.Controller

  _viewsList = []
  position = undefined
  requested = undefined

  events:
     "singleTap #list_refresh_b"              : "loadNearTaxis"

  constructor: ->
    super
    @requested = false


  loadNearTaxis: =>
    if !@requested
      @requested = true
      @deleteNearTaxis()
      Lungo.Router.section "list_s"
      credentials = Lungo.Cache.get "credentials"
      position = Lungo.Cache.get "geoPosition"
      server = Lungo.Cache.get "server"
      session = Lungo.Cache.get "session"
      $$.ajax
        type: "GET"
        url: server + "client/getneartaxies"
        data:
          email: credentials.email
          longitude: position.e
          latitude: position.d
          sessionID: session
        error: (xhr, type) =>
          console.log type.response
        success: (result) =>
          if result.length == 0
            empty_nearTaxies.style.display = "block"
          else
            empty_nearTaxies.style.display = "none"
          @position = Lungo.Cache.get "geoPosition"
          cont = 0
          lastDriver = false
          for taxi in result
            email = taxi.email
            name = taxi.first_name
            surname = taxi.last_name
            valuation = taxi.valuation
            coords = taxi.geom.substring 7
            pos = coords.indexOf " "
            long = coords.substring 0, pos
            lat = coords.substring pos+1, coords.indexOf ")"
            position = new google.maps.LatLng(long, lat)
            plate = taxi.car.plate
            model = taxi.car.company + " " + taxi.car.model
            if taxi.image != null && taxi.image != ""
              image = taxi.image 
            else image = "img/user.png"
            capacity = taxi.car.capacity
            accessible = taxi.car.accessible
            animals = taxi.car.animals
            appPayment = taxi.car.appPayment
            driver = __Model.NearDriver.create email: email, name: name, surname: surname, position: position, valuation: valuation, plate: plate, model: model, image: image, capacity: capacity, accessible: accessible, animals: animals, appPayment: appPayment
            cont++
            lastDriver = true if result.length == cont
            @getDistanceAndTime(driver, lastDriver)


  deleteNearTaxis: =>
    for nearDriver in __Model.NearDriver.all()
      _viewsList[nearDriver.email].remove()
      _viewsList[nearDriver.email] = undefined
      nearDriver.destroy()


  getDistanceAndTime: (driver, lastDriver) =>
    directionsService = new google.maps.DirectionsService()
    request =
      origin: new google.maps.LatLng(driver.position.d, driver.position.e )
      destination: new google.maps.LatLng(@position.d, @position.e)
      travelMode: google.maps.DirectionsTravelMode.DRIVING
    directionsService.route request, (response, status) =>
      distance = 0
      time = 0
      driver.distance = distance
      driver.time = time+1
      if status is google.maps.DirectionsStatus.OK
        distance = (response.routes[0].legs[0].distance.value/1000).toFixed(2)
        time = Math.round(response.routes[0].legs[0].duration.value/60)
        driver.distance = distance
        driver.time = time+1
        driver.save()
      else
        driver.destroy()
      setTimeout((=> @showTaxies()) , 50) if lastDriver


  showTaxies: =>
    taxies = __Model.NearDriver.all().sort (a, b) ->
      parseFloat(a.distance) - parseFloat(b.distance)
    for driver in taxies
      _viewsList[driver.email] = new __View.NearDriverList model: driver
    @requested = false
