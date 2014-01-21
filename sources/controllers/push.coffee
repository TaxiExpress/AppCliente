class __Controller.PushCtrl extends Monocle.Controller

  pushNotification = undefined

  constructor: ->
    super

  document.addEventListener "deviceready", onDeviceReady, true

  onDeviceReady = ->
    console.log "Deviceready event received"
    document.addEventListener "backbutton", ((e) ->
      console.log "Backbutton event received"
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
        console.log "Registering android"
        pushNotification.register successHandler, errorHandler, # required!
          senderID: "661780372179"
          ecb: "onNotificationGCM"

      else
        console.log "Registering iOS"
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
      console.log "Push-notification: " + e.alert
      navigator.notification.alert e.alert
    if e.sound
      snd = new Media(e.sound)
      snd.play()
    pushNotification.setApplicationIconBadgeNumber successHandler, e.badge  if e.badge




  # handle GCM notifications for Android
  onNotificationGCM = (e) ->
    console.log "EVENT -> RECEIVED:" + e.event
    switch e.event
      when "registered"
        if e.regid.length > 0
          console.log "REGISTERED -> REGID:" + e.regid
          
          # Your GCM push server needs to know the regID before it can push to this device
          # here is where you might want to send it the regID for later use.
          console.log "regID = " + e.regid
      when "message"
        
        # if this flag is set, this notification happened while we were in the foreground.
        # you might want to play a sound to get the user's attention, throw up a dialog, etc.
        if e.foreground
          console.log "--INLINE NOTIFICATION--"
          
          # if the notification contains a soundname, play it.
          my_media = new Media("/android_asset/www/" + e.soundname)
          my_media.play()
        else # otherwise we were launched because the user touched a notification in the notification tray.
          if e.coldstart
            console.log "--COLDSTART NOTIFICATION--"
          else
            console.log "--BACKGROUND NOTIFICATION--"
        console.log "MESSAGE -> MSG: " + e.payload.message
        console.log "MESSAGE -> MSGCNT: " + e.payload.msgcnt
      when "error"
        console.log "ERROR -> MSG:" + e.msg
      else
        console.log "EVENT -> Unknown, an event was received and we do not know what it is"



  tokenHandler = (result) ->
    console.log "Token: " + result

  # Your iOS push server needs to know the token before it can push to this device
  # here is where you might want to send it the token for later use.
  successHandler = (result) ->
    console.log "PUSH recibido:" + result

  errorHandler = (error) ->
    console.log "Error al recibir PUSH: " + error

