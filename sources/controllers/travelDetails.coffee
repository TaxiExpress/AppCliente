class __Controller.TravelDetailsCtrl extends Monocle.Controller

  driverDetails = undefined

  elements:
    "#travelDetails_start"                             : "start"
    "#travelDetails_end"                               : "end"
    "#travelDetails_date"                              : "date"
    "#travelDetails_time"                              : "time"
    "#travelDetails_cost"                              : "cost"
    "#travelDetails_driver"                            : "driver"

  events:
    "singleTap #travelDetails_driver"                  : "viewDriver"

  constructor: ->
    super
    
  loadTravelDetails: (travel) =>
    @showMap(travel)
    @start[0].innerText = travel.origin
    @end[0].innerText = travel.destination
    @date[0].innerText = travel.date
    @time[0].innerText = (travel.endtime - travel.starttime) / 60000 + " minutos"
    @cost[0].innerText = "35 €"
    @driverDetails = travel.driver
    @changeValoration()
    @driver[0].src = travel.driver.image
  
  showMap: (travel) =>
    directionsService = new google.maps.DirectionsService()
    directionsDisplay = new google.maps.DirectionsRenderer()
    map = new google.maps.Map(document.getElementById("map-canvas2"),
      mapTypeId: google.maps.MapTypeId.ROADMAP
      panControl: false
      streetViewControl:false
      overviewMapControl:false
      mapTypeControl:false
      zoomControl:false
      styles: [
        featureType: "all"
        elementType: "labels"
        stylers: [visibility: "off"]
      ]
    )
    directionsDisplay.setMap map
    bounds = new google.maps.LatLngBounds()
    origin = new google.maps.LatLng(travel.startpoint.nb, travel.startpoint.ob)
    destination = new google.maps.LatLng(travel.endpoint.nb, travel.endpoint.ob)
    bounds.extend(origin)
    bounds.extend(destination)
    map.fitBounds(bounds)

    request = 
      origin: origin
      destination: destination
      travelMode: google.maps.DirectionsTravelMode.DRIVING

    directionsService.route request, (response, status) ->
      directionsDisplay.setDirections response  if status is google.maps.DirectionsStatus.OK

  changeValoration: =>
    val = ""
    i = 0
    while i < @driverDetails.valoration
      val = val + "★"
      i++
    while i < 5
      val = val + "☆"
      i++
    @driverDetails.valoration = val

  viewDriver: (event) =>
    __Controller.favDriver.loadDriverDetails(@driverDetails)
    Lungo.Router.section "favDriver_s"