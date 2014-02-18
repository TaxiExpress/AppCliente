class __Controller.WaitingCtrl extends Monocle.Controller

  elements:
    "#waiting_cancel_b"                      : "button_cancel"

  events:
    "singleTap #waiting_cancel_b"            : "cancel"

  constructor: ->
    super 


  cancel: (event) =>
    if !@button_cancel[0].disabled
      @button_cancel[0].disabled = true
      @button_cancel[0].innerText = "Cancelando petición"
      credentials = Lungo.Cache.get "credentials"
      server = Lungo.Cache.get "server"
      session = Lungo.Cache.get "session"
      travelID = Lungo.Cache.get "travelID"
      if !Lungo.Cache.get "travelAccepted"
        __Controller.chosenTaxi.cancelTimeOut()
        __Controller.home.cancelTimeOut()
        $$.ajax
          type: "POST"
          url: server + "client/canceltravel"
          data:
            email: credentials.email
            sessionID: session
            travelID: travelID
          error: (xhr, type) =>
            @button_cancel[0].disabled = false
            @button_cancel[0].innerText = "Cancelar petición"
            navigator.notification.alert type.response, null, "Taxi Express", "Aceptar"
          success: (result) =>
            Lungo.Router.back()
            @button_cancel[0].disabled = false
            @button_cancel[0].innerText = "Cancelar petición"
            Lungo.Cache.remove "travelID"
            Lungo.Cache.remove "travelAccepted"
            Lungo.Cache.set "travelAccepted", true
            navigator.notification.alert "Peticion cancelada", null, "Taxi Express", "Aceptar"
