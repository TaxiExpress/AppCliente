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
   
  constructor: ->
    super
    date = @model.starttime.getDate()+"/"+(1+@model.starttime.getMonth())+"/"+@model.starttime.getFullYear()+" "
    time = @model.starttime.toISOString().substring 11, 16
    @model.date = date + time
    @prepend @model


  onView: (event) ->
    __Controller.travelDetails.loadTravelDetails(@model)
