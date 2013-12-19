class __View.FavDriverList extends Monocle.View

  container: "section #favoritesList_a"

  template  : """ 
  		<li class="thumb arrow selectable" data-view-section="chosenTaxi_s">                
          <img src="{{ image }}" alt="" />
          <div>
              <strong>{{ name }} {{ surname }}</strong>
              <small><strong>{{valorationStars}}</strong></small>
          </div>
          <span data-icon="credit-card" />
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
    @append @model

  onView: (event) ->
