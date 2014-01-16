class __Controller.HomeCtrl extends Monocle.Controller

  map = undefined
  position = undefined

  elements:
    "#home_refresh_b"                        : "button_refresh"
    "#home_streetField"                      : "streetField"
    "#home_driver"                           : "driver"

  events:
    "singleTap #home_driver"                 : "payTaxi"
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
          @getTaxi()
      cancel:
        label: "Elegir taxi"
        callback: =>
          __Controller.nearDriver.loadNearTaxis()


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
          featureType: "poi"
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
    Lungo.Cache.set "geoPosition", pos
    geocoder = new google.maps.Geocoder()
    geocoder.geocode
      latLng: pos
    , (results, status) =>
      if status is google.maps.GeocoderStatus.OK
        if results[1]
          if results[0].address_components[1].short_name == results[0].address_components[0].short_name
            home_streetField.value = results[0].address_components[1].short_name
          else home_streetField.value = results[0].address_components[1].short_name + ", " +results[0].address_components[0].short_name
        else
          home_streetField.value = 'Calle desconocida'
      else
        home_streetField.value = 'Calle desconocida'


  getTaxi: =>
    credentials = Lungo.Cache.get "credentials"
    position = Lungo.Cache.get "geoPosition"
    server = Lungo.Cache.get "server"
    $$.ajax
      type: "GET"
      url: server + "client/gettaxi"
      data:
        email: credentials.email
        longitud: position.d
        latitud: position.e
      error: (xhr, type) =>
        console.log type.response
      success: (result) =>
        console.log result
        Lungo.Router.section "waiting_s"


  payTaxi: (event) =>
    Lungo.Router.section "payment_s"


