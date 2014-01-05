class __View.NearDriverList extends Monocle.View

  container: "section #nearList_a"

  template  : """ 
  		<li class="thumb arrow selectable" data-view-section="chosenTaxi_s">                
          <div class="on-right">{{time}} mins aprox</div>
          <img src="{{image}}" alt="" />
          <div>
              <strong>a {{distance}} km</strong>
              <small>{{name}} {{surname}}</small>
              <small><strong>{{valuationStars}}</strong></small>
          </div>
          {{#appPayment}}<span data-icon="credit-card">
            <span class="icon credit-card"></span>
          </span>{{/appPayment}}
      </li>
  """

  events:
    "singleTap li"                      :  "onView"
   
  constructor: ->
    super
    val = ""
    i = 0
    while i < @model.valuation
      val = val + "★"
      i++
    while i < 5
      val = val + "☆"
      i++
    @getDistanceAndTime()
    @model.valuationStars = val

  onView: (event) ->
    __Controller.chosenTaxi.loadDriverDetails(@model)
    Lungo.Router.section "chosenTaxi_s"

  getDistanceAndTime: =>
    position = Lungo.Cache.get "geoPosition"
    wp = new Array()
    wp[0] = new google.maps.LatLng(@model.position.nb, @model.position.ob)
    wp[1] = new google.maps.LatLng(position.nb, position.ob)

    directionsService = new google.maps.DirectionsService()
    request =
      origin: wp[0]
      destination: wp[1]
      travelMode: google.maps.DirectionsTravelMode.DRIVING

    directionsService.route request, (response, status) =>
      if status is google.maps.DirectionsStatus.OK
        @model.distance = (response.routes[0].legs[0].distance.value/1000).toFixed(2)
        @model.time = Math.round(response.routes[0].legs[0].duration.value/60)
        @prepend @model

