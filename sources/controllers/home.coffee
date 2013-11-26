class __Controller.HomeCtrl extends Monocle.Controller

  map = undefined                     #El mapa
  myPosition = undefined              #myPosition
  currentLocation = undefined         #Mis coordenadas
  bounds = undefined                  #Variable que establece el zoom para que entren todos los marker
  poi_me = undefined
  poi_taxi = undefined

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
    google.maps.visualRefresh = true
    poi_me = new google.maps.MarkerImage("img/poi1.png", null, null, new google.maps.Point(24,48));
    poi_taxi = new google.maps.MarkerImage("img/poi2.png", null, null, new google.maps.Point(25,25));

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
      alert("navigator.geolocation is not available");

  refrescar = (location) =>
    currentLocation = new google.maps.LatLng(location.coords.latitude, location.coords.longitude)
    map.setCenter(currentLocation)
    positioner(currentLocation)

  showMap: (event) =>
    console.log "CLICK MAP"
    Lungo.Notification.show()
    if navigator.geolocation
      navigator.geolocation.getCurrentPosition initialize
    else
      alert("navigator.geolocation is not available");
   
  initialize = (location) =>
    if map== undefined
      currentLocation = new google.maps.LatLng(location.coords.latitude, location.coords.longitude)
      mapOptions =
        center: currentLocation
        zoom: 17
        mapTypeId: google.maps.MapTypeId.ROADMAP
        panControl: false
        streetViewControl:false
        overviewMapControl:false
        mapTypeControl:false
        zoomControl:false
      map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions)
      positioner(currentLocation)
      i = 1
      while i < 6
        pos = new google.maps.LatLng(location.coords.latitude+(i*0.001), location.coords.longitude)
        marker = new google.maps.Marker(
          position: pos
          icon: poi_taxi
          map: map
        )
        google.maps.event.addListener marker, "click", ((marker, i) ->
          ->
            Lungo.Router.section "chosenTaxi_s"
        )(marker, i)        
        i++
      google.maps.event.addListener map, "dragend", (event) ->
        positioner(map.getCenter())
    Lungo.Notification.hide()

  positioner = (pos) =>
    geocoder = new google.maps.Geocoder()
    geocoder.geocode
      latLng: pos
    , (results, status) ->
      if status is google.maps.GeocoderStatus.OK
        if results[1]
          #marker = new google.maps.Marker(
          #  position: pos
          #  map: map
          #)
          streetField.value = results[0].address_components[1].short_name + ", " +results[0].address_components[0].short_name
        else
          alert "No results found"
      else
        alert "Geocoder failed due to: " + status
