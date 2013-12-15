class __Controller.FavoritesCtrl extends Monocle.Controller

  _views = []

  constructor: ->
    super
    @loadFavoriteTaxis()

  loadFavoriteTaxis: =>
    for favDriver in __Model.FavoriteDriver.all()
      _views[favDriver.license] = new __View.FavDriver model: favDriver

  deleteFavorite: (driver) =>
    _views[driver.license].remove()
    _views[driver.license]= undefined
    driver.destroy()