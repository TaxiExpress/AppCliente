class __Controller.ChosenTaxiCtrl extends Monocle.Controller

  driverDetails = undefined

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
    Lungo.Router.section "waiting_s"
    credentials = Lungo.Cache.get "credentials"
    position = Lungo.Cache.get "geoPosition"
    server = Lungo.Cache.get "server"
    session = Lungo.Cache.get "session"
    origin = Lungo.Cache.get "origin"
    $$.ajax
      type: "GET"
      url: server + "client/getselectedtaxi"
      data:
        email: credentials.email
        longitude: position.d
        latitude: position.e
        origin: origin
        driver: @driverDetails.email
        sessionID: session
      error: (xhr, type) =>
        alert type.response
      success: (result) =>
        console.log result
        travelID = result.travelID
        Lungo.Cache.set "travelID", travelID
        Lungo.Cache.set "travelAccepted", false
        Lungo.Router.section "waiting_s"
        setTimeout((=> 
          if !Lungo.Cache.get "travelAccepted"
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
        ) , 30000)

