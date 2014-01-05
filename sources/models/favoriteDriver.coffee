class __Model.FavoriteDriver extends Monocle.Model

  @fields "email", "phone", "name", "surname", "valuation", "plate", "model", "image", "capacity", "accessible", "animals", "appPayment"

  @get: (id) -> @select (driver) -> driver.email is id