class __Controller.FavDriverCtrl extends Monocle.Controller

  driverDetails = undefined

  elements:
    "#favDriver_name"                              : "name"
    "#favDriver_valuation"                         : "valuation"
    "#favDriver_image"                             : "image"
    "#favDriver_model"                             : "model"
    "#favDriver_plate"                             : "plate"
    "#favDriver_capacity"                          : "capacity"
    "#favDriver_accessible"                        : "accessible"
    "#favDriver_animals"                           : "animals"
    "#favDriver_favorite"                          : "favorite"
    "#favDriver_phone"                             : "phone"
    "#favDriver_appPayment"                        : "appPayment"

  events:
    "change #favDriver_favorite"                   : "changeFavorite"
    "singleTap #favDriver_phone"                   : "call"

  constructor: ->
    super
    
  loadDriverDetails: (driver) =>
    @driverDetails = driver
    @phone[0].href = "tel:"+driver.phone
    @name[0].innerText = driver.name + " " + driver.surname
    @valuation[0].innerText = driver.valuationStars
    @model[0].innerText = driver.model
    @plate[0].innerText = driver.plate
    @capacity[0].innerText = driver.capacity
    @accessible[0].innerText = "No"
    @accessible[0].innerText = "Si" if driver.accessible
    @appPayment[0].innerText = "No"
    @appPayment[0].innerText = "Si" if driver.appPayment
    @animals[0].innerText = "No"
    @animals[0].innerText = "Si" if driver.animals 
    if driver.image
      @image[0].src = driver.image
    else
      @image[0].src = "img/user.png"
    if __Model.FavoriteDriver.get(driver.email)[0] != undefined
      @favorite[0].checked = true
    else  @favorite[0].checked = false


  changeFavorite: (event) =>
    server = Lungo.Cache.get "server"
    credentials = Lungo.Cache.get "credentials"
    data = 
      customerEmail: credentials.email
      driverEmail: @driverDetails.email
    if @favorite[0].checked
      $$.ajax
        type: "POST"
        url: server + "client/addfavorite"
        data: data
        success: (result) =>
          @addFavorite result
        error: (xhr, type) =>
          @
    else 
      $$.ajax
        type: "POST"
        url: server + "client/removefavorite"
        data: data
        success: (result) =>
          @removeFavorite result
        error: (xhr, type) =>
          @

  addFavorite: (result) =>
    __Controller.favorites.addFavorite(@driverDetails)

  removeFavorite: (result) =>
    __Controller.favorites.deleteFavorite(@driverDetails)

