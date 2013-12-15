class __View.Travel extends Monocle.View

  places = undefined

  container: "section #travelList_list"

  template  : """ 
    <li class="thumb arrow selectable" data-view-section="travelDetails_s">                
        <div>
            <strong>{{ origin }} - {{ target }}</strong>
            <small>{{ starttime }}</small>
        </div>
    </li>
  """

  events:
    "singleTap li"              :  "onView"
    "swipeLeft li"              :  "deleteTravel"
   
  constructor: ->
    super
    date = @model.starttime.getDate()+"/"+(1+@model.starttime.getMonth())+"/"+@model.starttime.getFullYear()+" "
    time = @model.starttime.toISOString().substring 11, 16
    @model.starttime = date + time
    @getStreet(@model.startpoint)
    @model.origin = @places
    @model.target = @places
    @append @model

  onView: (event) ->
    __Controller.travelDetails.loadTravelDetails(@model)

  deleteTravel: (event) ->
    Lungo.Notification.confirm
      icon: "road"
      title: "Eliminar viaje"
      description: "¿Desea eliminar este viaje?"
      accept:
        label: "Sí"
        callback: =>
          __Controller.travelList.deleteTravel(@model)
      cancel:
        label: "No"
        callback: ->
          @

  getStreet: (pos) =>
    geocoder = new google.maps.Geocoder()
    geocoder.geocode
      latLng: pos
    , (results, status) =>
      result = ""
      if status is google.maps.GeocoderStatus.OK
        if results[1]
          console.log results[1].address_components[1].short_name 
