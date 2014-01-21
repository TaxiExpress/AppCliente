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
    $$.ajax
      type: "GET"
      url: server + "client/cancelTravel"
      data:
        email: credentials.email
        sessionID: session
        travelID: travelID
      error: (xhr, type) =>
        alert type.response
      success: (result) =>
        console.log result