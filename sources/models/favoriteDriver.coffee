class __Model.FavoriteDriver extends Monocle.Model

  @fields "license", "name", "surname", "valoration", "position", "plate", "model", "image", "capacity", "accesible", "animals", "appPayment"

  @get: (id) -> @select (driver) -> driver.license is id
  
  @getAll:  -> @select (driver) -> @
