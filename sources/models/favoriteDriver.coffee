class __Model.FavoriteDriver extends Monocle.Model

  @fields "email", "name", "surname", "valuation", "plate", "model", "image", "capacity", "accesible", "animals", "appPayment"

  @get: (id) -> @select (driver) -> driver.email is id