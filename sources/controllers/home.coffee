class __Controller.HomeCtrl extends Monocle.Controller

  map = undefined                     #El mapa

  elements:
    "#home_refresh_b"                        : "button_refresh"
    "#home_streetField"                      : "streetField"
    "#home_driver"                           : "driver"

  events:
    "singleTap #home_refresh_b"              : "refresh"
    "singleTap #home_confirm_b"              : "confirm"
    "singleTap #map-canvas"                  : "hideAside"

  constructor: ->
    super
    if navigator.geolocation
      options =
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      navigator.geolocation.getCurrentPosition initialize, manageErrors

  manageErrors = (err) ->
    alert "Error de localización GPS"
    setTimeout((=> navigator.geolocation.getCurrentPosition initialize, manageErrors) , 5000)

  refresh: (event) =>
    Lungo.Aside.hide()
    @streetField[0].value = 'Localizando ...'
    if navigator.geolocation
      options =
        enableHighAccuracy: false,
        timeout: 5000,
        maximumAge: 0
      navigator.geolocation.getCurrentPosition updatePosition, manageErrors
    
  updatePosition = (location) ->
    currentLocation = new google.maps.LatLng(location.coords.latitude, location.coords.longitude)
    map.setCenter(currentLocation)
    getStreet(currentLocation)

  confirm: (event) =>
    Lungo.Aside.hide()
    Lungo.Notification.confirm
      title: "¿Qué taxi desea?"
      description: "Seleccione la opción que  más le convenga"
      accept:
        label: "El más cercano"
        callback: =>
          @showAsigning()
      cancel:
        label: "Elegir taxi"
        callback: =>
          @loadNearTaxis()
  
  showAsigning: =>
    Lungo.Notification.hide()
    setTimeout((=> 
      Lungo.Notification.html '<h2>Esperando la confirmación del taxi</h2>', 'Cancelar'
    ) , 250)

  hideAside: (event) =>
    Lungo.Aside.hide()

  initialize = (location) =>
    Lungo.Router.section "home_s"
    if map == undefined
      currentLocation = new google.maps.LatLng(location.coords.latitude, location.coords.longitude)
      mapOptions =
        center: currentLocation
        zoom: 16
        mapTypeId: google.maps.MapTypeId.ROADMAP
        panControl: false
        streetViewControl:false
        overviewMapControl:false
        mapTypeControl:false
        zoomControl:false
        styles: [
          featureType: "poi.business"
          elementType: "labels"
          stylers: [visibility: "off"]
        ]
      map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions)
      getStreet(currentLocation)
      google.maps.event.addListener map, "dragend", (event) ->
        getStreet(map.getCenter())
      google.maps.event.addListener map, "dragstart", (event) ->
        home_streetField.value = 'Localizando ...'
      google.maps.event.addListener map, "zoom_changed", (event) ->
        getStreet(map.getCenter())

  getStreet = (pos) =>
    geocoder = new google.maps.Geocoder()
    geocoder.geocode
      latLng: pos
    , (results, status) =>
      if status is google.maps.GeocoderStatus.OK
        if results[1]
          home_streetField.value = results[0].address_components[1].short_name + ", " +results[0].address_components[0].short_name
        else
          home_streetField.value = 'Calle desconocida'
      else
        home_streetField.value = 'Calle desconocida'

  loadNearTaxis: =>
    i = 0
    while i < 4
      license = "DDAS65DAS" + i.toString()
      name = "Taxista "
      surname = i.toString()
      valoration = (i % 5) + 1
      position = new google.maps.LatLng(43.271239,-2.9445875)
      plate = "DVT 78" + i.toString()
      model = "Opel Corsa"
      image = "http://www.futbolsalaragon.com/imagenes/alfonsorodriguez2012.JPG"
      capacity = 4
      accesible = false
      animals = false
      appPayment = (i % 4 == 0)
      i++
      __Model.Driver.create license: license, name: name, surname: surname, valoration: valoration, position: position, plate: plate, model: model, image: image, capacity: capacity, accesible: accesible, animals: animals, appPayment: appPayment
    __Controller.nearDriver.loadNearTaxis()
    Lungo.Router.section "list_s"
