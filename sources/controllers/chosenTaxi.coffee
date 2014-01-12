class __Controller.ChosenTaxiCtrl extends Monocle.Controller

  driverDetails = undefined

  elements:
    "#chosenTaxi_name"                              : "name"
    "#chosenTaxi_valuation"                         : "valuation"
    "#chosenTaxi_image"                             : "image"
    "#chosenTaxi_model"                             : "model"
    "#chosenTaxi_plate"                             : "plate"
    "#chosenTaxi_capacity"                          : "capacity"
    "#chosenTaxi_accessible"                        : "accessible"
    "#chosenTaxi_animals"                           : "animals"
    "#chosenTaxi_appPayment"                        : "appPayment"

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
    @accessible[0].innerText = "No"
    @accessible[0].innerText = "Si" if driver.accessible
    @animals[0].innerText = "No"
    @animals[0].innerText = "Si" if driver.animals
    @appPayment[0].innerText = "No"
    @appPayment[0].innerText = "Si" if driver.appPayment


  requestTaxi: (event) =>
    Lungo.Router.section "waiting_s"