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
    @model.valuationStars = val
    @append @model

  onView: (event) ->
    __Controller.chosenTaxi.loadDriverDetails(@model)
    Lungo.Router.section "chosenTaxi_s"