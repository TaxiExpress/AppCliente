class __Controller.PushCtrl extends Monocle.Controller

  pushNotification = undefined

  constructor: ->
    super

  savePushID: (id) =>
    Lungo.Cache.set "pushID", id

  handlePush: (notification) =>
    switch notification.code
      when "701" #Recibo push de trayecto aceptado
        Lungo.Cache.set "travelAccepted", true
        Lungo.Router.section "home_s"      
        navigator.notification.alert "El taxista ha aceptado su solicitud", null, "TaxiExpress", "Aceptar"
      when "702" #Recibo la push de pago
        if notification.appPayment == "true"
          __Controller.payment.loadPayment(notification.cost)
          home_driver.style.visibility = "visible"
          Lungo.Router.section "home_s"      
          Lungo.Router.section "payment_s"
        else
          Lungo.Router.section "home_s"      
          navigator.notification.alert "Viaje pagado", null, "TaxiExpress", "Aceptar"
          credentials = Lungo.Cache.get "credentials"
          server = Lungo.Cache.get "server"
          session = Lungo.Cache.get "session"
          data =
            email: credentials.email
            sessionID: session
          $$.ajax
            type: "GET"
            url: server + "client/getlasttravel"
            data: data
            success: (result) =>
              addLastTravel result
            error: (xhr, type) =>
              console.log type.response


  addLastTravel: (travel) ->
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
    cost = travel.cost
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
    travel2 = __Model.Travel.create id: id, starttime: starttime, endtime: endtime, startpoint: startpoint, endpoint: endpoint, cost: cost, driver: driver, origin: origin, destination: destination
    sql = "INSERT INTO travels (id, starttime, endtime, startpoint, endpoint, origin, destination, cost, driver) VALUES ('"+travel2.id+"','"+travel2.starttime+"','"+travel2.endtime+"','"+travel.startpoint+"','"+travel.endpoint+"','"+travel2.origin+"','"+travel2.destination+"','"+travel2.cost+"','"+travel2.driver.email+"');"
    @doSQL sql


  doSQL: (sql) =>
    db = window.openDatabase("TaxiExpressNew", "1.0", "description", 4 * 1024 * 1024)
    db.transaction (tx) =>
      tx.executeSql sql
