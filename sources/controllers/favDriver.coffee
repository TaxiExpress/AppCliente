class __Controller.FavDriverCtrl extends Monocle.Controller

  driverDetails = undefined

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
    "#favDriver_favorite"                          : "favorite"

  events:
    "change #favDriver_favorite"                   : "changeFavorite"

  constructor: ->
    super
    
  loadDriverDetails: (driver) =>
    @driverDetails = driver
    @name[0].innerText = driver.name + " " + driver.surname
    @valoration[0].innerText = driver.valorationStars
    @image[0].src = driver.image
    @license[0].innerText = driver.license
    @model[0].innerText = driver.model
    @plate[0].innerText = driver.plate
    @capacity[0].innerText = driver.capacity
    @accesible[0].innerText = "No"
    @accesible[0].innerText = "Si" if driver.accesible
    @animals[0].innerText = "No"
    @animals[0].innerText = "Si" if driver.animals 
    if __Model.FavoriteDriver.get(driver.license)[0] != undefined
        @favorite[0].checked = true
    else  @favorite[0].checked = false


  changeFavorite: (event) =>
    server = Lungo.Cache.get "server"
    credentials = Lungo.Cache.get "credentials"
    data = 
        customerEmail: credentials.email
        license: @driverDetails.license
    if @favorite[0].checked
        url = server + "client/addFavoriteDriver"
        #Lungo.Service.post(url, data, @addFavorite, "json")
        @addFavorite ""
    else 
        url = server + "client/removeFavoriteDriver"
        #Lungo.Service.post(url, data, @removeFavorite, "json")
        @removeFavorite ""

  addFavorite: (result) =>
    __Controller.favorites.addFavorite(@driverDetails)

  removeFavorite: (result) =>
    __Controller.favorites.deleteFavorite(@driverDetails)

