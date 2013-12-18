class __View.Travel extends Monocle.View

  places = undefined

  container: "section #travelList_list"

  template  : """ 
    <li class="thumb arrow selectable" data-view-section="travelDetails_s">                
        <div>
            <strong>{{ origin }} - {{ destination }}</strong>
            <small>{{ date }}</small>
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
    @model.date = date + time
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
