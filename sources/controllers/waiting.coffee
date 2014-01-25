class __Controller.WaitingCtrl extends Monocle.Controller

  elements:
    "#waiting_cancel_b"                      : "button_cancel"

  events:
    "singleTap #waiting_cancel_b"            : "cancel"

  constructor: ->
    super 


  cancel: (event) =>
    credentials = Lungo.Cache.get "credentials"
    server = Lungo.Cache.get "server"
    session = Lungo.Cache.get "session"
    travelID = Lungo.Cache.get "travelID"
    if !Lungo.Cache.get "travelAccepted"
      $$.ajax
        type: "POST"
        url: server + "client/canceltravel"
        data:
          email: credentials.email
          sessionID: session
          travelID: travelID
        error: (xhr, type) =>
          alert type.response
        success: (result) =>
          Lungo.Cache.set "travelID", 0
          Lungo.Cache.set "travelAccepted", false
          navigator.notification.alert "Petición cancelada", null, "TaxiExpress", "Aceptar"
          Lungo.Router.back()
