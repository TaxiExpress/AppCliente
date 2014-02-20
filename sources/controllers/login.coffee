class __Controller.LoginCtrl extends Monocle.Controller

  db = undefined
  credentials = undefined
  logged = undefined
  passHashed = undefined

  elements:
    "#login_username"                              : "username"
    "#login_password"                              : "password"

  events:
    "tap #login_login_b"                           : "doLogin"

  constructor: ->
    super
    @db = window.openDatabase("TaxiExpressNew", "1.0", "description", 4 * 1024 * 1024)
    @db.transaction (tx) =>
      tx.executeSql "CREATE TABLE IF NOT EXISTS profile (email STRING NOT NULL PRIMARY KEY, pass STRING NOT NULL, lastUpdate STRING NOT NULL, lastUpdateTravels STRING NOT NULL, name STRING NOT NULL, surname STRING NOT NULL, phone STRING NOT NULL, image STRING NOT NULL, seats STRING NOT NULL, distance STRING NOT NULL, payments STRING NOT NULL, animals STRING NOT NULL, accessible STRING NOT NULL, creditCard STRING NOT NULL , expires STRING NOT NULL )"
      tx.executeSql "CREATE TABLE IF NOT EXISTS travels (id STRING NOT NULL, starttime STRING NOT NULL, endtime STRING NOT NULL, startpoint STRING NOT NULL, endpoint STRING NOT NULL, origin STRING NOT NULL, destination STRING NOT NULL, cost STRING NOT NULL, driver STRING NOT NULL, vote STRING NOT NULL, customervoted STRING NOT NULL)"
      tx.executeSql "CREATE TABLE IF NOT EXISTS drivers (email STRING NOT NULL PRIMARY KEY, name STRING NOT NULL, surname STRING NOT NULL, valuation STRING NOT NULL, plate STRING NOT NULL, model STRING NOT NULL, image STRING NOT NULL, capacity STRING NOT NULL, accessible STRING NOT NULL, animals STRING NOT NULL, appPayment STRING NOT NULL)"
    #@drop()
    @read()  

  getPassHash: (pass) =>
    tx = pass
    i = 0
    while i < 5000
      hashObj = new jsSHA(tx, "TEXT")
      tx = hashObj.getHash("SHA-256", "HEX")
      i++
    return tx

  doLogin: (event) =>
    input = document.getElementById("login_username")
    input.blur()
    input = document.getElementById("login_password")
    input.blur()
    if @username[0].value && @password[0].value
      @drop()
      navigator.splashscreen.show()
      date = new Date().toISOString().substring 0, 19
      date = date.replace "T", " "
      @passHashed = @getPassHash(@password[0].value)
      @valideCredentials(@username[0].value, @passHashed, date, date)
    else
      navigator.notification.alert "Debes rellenar el email y la contraseña", null, "Taxi Express", "Aceptar"


  valideCredentials: (email, pass, date, dateTravels) =>
    pushID = Lungo.Cache.get "pushID"
    if pushID == undefined
      setTimeout((=> 
        pushID = Lungo.Cache.get "pushID"
        @valideCredentials email, pass, date, dateTravels 
      ) , 500)
      return
    else
      server = Lungo.Cache.get "server"
      data = 
        email: email
        password: pass
        lastUpdate: date
        lastUpdateTravels: dateTravels
        pushID: pushID
      $$.ajax
        type: "POST"
        url: server + "client/login"
        data: data
        success: (result) =>
          @parseResponse result
        error: (xhr, type) =>
          @password[0].value = ""
          navigator.notification.alert type.response , Lungo.Router.section "login_s", "Taxi Express", "Aceptar"
          navigator.splashscreen.hide()


  parseResponse: (result) ->
    Lungo.Cache.set "session", result.sessionID
    if result.email == undefined
      profile =
        name: credentials.name
        surname: credentials.surname
        phone: credentials.phone
        email: credentials.email
        image: credentials.image
      __Controller.filters.loadFilters(credentials.seats, credentials.payments, credentials.animals, credentials.accessible, credentials.distance)
      creditCard = credentials.creditCard
      expires = credentials.expires
    else 
      @doSQL "DELETE FROM profile"
      profile =
        name: result.first_name
        surname: result.last_name
        phone: result.phone.substring 3
        email: result.email
        image: result.image
      date = result.lastUpdate.substring 0, 19
      date = date.replace "T", " "
      if credentials
        dateTrav = credentials.lastUpdateTravels
      else
        dateTrav = result.lastUpdateTravels.substring 0, 19
        dateTrav = dateTrav.replace "T", " "
      passwordHash = @passHashed
      @doSQL "INSERT INTO profile (email, pass, lastUpdate, lastUpdateTravels, name, surname, phone, image, seats, distance, payments, animals, accessible, creditCard, expires) VALUES ('"+profile.email+"','"+passwordHash+"','"+date+"','"+dateTrav+"','"+profile.name+"','"+profile.surname+"','"+profile.phone+"','"+profile.image+"','"+result.fCapacity+"','"+result.fDistance+"','"+result.fAppPayment+"','"+result.fAnimals+"','"+result.fAccessible+"','','');"
      __Controller.filters.loadFilters(result.fCapacity, result.fAppPayment, result.fAnimals, result.fAccessible, result.fDistance)
      creditCard = ""
      expires = ""
    Lungo.Cache.remove "travelAccepted"
    Lungo.Cache.set "travelAccepted", false
    Lungo.Cache.remove "travelID"
    Lungo.Cache.set "travelID", 0
    Lungo.Cache.remove "credentials"
    Lungo.Cache.set "credentials", profile
    @loadFavoriteTaxis(result.favlist)
    __Controller.favorites = new __Controller.FavoritesCtrl "section#favorites_s"
    if result.travel_set
      @loadTravels(result.travel_set)
      dateTrav = result.lastUpdateTravels.substring 0, 19
      dateTrav = dateTrav.replace "T", " "
      @doSQL "UPDATE profile SET lastUpdateTravels = '"+dateTrav+"' WHERE email ='"+profile.email+"';"
      __Controller.travelList = new __Controller.TravelListCtrl "section#travelList_s"
    else
      __Controller.travelList = new __Controller.TravelListCtrl "section#travelList_s"
      @getDriversAndTravelsSQL()
    @username[0].value = ""
    @password[0].value = ""
    if !@logged
      __Controller.profile = new __Controller.ProfileCtrl "section#profile_s"
      __Controller.creditCard = new __Controller.CreditCardCtrl "section#creditCard_s"
      __Controller.payment = new __Controller.PaymentCtrl "section#payment_s"
      __Controller.favDriver = new __Controller.FavDriverCtrl "section#favDriver_s"
      __Controller.waiting = new __Controller.WaitingCtrl "section#waiting_s"
      __Controller.chosenTaxi = new __Controller.ChosenTaxiCtrl "section#chosenTaxi_s"
      __Controller.nearDriver = new __Controller.NearDriverCtrl "section#list_s"
      __Controller.travelDetails = new __Controller.TravelDetailsCtrl "section#travelDetails_s"
      setTimeout((=>__Controller.home = new __Controller.HomeCtrl "section#home_s") , 1000)
      @logged = true
    else
      Lungo.Router.section "home_s"
      __Controller.profile.loadProfile()
      __Controller.menu.updateProfile()
      setTimeout((=> navigator.splashscreen.hide()) , 500)
    __Controller.creditCard.loadCreditCardInfo creditCard, expires



  read: =>
    @db.transaction (tx) =>
      tx.executeSql "SELECT * FROM profile", [], ((tx, results) =>
        if results.rows.length > 0
          credentials = results.rows.item(0)
          @username[0].value = credentials.email
          @password[0].value = credentials.pass
          @valideCredentials(credentials.email, credentials.pass, credentials.lastUpdate, credentials.lastUpdateTravels)
        else
          Lungo.Router.section "login_s"
          setTimeout((=> navigator.splashscreen.hide()) , 500)
      ), null


  drop: =>
    @db.transaction (tx) =>
      tx.executeSql "DELETE FROM profile"
      tx.executeSql "DELETE FROM travels"
      tx.executeSql "DELETE FROM drivers"


  loadFavoriteTaxis: (taxis) =>
    if taxis.length > 0
      empty_favorites.style.display = "none"
      empty_favorites2.style.display = "none"
      for taxi in taxis
        email = taxi.email
        phone = taxi.phone
        name = taxi.first_name
        surname = taxi.last_name
        valuation = taxi.valuation
        plate = taxi.car.plate
        model = taxi.car.company + " " + taxi.car.model
        image = ""
        image = taxi.image  if taxi.image
        capacity = taxi.car.capacity
        accessible = taxi.car.accessible
        animals = taxi.car.animals
        appPayment = taxi.car.appPayment
        favDriver = __Model.FavoriteDriver.create email: email, phone: phone, name: name, surname: surname, valuation: valuation, plate: plate, model: model, image: image, capacity: capacity, accessible: accessible, animals: animals, appPayment: appPayment


  loadTravels: (travels) =>
    @doSQL "DELETE FROM travels"
    @doSQL "DELETE FROM drivers"
    if travels.length > 0
      empty_travels.style.display = "none"
      for travel in travels
        if travel.endtime
          id = travel.id
          starttime = new Date(travel.starttime)
          endtime = new Date(travel.endtime)
          coords = travel.startpoint.substring 7
          pos = coords.indexOf " "
          long = coords.substring 0, pos
          lat = coords.substring pos+1, coords.indexOf ")"
          startpoint = new google.maps.LatLng(long,lat)
          coords = travel.endpoint.substring 7
          pos = coords.indexOf " "
          long = coords.substring 0, pos
          lat = coords.substring pos+1, coords.indexOf ")"
          endpoint = new google.maps.LatLng(long,lat)
          origin = travel.origin
          destination = travel.destination
          vote = (travel.vote == "true").toString()
          cost = travel.cost
          customervoted = travel.customervoted
          driver = __Model.Driver.get(travel.driver.email)[0]
          if driver == undefined
            driver2 = travel.driver
            if driver2.image == ""
              image = "" 
            else image = driver2.image
            model = driver2.car.company + " " + driver2.car.model
            driver = __Model.Driver.create email: driver2.email, name: driver2.first_name, surname: driver2.last_name, valuation: driver2.valuation, plate: driver2.car.plate, model: model, image: driver2.image, capacity: driver2.car.capacity, accessible: driver2.car.accessible, animals: driver2.car.animals, appPayment: driver2.car.appPayment
            sql = "INSERT INTO drivers (email, name, surname, valuation, plate, model, image, capacity, accessible, animals, appPayment) VALUES ('"+driver.email+"','"+driver.name+"','"+driver.surname+"','"+driver.valuation+"','"+driver.plate+"','"+model+"','"+image+"','"+driver.capacity+"','"+driver.accessible+"','"+driver.animals+"','"+driver.appPayment+"');"
            @doSQL sql
          travel2 = __Model.Travel.create id: id, starttime: starttime, endtime: endtime, startpoint: startpoint, endpoint: endpoint, cost: cost, driver: driver, origin: origin, destination: destination, vote: vote, customervoted: customervoted
          sql = "INSERT INTO travels (id, starttime, endtime, startpoint, endpoint, origin, destination, cost, driver, vote, customervoted) VALUES ('"+travel2.id+"','"+travel2.starttime+"','"+travel2.endtime+"','"+travel.startpoint+"','"+travel.endpoint+"','"+travel2.origin+"','"+travel2.destination+"','"+travel2.cost+"','"+travel2.driver.email+"','"+travel2.vote+"','"+travel2.customervoted+"');"
          @doSQL sql


  doSQL: (sql) =>
    @db.transaction (tx) =>
      tx.executeSql sql


  getDriversAndTravelsSQL: =>
    @db.transaction (tx) =>
      tx.executeSql "SELECT * FROM drivers", [], ((tx, results) =>
        i = 0
        while i < results.rows.length
          driver = results.rows.item(i)
          __Model.Driver.create email: driver.email, name: driver.name, surname: driver.surname, valuation: driver.valuation, plate: driver.plate, model: driver.model, image: driver.image, capacity: driver.capacity, accessible: driver.accessible, animals: driver.animals, appPayment: driver.appPayment
          i++
      ), null
    @db.transaction (tx) =>
      tx.executeSql "SELECT * FROM travels", [], ((tx, results) =>
        i = 0
        if results.rows.length > 0
          empty_travels.style.display = "none"
        while i < results.rows.length
          travel = results.rows.item(i)
          driver = __Model.Driver.get(travel.driver)[0]
          coords = travel.startpoint.substring 7
          pos = coords.indexOf " "
          long = coords.substring 0, pos
          lat = coords.substring pos+1, coords.indexOf ")"
          startpoint = new google.maps.LatLng(long,lat)
          coords = travel.endpoint.substring 7
          pos = coords.indexOf " "
          long = coords.substring 0, pos
          lat = coords.substring pos+1, coords.indexOf ")"
          endpoint = new google.maps.LatLng(long,lat)
          customervoted = travel.customervoted == 'true'
          __Model.Travel.create id: travel.id, starttime: new Date(travel.starttime), endtime: new Date(travel.endtime), startpoint: startpoint, endpoint: endpoint, cost: travel.cost, driver: driver, origin: travel.origin, destination: travel.destination, vote: travel.vote, customervoted: customervoted
          i++
          if i == results.rows.length
            __Controller.travelList.loadTravelList()
      ), null

