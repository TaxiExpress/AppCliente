class __Controller.HomeCtrl extends Monocle.Controller

  map = undefined
  position = undefined
  timer = undefined

  elements:
    "#home_refresh_b"                        : "button_refresh"
    "#home_streetField"                      : "streetField"
    "#home_driver"                           : "driver"
    "#home_photo"                            : "poi"

  events:
    "singleTap #home_driver"                 : "payTaxi"
    "singleTap #home_refresh_b"              : "refresh"
    "singleTap #home_confirm_b"              : "confirm"
    "singleTap #map-canvas"                  : "hideAside"

  constructor: ->
    super
    @setPhotoPoi __Controller.menu.getPhoto()
    if navigator.geolocation
      options =
        enableHighAccuracy: false,
        timeout: 7000,
        maximumAge: 0
      navigator.geolocation.getCurrentPosition initialize, manageErrors, options


  manageErrors = (err) ->
    setTimeout((=> 
      navigator.notification.alert "Error al obtener la posicion GPS", reconnect, "Taxi Express", "Reintentar"
    ) , 5000)

  reconnect =  ->
    navigator.geolocation.getCurrentPosition initialize, manageErrors    

  refresh: (event) =>
    Lungo.Aside.hide()
    @streetField[0].value = 'Localizando ...'
    if navigator.geolocation
      options =
        enableHighAccuracy: false,
        timeout: 7000,
        maximumAge: 0
      navigator.geolocation.getCurrentPosition updatePosition, manageErrors, options


  updatePosition = (location) ->
    currentLocation = new google.maps.LatLng(location.coords.latitude, location.coords.longitude)
    map.setCenter(currentLocation)
    getStreet(currentLocation)


  confirm: (event) =>
    Lungo.Aside.hide()
    onConfirm = (button) =>
      switch button
        when 1
          @getTaxi()
        when 2
          __Controller.nearDriver.loadNearTaxis()
        when 3
          @
      return
    navigator.notification.confirm "Seleccione la opción que  más le convenga", onConfirm, "¿Qué taxi desea?", "El más cercano,Elegir taxi, Cancelar"


  hideAside: (event) =>
    Lungo.Aside.hide()


  initialize = (location) =>
    Lungo.Router.section "home_s"
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
      google.maps.event.addListener map, "idle", (event) ->
        getStreet(map.getCenter())
      google.maps.event.addListener map, "dragstart", (event) ->
        home_streetField.value = 'Localizando ...'
      setTimeout((=> navigator.splashscreen.hide()) , 500)


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
          Lungo.Cache.remove "origin"
          Lungo.Cache.set "origin", home_streetField.value
        else
          home_streetField.value = 'Calle desconocida'
      else
        home_streetField.value = 'Calle desconocida'


  getTaxi: =>
    credentials = Lungo.Cache.get "credentials"
    position = Lungo.Cache.get "geoPosition"
    server = Lungo.Cache.get "server"
    session = Lungo.Cache.get "session"
    origin = Lungo.Cache.get "origin"
    $$.ajax
      type: "POST"
      url: server + "client/gettaxi"
      data:
        email: credentials.email
        longitude: position.e
        latitude: position.d
        origin: origin
        sessionID: session
      error: (xhr, type) =>
        navigator.notification.alert type.response, null, "Taxi Express", "Aceptar"
      success: (result) =>
        travelID = result.travelID
        Lungo.Cache.set "travelID", travelID
        Lungo.Cache.remove "travelAccepted"
        Lungo.Cache.set "travelAccepted", false
        Lungo.Router.section "waiting_s"
        @timer = setTimeout((=> 
          if !Lungo.Cache.get "travelAccepted"
            $$.ajax
              type: "POST"
              url: server + "client/canceltravel"
              data:
                email: credentials.email
                sessionID: session
                travelID: travelID.toString()
              error: (xhr, type) =>
                Lungo.Router.back()
                navigator.notification.alert type.response, null, "Taxi Express", "Aceptar"
              success: (result) =>
                Lungo.Cache.remove "travelID"
                Lungo.Cache.set "travelAccepted", false
                Lungo.Router.back()
                navigator.notification.alert "Ningún taxista cercano ha aceptado la solicitud", null, "Taxi Express", "Aceptar"
        ) , 30000)


  payTaxi: (event) =>
    Lungo.Router.section "payment_s"

  setPhotoPoi: (photo) =>
    @poi[0].src = photo

  cancelTimeOut: =>
    clearTimeout(@timer);
