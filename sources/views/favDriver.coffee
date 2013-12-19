class __View.FavDriver extends Monocle.View

  container: "section #favorites_list"

  template  : """ 
  		<li class="thumb arrow selectable" data-view-section="favDriver_s">                
          <img src="{{ image }}" alt="" />
          <div>
              <strong>{{ name }} {{ surname }}</strong>
              <small><strong>{{ valorationStars }}</strong></small>
          </div>
      </li>
  """

  events:
    "singleTap li"              :  "onView"
   
  constructor: ->
    super
    val = ""
    i = 0
    while i < @model.valoration
      val = val + "★"
      i++
    while i < 5
      val = val + "☆"
      i++
    @model.valorationStars = val
    @prepend @model

  onView: (event) ->
    __Controller.favDriver.loadDriverDetails(@model)
