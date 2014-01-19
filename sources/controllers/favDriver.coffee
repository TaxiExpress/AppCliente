class __Controller.FavDriverCtrl extends Monocle.Controller

  db = undefined
  driverDetails = undefined
  date = undefined
  credentials = undefined

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
    @db = window.openDatabase("TaxiExpressNew", "1.0", "description", 4 * 1024 * 1024)
    
    
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
    else @favorite[0].checked = false


  changeFavorite: (event) =>
    server = Lungo.Cache.get "server"
    @credentials = Lungo.Cache.get "credentials"
    @date = new Date().toISOString().substring 0, 19
    @date = @date.replace "T", " "
    session = Lungo.Cache.get "session"
    data = 
      customerEmail: @credentials.email
      driverEmail: @driverDetails.email
      lastUpdateFavorites: @date
      sessionID: session
    if @favorite[0].checked
      $$.ajax
        type: "POST"
        url: server + "client/addfavorite"
        data: data
        success: (result) =>
          __Controller.favorites.addFavorite(@driverDetails)
          @updateLastUpdateFavorite()
          @addFavoriteSQL()
        error: (xhr, type) =>
          @
    else 
      $$.ajax
        type: "POST"
        url: server + "client/removefavorite"
        data: data
        success: (result) =>
          __Controller.favorites.deleteFavorite(@driverDetails)
          @updateLastUpdateFavorite()
          @removeFavoriteSQL()
        error: (xhr, type) =>
          @


  updateLastUpdateFavorite: =>
    @db.transaction (tx) =>
      sql = "UPDATE profile SET lastUpdateFavorites = '"+@date+"' WHERE email ='"+@credentials.email+"';"
      tx.executeSql sql


  addFavoriteSQL: =>
    @db.transaction (tx) =>
      sql = "INSERT INTO favorites  (email, phone, name, surname, valuation, plate, model, image, capacity, accessible, animals, appPayment) 
        VALUES ('"+@driverDetails.email+"','"+@driverDetails.phone+"','"+@driverDetails.name+"','"+@driverDetails.surname+"',
        '"+@driverDetails.valuation+"','"+@driverDetails.plate+"','"+@driverDetails.model+"','"+@driverDetails.image+"',
        '"+@driverDetails.capacity+"','"+@driverDetails.accessible+"','"+@driverDetails.animals+"','"+@driverDetails.appPayment+"');"
      tx.executeSql sql


  removeFavoriteSQL: =>
    @db.transaction (tx) =>
      sql = "DELETE FROM favorites WHERE email ='"+@driverDetails.email+"';"
      tx.executeSql sql

