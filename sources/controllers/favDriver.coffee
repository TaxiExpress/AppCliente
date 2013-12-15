class __Controller.FavDriverCtrl extends Monocle.Controller

  elements:
    "#favDriver_name"                              : "name"
    "#favDriver_valoration"                        : "valoration"
    "#favDriver_image"                             : "image"
    "#favDriver_license"                           : "license"
    "#favDriver_model"                             : "model"
    "#favDriver_plate"                             : "plate"
    "#favDriver_capacity"                          : "capacity"
    "#favDriver_accesible"                         : "accesible"
    "#favDriver_animals"                           : "animals"

  constructor: ->
    super
    
  loadDriverDetails: (driver) =>
    @name[0].innerText = driver.name + " " + driver.surname
    @valoration[0].innerText = driver.valoration
    @image[0].src = driver.image
    @license[0].innerText = driver.license
    @model[0].innerText = driver.model
    @plate[0].innerText = driver.plate
    @capacity[0].innerText = driver.capacity
    @accesible[0].innerText = "No"
    @accesible[0].innerText = "Si" if driver.accesible
    @animals[0].innerText = "No"
    @animals[0].innerText = "Si" if driver.animals 