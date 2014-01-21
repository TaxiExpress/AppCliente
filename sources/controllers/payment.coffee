class __Controller.PaymentCtrl extends Monocle.Controller

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

  constructor: ->
    super


  loadPayment: (amount_payment) ->
    amount = amount_payment
    @amount_text[0].innerText = "A pagar: "+amount+" €"
    @creditCard.val("")
    @cvc.val("")
    @expires.val("")
    @button[0].disabled = false


  doPayment: (event) =>
    if !(@creditCard.val() && @cvc.val() && @expires.val())
      alert "Debes completar todos los detalles de la tarjeta"
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
      @errors[0].innerText = "Los datos de la tarjeta no son válidos. Compruébelos."
    else
      credentials = Lungo.Cache.get "credentials"
      server = Lungo.Cache.get "server"
      session = Lungo.Cache.get "session"
      travelID = Lungo.Cache.get "travelID"
      $$.ajax
        type: "GET"
        url: server + "client/payTravel"
        data:
          email: credentials.email
          travelID: travelID
          sessionID: session
        error: (xhr, type) =>
          alert type.response
        success: (result) =>
          console.log result
          alert "Trayecto pagado"
          home_driver.style.visibility = "hidden"
          Lungo.Router.section "home_s"

        