class __Controller.WaitingCtrl extends Monocle.Controller

  elements:
    "#waiting_cancel_b"                      : "button_cancel"

  events:
    "singleTap #waiting_cancel_b"            : "cancel"

  constructor: ->
    super 


  cancel: (event) =>
    home_driver.src = "img/payment.png"
    home_driver.style.visibility = "visible"
    Lungo.Router.section "home_s"