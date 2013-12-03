class __Controller.HomeCtrl extends Monocle.Controller

  map = undefined                     #El mapa

  elements:
    "#refresh"                        : "button_refresh"
    "#streetField"                    : "streetField"

  events:
    "singleTap #refresh"              : "refresh"
    "singleTap #confirm"              : "confirm"

  constructor: ->
    super
    if navigator.geolocation
      options =
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 5000
      navigator.geolocation.getCurrentPosition initialize, manageErrors

  manageErrors = (err) ->
    alert "Error de localización GPS"
    #navigator.geolocation.getCurrentPosition initialize, manageErrors

  refresh: (event) =>
    console.log "CLICK REFRESH"
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
    console.log "LOCALIZACION CONFIRMADA"
    Lungo.Notification.confirm
      title: "¿Qué taxi desea?"
      description: "Seleccione la opción que  más le convenga"
      accept:
        label: "El más cercano"
        callback: ->
          alert "Yes!"
      cancel:
        label: "Elegir taxi"
        callback: ->
          Lungo.Router.section "list_s"

  initialize = (location) =>
    Lungo.Router.section "home_s"
    if map== undefined
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
        streetField.value = 'Localizando ...'
      google.maps.event.addListener map, "zoom_changed", (event) ->
        getStreet(map.getCenter())
    Lungo.Notification.hide()


  getStreet = (pos) =>
    geocoder = new google.maps.Geocoder()
    geocoder.geocode
      latLng: pos
    , (results, status) ->
      if status is google.maps.GeocoderStatus.OK
        if results[1]
          streetField.value = results[0].address_components[1].short_name + ", " +results[0].address_components[0].short_name
        else
          streetField.value = 'Calle desconocida'
      else
        streetField.value = 'Calle desconocida'
