class __Controller.ChosenTaxiCtrl extends Monocle.Controller

  driverDetails = undefined
  timer = undefined

  elements:
    "#chosenTaxi_name"                              : "name"
    "#chosenTaxi_valuation"                         : "valuation"
    "#chosenTaxi_image"                             : "image"
    "#chosenTaxi_model"                             : "model"
    "#chosenTaxi_plate"                             : "plate"
    "#chosenTaxi_capacity"                          : "capacity"
    "#chosenTaxi_accessible"                        : "accessible"
    "#chosenTaxi_animals"                           : "animals"
    "#chosenTaxi_appPayment"                        : "appPayment"
    "#chosenTaxi_request"                           : "button"

  events:
    "singleTap #chosenTaxi_request"                 : "requestTaxi"

  constructor: ->
    super


  loadDriverDetails: (driver) =>
    @driverDetails = driver
    @name[0].innerText = driver.name + " " + driver.surname
    @valuation[0].innerText = driver.valuationStars
    @image[0].src = driver.image
    @model[0].innerText = driver.model
    @plate[0].innerText = driver.plate
    @capacity[0].innerText = driver.capacity
    @accessible[0].innerText = "No"
    @accessible[0].innerText = "Si" if driver.accessible
    @animals[0].innerText = "No"
    @animals[0].innerText = "Si" if driver.animals
    @appPayment[0].innerText = "No"
    @appPayment[0].innerText = "Si" if driver.appPayment


  requestTaxi: (event) =>
    @button[0].disabled = true
    credentials = Lungo.Cache.get "credentials"
    position = Lungo.Cache.get "geoPosition"
    server = Lungo.Cache.get "server"
    session = Lungo.Cache.get "session"
    origin = Lungo.Cache.get "origin"
    $$.ajax
      type: "POST"
      url: server + "client/getselectedtaxi"
      data:
        email: credentials.email
        longitude: position.e
        latitude: position.d
        origin: origin
        driverEmail: @driverDetails.email
        sessionID: session
      error: (xhr, type) =>
        navigator.notification.alert type.response, null, "Taxi Express", "Aceptar"
        @button[0].disabled = false
      success: (result) =>
        @button[0].disabled = false
        Lungo.Router.section "waiting_s"
        travelID = result.travelID
        Lungo.Cache.remove "travelID"
        Lungo.Cache.set "travelID", travelID.toString()
        Lungo.Cache.remove "travelAccepted"
        Lungo.Cache.set "travelAccepted", false
        Lungo.Router.section "waiting_s"
        @timer = setTimeout((=> 
          if !Lungo.Cache.get "travelAccepted"
            $$.ajax
              type: "POST"
              url: server + "client/canceltravel"
              data:
                email: credentials.email
                sessionID: session
                travelID: travelID.toString()
              error: (xhr, type) =>
                Lungo.Router.back()
                navigator.notification.alert type.response, null, "Taxi Express", "Aceptar"
              success: (result) =>
                Lungo.Cache.remove "travelID"
                Lungo.Cache.remove "travelAccepted"
                Lungo.Cache.set "travelAccepted", false
                Lungo.Router.back()
                navigator.notification.alert "El taxista no ha aceptado su solicitud", null, "Taxi Express", "Aceptar"
        ) , 30000)

  cancelTimeOut: =>
    clearTimeout(@timer);


