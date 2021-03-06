class __Controller.TravelDetailsCtrl extends Monocle.Controller

  driverDetails = undefined
  travel = undefined

  elements:
    "#travelDetails_start"                             : "start"
    "#travelDetails_end"                               : "end"
    "#travelDetails_date"                              : "date"
    "#travelDetails_time"                              : "time"
    "#travelDetails_cost"                              : "cost"
    "#travelDetails_driver"                            : "driver"
    "#travelDetails_positiveVote"                      : "votePos"
    "#travelDetails_negativeVote"                      : "voteNeg"
    "#travelDetails_votebox"                      : "voteBox"

  events:
    "singleTap #travelDetails_driver"                  : "viewDriver"
    "singleTap #travelDetails_positiveVote"            : "votePositive"
    "singleTap #travelDetails_negativeVote"            : "voteNegative"

  constructor: ->
    super


  loadTravelDetails: (travel) =>
    @travel = travel
    @showMap travel
    @start[0].innerHTML = travel.origin
    @end[0].innerHTML = travel.destination
    @date[0].innerText = travel.date
    mins = Math.floor((travel.endtime - travel.starttime) / 60000 )+1
    if mins >1 
      @time[0].innerText = mins + " minutos"
    else
      @time[0].innerText = mins + " minuto"
    @cost[0].innerText = (travel.cost.toString().replace ".", ",") + "€"
    @driverDetails = travel.driver
    @changeValuation()
    if travel.driver.image
      @driver[0].src = travel.driver.image
    else
      @driver[0].src = "img/user.png"
    if travel.customervoted
      @voteBox[0].style.visibility = "hidden"
    else
      @voteBox[0].style.visibility = "visible"


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
    origin = new google.maps.LatLng(travel.startpoint.d, travel.startpoint.e)
    destination = new google.maps.LatLng(travel.endpoint.d, travel.endpoint.e)
    bounds.extend(origin)
    bounds.extend(destination)
    map.fitBounds(bounds)
    request = 
      origin: origin
      destination: destination
      travelMode: google.maps.DirectionsTravelMode.DRIVING
    directionsService.route request, (response, status) ->
      directionsDisplay.setDirections response  if status is google.maps.DirectionsStatus.OK


  changeValuation: =>
    val = ""
    i = 0
    while i < @driverDetails.valuation
      val = val + "★"
      i++
    while i < 5
      val = val + "☆"
      i++
    @driverDetails.valuationStars = val


  votePositive: (event) =>
    @vote "positive"


  voteNegative: (event) =>
    @vote "negative"


  viewDriver: (event) =>
    __Controller.favDriver.loadDriverDetails(@driverDetails)
    Lungo.Router.section "favDriver_s"


  vote: (vote) =>
    credentials = Lungo.Cache.get "credentials"
    server = Lungo.Cache.get "server"
    session = Lungo.Cache.get "session"
    data =
      email: credentials.email
      sessionID: session
      vote: vote
      travelID: @travel.id
    $$.ajax
      type: "POST"
      url: server + "client/votedriver"
      data: data
      success: (result) =>
        @voteBox[0].style.visibility = "hidden"
        @travel.customervoted = true
        @travel.save()
        db = window.openDatabase("TaxiExpressNew", "1.0", "description", 4 * 1024 * 1024)
        db.transaction (tx) =>
          sql = "UPDATE travels SET customervoted = 'true' WHERE id ='"+@travel.id+"';"
          tx.executeSql sql
        navigator.notification.alert "Taxista valorado", null, "Taxi Express", "Aceptar"
      error: (xhr, type) =>
        console.log type.response
        navigator.notification.alert "Error al valorar al taxista", null, "Taxi Express", "Aceptar"

