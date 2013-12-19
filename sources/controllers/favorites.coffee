class __Controller.FavoritesCtrl extends Monocle.Controller

  _views = []
  _viewsList = []

  constructor: ->
    super
    @loadFavoriteTaxis()

  loadFavoriteTaxis: =>
    for favDriver in __Model.FavoriteDriver.all()
      _views[favDriver.license] = new __View.FavDriver model: favDriver
      _viewsList[favDriver.license] = new __View.FavDriverList model: favDriver

  deleteFavorite: (driver) =>
    _views[driver.license].remove()
    _views[driver.license]= undefined
    _viewsList[driver.license].remove()
    _viewsList[driver.license]= undefined
    __Model.FavoriteDriver.get(driver.license)[0].destroy()

  addFavorite: (driver) =>
    @deleteFavoriteTaxis()
    __Model.FavoriteDriver.create license: driver.license, name: driver.name, surname: driver.surname, valoration: driver.valoration, position: driver.position, plate: driver.plate, model: driver.model, image: driver.image, capacity: driver.capacity, accesible: driver.accesible, animals: driver.animals, appPayment: driver.appPayment
    @loadFavoriteTaxis()

  deleteFavoriteTaxis: =>
    for driver in __Model.FavoriteDriver.all()
      console.log driver.license
      _views[driver.license].remove()
      _views[driver.license]= undefined
      _viewsList[driver.license].remove()
      _viewsList[driver.license]= undefined
