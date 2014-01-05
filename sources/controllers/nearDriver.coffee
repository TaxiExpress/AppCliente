class __Controller.NearDriverCtrl extends Monocle.Controller

  _viewsList = []

  constructor: ->
    super

  loadNearTaxis: =>
    @deleteNearTaxis()
    position = Lungo.Cache.get "geoPosition"
    server = Lungo.Cache.get "server"
    $$.ajax
      type: "GET"
      url: server + "client/getTaxis"
      data:
        longitud: position.nb
        latitud: position.ob
      error: (xhr, type) =>
        console.log type.response
      success: (result) =>
        taxi = result
        #for taxi in result
        email = taxi.email
        name = taxi.first_name
        surname = taxi.last_name
        valuation = taxi.valuation
        position = new google.maps.LatLng(43.271239,-2.9445875)
        plate = taxi.car.plate
        model = taxi.car.company + " " + taxi.car.model
        if taxi.image != null && taxi.image != undefined
          image = taxi.image 
        else image = "img/user.png"
        capacity = taxi.car.capacity
        accesible = taxi.car.accesible
        animals = taxi.car.animals
        appPayment = taxi.car.appPayment
        driver = __Model.NearDriver.create email: email, name: name, surname: surname, position: position, valuation: valuation, plate: plate, model: model, image: image, capacity: capacity, accesible: accesible, animals: animals, appPayment: appPayment
        _viewsList[taxi.email] = new __View.NearDriverList model: driver      

  deleteNearTaxis: =>
    for nearDriver in __Model.NearDriver.all()
      _viewsList[nearDriver.email].remove() if _viewsList[nearDriver.email]
      _viewsList[nearDriver.email] = undefined
