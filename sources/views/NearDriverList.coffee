class __View.NearDriverList extends Monocle.View

  container: "section #nearList_a"

  template  : """ 
  		<li class="thumb arrow selectable" data-view-section="chosenTaxi_s">                
          <div class="on-right">1 minuto</div>
          <img src="{{image}}" alt="" />
          <div>
              <strong>a 402 metros</strong>
              <small>{{name}} {{surname}}</small>
              <small><strong>{{valorationStars}}</strong></small>
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
    while i < @model.valoration
      val = val + "★"
      i++
    while i < 5
      val = val + "☆"
      i++
    @model.valorationStars = val
    @prepend @model

  onView: (event) ->
    __Controller.chosenTaxi.loadDriverDetails(@model)
    Lungo.Router.section "chosenTaxi_s"