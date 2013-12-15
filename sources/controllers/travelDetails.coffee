class __Controller.TravelDetailsCtrl extends Monocle.Controller

  elements:
    "#travelDetails_description"                              : "description"

  constructor: ->
    super
    
  loadTravelDetails: (travel) =>
  	console.log "llego"