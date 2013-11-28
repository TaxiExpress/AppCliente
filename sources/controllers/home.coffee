class __Controller.HomeCtrl extends Monocle.Controller

  map = undefined                     #El mapa

  elements:
    "#refresh"                        : "button_refresh"
    "#streetField"                    : "streetField"

  events:
    "singleTap #taxis_b"              : "showTaxis"
    "singleTap #map_b"                : "showMap"
    "singleTap #filters"              : "showFilters"
    "singleTap #refresh"              : "refresh"

  pull_panel = new Lungo.Element.Pull("#taxis_a",
    onPull: "Deslizar para abajo para refrescar" #Text on pulling
    onRelease: "Suelta para recargar" #Text on releasing
    onRefresh: "Cargando..." #Text on refreshing
    callback: -> #Action on refresh
      alert "Lista actualizada!"
      pull_panel.hide()
  )

  constructor: ->
    super

  showFilters: (event) =>
    console.log "MUESTRO FIlTROS"

  showTaxis: (event) =>
    console.log "CLICK TAXI"

  refresh: (event) =>
    console.log "CLICK REFRESH"
    @streetField[0].value = 'Buscando ...'
    if navigator.geolocation
      navigator.geolocation.getCurrentPosition refrescar
    else
      Lungo.Notification.show "GPS NO HABILITADO"
    
  refrescar = (location) ->
    currentLocation = new google.maps.LatLng(location.coords.latitude, location.coords.longitude)
    map.setCenter(currentLocation)
    positioner(currentLocation)

  showMap: (event) =>
    console.log "CLICK MAP"
    Lungo.Notification.show()
    if navigator.geolocation
      navigator.geolocation.getCurrentPosition initialize
    else
      Lungo.Notification.show "GPS NO HABILITADO"
   
  initialize = (location) =>
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
      map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions)
      positioner(currentLocation)
      google.maps.event.addListener map, "dragend", (event) ->
        positioner(map.getCenter())
      google.maps.event.addListener map, "zoom_changed", (event) ->
        positioner(map.getCenter())
    Lungo.Notification.hide()


  positioner = (pos) =>
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
