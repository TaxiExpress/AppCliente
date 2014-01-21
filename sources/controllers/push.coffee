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
          #añadir viaje a la lista

  tokenHandler = (result) ->
    alert "Token: " + result

  successHandler = (result) ->
    alert "PUSH recibido:" + result

  errorHandler = (error) ->
    alert "Error al recibir PUSH: " + error

