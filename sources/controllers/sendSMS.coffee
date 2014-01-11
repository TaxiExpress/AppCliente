class __Controller.SendSMSCtrl extends Monocle.Controller

  elements:
    "#sendSMS_phone"                         : "phone"

  events:
    "singleTap #sendSMS_b"                   : "sendSMS"

  constructor: ->
    super

  sendSMS: (event) => 
    if !@phone[0].value
      alert "Debes introducir un teléfono válido"
    else
      server = Lungo.Cache.get "server"
      phone = "+34" + @phone[0].value
      data =
        phone: phone
      $$.ajax
        type: "POST"
        url: server + "client/recovervalidationcode"
        data: data
        success: (result) =>
          @parseResponse result
        error: (xhr, type) =>
          alert type.response

  parseResponse: (result) =>
    Lungo.Router.back()
    @phone[0].value = ""
