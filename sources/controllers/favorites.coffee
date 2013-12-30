class __Controller.FavoritesCtrl extends Monocle.Controller

  _views = []
  _viewsList = []

  constructor: ->
    super
    @loadFavoriteTaxis()

  loadFavoriteTaxis: =>
    for favDriver in __Model.FavoriteDriver.all()
      _views[favDriver.email] = new __View.FavDriver model: favDriver
      _viewsList[favDriver.email] = new __View.FavDriverList model: favDriver

  deleteFavorite: (driver) =>
    _views[driver.email].remove()
    _views[driver.email]= undefined
    _viewsList[driver.email].remove()
    _viewsList[driver.email]= undefined
    __Model.FavoriteDriver.get(driver.email)[0].destroy()
    @tryEmpty()

  addFavorite: (driver) =>
    @deleteFavoriteTaxis()
    __Model.FavoriteDriver.create email: driver.email, name: driver.name, surname: driver.surname, valuation: driver.valuation, position: driver.position, plate: driver.plate, model: driver.model, image: driver.image, capacity: driver.capacity, accesible: driver.accesible, animals: driver.animals, appPayment: driver.appPayment
    @loadFavoriteTaxis()
    @tryEmpty()

  deleteFavoriteTaxis: =>
    for driver in __Model.FavoriteDriver.all()
      _views[driver.email].remove()
      _views[driver.email]= undefined
      _viewsList[driver.email].remove()
      _viewsList[driver.email]= undefined

  tryEmpty: =>
    if __Model.FavoriteDriver.all().length == 0
      empty_favorites.style.visibility = "visible"
      empty_favorites2.style.visibility = "visible"
    else
      empty_favorites.style.visibility = "hidden"
      empty_favorites2.style.visibility = "hidden"