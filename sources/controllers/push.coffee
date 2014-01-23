class __Controller.PushCtrl extends Monocle.Controller

  pushNotification = undefined

  constructor: ->
    super

  document.addEventListener "deviceready", onDeviceReady, true

  onDeviceReady = ->
    alert "Deviceready event received"
    document.addEventListener "backbutton", ((e) ->
      alert "Backbutton event received"
      if $("#home").length > 0
        
        # call this to get a new token each time. don't call it to reuse existing token.
        #pushNotification.unregister(successHandler, errorHandler);
        e.preventDefault()
        navigator.app.exitApp()
      else
        navigator.app.backHistory()
    ), false
    try
      pushNotification = window.plugins.pushNotification
      if device.platform is "android" or device.platform is "Android"
        alert "Registering android"
        pushNotification.register successHandler, errorHandler, # required!
          senderID: "661780372179"
          ecb: "onNotificationGCM"

      else
        alert "Registering iOS"
        pushNotification.register tokenHandler, errorHandler, # required!
          badge: "true"
          sound: "true"
          alert: "true"
          ecb: "onNotificationAPN"

    catch err
      txt = "There was an error on this page.\n\n"
      txt += "Error description: " + err.message + "\n\n"
      alert txt #este alert si que es alert




  # handle APNS notifications for iOS
  onNotificationAPN = (e) ->
    if e.alert
      alert "Push-notification: " + e.alert
      navigator.notification.alert e.alert
    if e.sound
      snd = new Media(e.sound)
      snd.play()
    pushNotification.setApplicationIconBadgeNumber successHandler, e.badge  if e.badge




  # handle GCM notifications for Android
  onNotificationGCM = (e) ->
    alert "EVENT -> RECEIVED:" + e.event
    switch e.event
      when "registered"
        if e.regid.length > 0
          alert "REGISTERED -> REGID:" + e.regid
          
          # Your GCM push server needs to know the regID before it can push to this device
          # here is where you might want to send it the regID for later use.
          alert "regID = " + e.regid
      when "message"
        
        # if this flag is set, this notification happened while we were in the foreground.
        # you might want to play a sound to get the user's attention, throw up a dialog, etc.
        if e.foreground
          alert "--INLINE NOTIFICATION--"
          handlePush(e.payload)
          # if the notification contains a soundname, play it.
          my_media = new Media("/android_asset/www/" + e.soundname)
          my_media.play()
        else # otherwise we were launched because the user touched a notification in the notification tray.
          if e.coldstart
            handlePush(e.payload)
            alert "--COLDSTART NOTIFICATION--"
          else
            handlePush(e.payload)
            alert "--BACKGROUND NOTIFICATION--"
        alert "MESSAGE -> MSG: " + e.payload.message
        alert "MESSAGE -> MSGCNT: " + e.payload.msgcnt
      when "error"
        alert "ERROR -> MSG:" + e.msg
      else
        alert "EVENT -> Unknown, an event was received and we do not know what it is"

  handlePush: (notification) =>
    switch notification.code
      when 701 #Recibo push de trayecto aceptado
        Lungo.Cache.set "travelAccepted", true
        Lungo.Router.section "home_s"      
      when 702 #Recibo la push de pago
        if notification.appPayment == "true"
          __Controller.payment.loadPayment(notification.cost)
          home_driver.style.visibility = "visible"
          Lungo.Router.section "home_s"      
          Lungo.Router.section "payment_s"
        else
          Lungo.Router.section "home_s"      
          alert "Viaje pagado"
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


  tokenHandler = (result) ->
    alert "Token: " + result

  successHandler = (result) ->
    alert "PUSH recibido:" + result

  errorHandler = (error) ->
    alert "Error al recibir PUSH: " + error

