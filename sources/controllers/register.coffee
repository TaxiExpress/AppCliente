class __Controller.RegisterCtrl extends Monocle.Controller

  data = undefined

  elements:
    "#register_phone"                          : "phone"
    "#register_email"                          : "email"
    "#register_pass1"                          : "pass1"
    "#register_pass2"                          : "pass2"

  events:
    "singleTap #register_register_b"           : "register"

  constructor: ->
    super

  register: (event) =>
    if !(@pass1[0].value || @pass2[0].value || @email[0].value || @phone[0].value)
      alert "Debes rellenar todos los campos"
    else if @pass1[0].value.length < 8 || @pass1[0].value.length > 20
      alert "La contraseña debe tener entre 8 y 20 caracteres"
    else if @pass1[0].value != @pass2[0].value
      alert "Los valores de la contraseña deben ser iguales"
    else
      date = new Date().toISOString().substring 0, 19
      date = date.replace "T", " "
      server = Lungo.Cache.get "server"
      @data = 
        email: @email[0].value
        password: @pass1[0].value
        phone: @phone[0].value
        lastUpdate: date
      #@parseResponse ""
      $$.ajax
        type: "POST"
        url: server + "client/register"
        data: @data
        success: (result) =>
          @parseResponse result
        error: (xhr, type) =>
          console.log type.response

  parseResponse: (result) =>
    __Controller.phoneVerification = new __Controller.PhoneVerificationCtrl "section#phoneVerification_s"
    __Controller.phoneVerification.setPhone(@phone[0].value)
    Lungo.Router.section "phoneVerification_s"

  validated: =>
    db = window.openDatabase("TaxiExpressNew", "1.0", "description", 2 * 1024 * 1024) #2MB
    db.transaction (tx) =>
      sql = "INSERT INTO accessData (email, pass, dateUpdate, name, surname, phone, image) VALUES ('"+@data.email+"','"+@data.password+"','"+@data.lastUpdate+"','','','"+@data.phone+"','');"
      tx.executeSql sql
    @db.transaction (tx) =>
      sql = "INSERT INTO configData (email, seats, payments, animals, food, accesible) VALUES ('"+@data.email+"','3','false','false','false','false');"
      tx.executeSql sql
    profile =
      name: ""
      surname: ""
      phone: @data.phone
      email: @data.email
      image: ""
      dateUpdate: @data.lastUpdate
    Lungo.Cache.set "credentials", profile
    __Controller.profile = new __Controller.ProfileCtrl "section#profile_s"
    __Controller.payment = new __Controller.PaymentCtrl "section#payment_s"
    __Controller.favorites = new __Controller.FavoritesCtrl "section#favorites_s"
    __Controller.favDriver = new __Controller.FavDriverCtrl "section#favDriver_s"
    __Controller.chosenTaxi = new __Controller.ChosenTaxiCtrl "section#chosenTaxi_s"
    __Controller.nearDriver = new __Controller.NearDriverCtrl "section#list_s"
    __Controller.travelList = new __Controller.TravelListCtrl "section#travelList_s"
    __Controller.travelDetails = new __Controller.TravelDetailsCtrl "section#travelDetails_s"
    __Controller.filters = new __Controller.FiltersCtrl "section#filters_s"
    setTimeout((=>__Controller.home = new __Controller.HomeCtrl "section#home_s") , 1000)
    @phone[0].value = ""
    @email[0].value = ""
    @pass1[0].value = ""
    @pass2[0].value = ""
