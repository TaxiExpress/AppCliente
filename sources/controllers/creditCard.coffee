class __Controller.CreditCardCtrl extends Monocle.Controller

  number = undefined
  expires = undefined

  elements:
    "#creditCard_number"                       : "numberInput"
    "#creditCard_expires"                      : "expiresInput"

  events:
    "singleTap #creditCard_save_b"             : "updateButton"
    "singleTap #creditCard_number"             : "clickNumber"
    "singleTap #creditCard_expires"            : "clickExpires"

  constructor: ->
    super


  clickNumber: (event) =>
    @numberInput[0].value = ""


  clickExpires: (event) =>
    @expiresInput[0].value = ""


  updateButton: (event) =>
    if @expiresInput[0].value[2] != '/' || @numberInput[0].value.length <16
      navigator.notification.alert "Compruebe que los datos son correctos", null, "Taxi Express", "Aceptar"
    else
      @loadCreditCardInfo @numberInput[0].value, @expiresInput[0].value
      credentials = Lungo.Cache.get "credentials"
      db = window.openDatabase("TaxiExpressNew", "1.0", "description", 4 * 1024 * 1024)
      db.transaction (tx) =>
        tx.executeSql "UPDATE profile SET expires = '"+@expires+"',creditCard = '"+@number+"'  WHERE email ='"+credentials.email+"';"        
      navigator.notification.alert "Datos actualizados", null, "Taxi Express", "Aceptar"

  loadCreditCardInfo: (number, expires) =>
    number = number.toString()
    expires = expires.toString()
    @number = number
    @expires = expires
    number = number.substring number.length - 2, number.length
    if number != ""
      @numberInput[0].value = "**** **** **** **" + number
    @expiresInput[0].value = expires
    __Controller.payment.loadCreditCardInfo @number, @expires
