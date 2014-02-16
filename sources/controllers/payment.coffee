class __Controller.PaymentCtrl extends Monocle.Controller

  numberValue = undefined
  expiresValue = undefined
  amount = undefined

  elements:
    "#payment_credit_card"                        : "creditCard"
    "#payment_cvc"                                : "cvc"
    "#payment_expires"                            : "expires"
    "#payment_submit"                             : "button"
    "#payment_amount"                             : "amount_text"
    "#payment_errors"                             : "errors"

  events:
    "singleTap #payment_submit"                   : "doPayment"
    "singleTap #payment_credit_card"              : "clickNumber"
    "change #payment_credit_card"                 : "changeNumber"
    "singleTap #payment_cvc"                      : "clickCVC"
    "singleTap #payment_expires"                  : "clickExpires"

  constructor: ->
    super


  changeNumber: (amount_payment) ->
    @

  clickNumber: (amount_payment) ->
    @creditCard[0].value = ""

  clickCVC: (amount_payment) ->
    @cvc[0].value = ""

  clickExpires: (amount_payment) ->
    @expires[0].value = ""


  loadPayment: (amount_payment) ->
    amount = amount_payment
    @amount_text[0].innerText = "A pagar: "+amount+" €"
    @cvc.val("")
    @button[0].disabled = false


  doPayment: (event) =>
    if !(@creditCard.val() && @cvc.val() && @expires.val())
      navigator.notification.alert "Debes completar todos los detalles de la tarjeta", null, "Taxi Express", "Aceptar"
    else if @creditCard.val().length <16
      navigator.notification.alert "Compruebe el número de tarjeta de crédito", null, "Taxi Express", "Aceptar"
    else if @expires.val()[2] != "/"
      navigator.notification.alert "Compruebe la fecha de caducidad", null, "Taxi Express", "Aceptar"
    else
      @button[0].disabled = true
      Stripe.setPublishableKey "pk_test_VdRyFEwU3Ap84cUaLp5S8yBC"
      Stripe.createToken
        name: "David Lallana"
        email: "davidlallana@gmail.com"
        description: "descripcion de prueba"
        number: "4242424242424242"#@creditCard.val()
        cvc: "123"#@cvc.val()
        exp_month: "12"#@expires.val().substring 0, 3
        exp_year: "2014"#@expires.val().substring 4, 8
      , amount,  @stripeResponseHandler
 

  stripeResponseHandler: (status, response) =>
    @button[0].disabled = false
    if response.error      
      navigator.notification.alert "Los datos de la tarjeta no son válidos. Compruébelos.", null, "Taxi Express", "Aceptar"
    else
      credentials = Lungo.Cache.get "credentials"
      server = Lungo.Cache.get "server"
      session = Lungo.Cache.get "session"
      travelID = Lungo.Cache.get "travelID"
      $$.ajax
        type: "POST"
        url: server + "client/travelpaid"
        data:
          email: credentials.email
          travelID: travelID
          sessionID: session
        error: (xhr, type) =>
          console.log type.response
        success: (result) =>
          navigator.notification.alert "Trayecto pagado", null, "Taxi Express", "Aceptar"
          home_driver.style.visibility = "hidden"
          @loadCreditCardInfo @numberValue, @expiresValue
          Lungo.Router.section "home_s"
          $$.ajax
            type: "GET"
            url: server + "client/getlasttravel"
            data:
              email: credentials.email
              sessionID: session
            error: (xhr, type) =>
              console.log type.response
            success: (result) =>                    
              __Controller.push.addLastTravel(result)

  loadCreditCardInfo: (number, expires) =>
    @numberValue = number
    @expiresValue = expires
    number = number.substring number.length - 2, number.length
    if @numberValue != ""
      @creditCard[0].value = "**** **** **** **" + number
    if expires != ""
      @expires[0].value = expires

    