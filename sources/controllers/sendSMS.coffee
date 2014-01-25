class __Controller.SendSMSCtrl extends Monocle.Controller

  elements:
    "#sendSMS_phone"                         : "phone"

  events:
    "singleTap #sendSMS_b"                   : "sendSMS"

  constructor: ->
    super


  sendSMS: (event) => 
    if !@phone[0].value
      navigator.notification.alert "Debes introducir un teléfono válido", null, "TaxiExpress", "Aceptar"
    else
      server = Lungo.Cache.get "server"
      phone = "+34" + @phone[0].value
      data =
        phone: phone
      $$.ajax
        type: "POST"
        url: server + "client/recovervalidationcodecustomer"
        data: data
        success: (result) =>
          @parseResponse result
        error: (xhr, type) =>
          console.log type.response


  parseResponse: (result) =>
    Lungo.Router.router "login_s"
    @phone[0].value = ""
