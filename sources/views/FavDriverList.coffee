class __View.FavDriverList extends Monocle.View

  container: "section #favoritesList_a"

  template  : """ 
  		<li class="thumb arrow selectable">                
          <img src="{{ image }}" alt="" />
          <div>
              <strong>{{ name }} {{ surname }}</strong>
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
    @model.valuationStars = val
    @prepend @model


  onView: (event) ->
    __Controller.chosenTaxi.loadDriverDetails(@model)
    Lungo.Router.section "chosenTaxi_s"