class __Controller.NearDriverCtrl extends Monocle.Controller

  _viewsList = []

  constructor: ->
    super

  loadNearTaxis: =>
    i = 0
    if i == 0
      empty_near.style.visibility = "visible"
    else
      empty_near.style.visibility = "hidden"
      for taxi in __Model.Driver.all()
        license = "DDAS65DAS" + i.toString()
        name = "Taxista "
        surname = i.toString()
        valoration = (i % 5)
        position = new google.maps.LatLng(43.271239,-2.9445875)
        plate = "DVT 78" + i.toString()
        model = "Opel Corsa"
        image = "http://www.futbolsalaragon.com/imagenes/alfonsorodriguez2012.JPG"
        capacity = 4
        accesible = false
        animals = false
        appPayment = (i % 4 == 0)
        __Model.Driver.create license: license, name: name, surname: surname, valoration: valoration, position: position, plate: plate, model: model, image: image, capacity: capacity, accesible: accesible, animals: animals, appPayment: appPayment
        _viewsList[taxi.license] = new __View.NearDriverList model: taxi      

  deleteNearTaxis: =>
    for nearDriver in __Model.Driver.getAll()
      _viewsList[nearDriver.license].remove()
      _viewsList[nearDriver.license] = undefined
