class __Controller.ChosenTaxiCtrl extends Monocle.Controller

  driverDetails = undefined

  elements:
    "#chosenTaxi_name"                              : "name"
    "#chosenTaxi_valuation"                         : "valuation"
    "#chosenTaxi_image"                             : "image"
    "#chosenTaxi_model"                             : "model"
    "#chosenTaxi_plate"                             : "plate"
    "#chosenTaxi_capacity"                          : "capacity"
    "#chosenTaxi_accesible"                         : "accesible"
    "#chosenTaxi_animals"                           : "animals"

  events:
    "singleTap #chosenTaxi_request"                 : "requestTaxi"

  constructor: ->
    super
    
  loadDriverDetails: (driver) =>
    @driverDetails = driver
    @name[0].innerText = driver.name + " " + driver.surname
    @valuation[0].innerText = driver.valuationStars
    @image[0].src = driver.image
    @model[0].innerText = driver.model
    @plate[0].innerText = driver.plate
    @capacity[0].innerText = driver.capacity
    @accesible[0].innerText = "No"
    @accesible[0].innerText = "Si" if driver.accesible
    @animals[0].innerText = "No"
    @animals[0].innerText = "Si" if driver.animals

  requestTaxi: (event) =>
    console.log "solicito taxi"