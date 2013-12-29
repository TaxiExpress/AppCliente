class __Model.Driver extends Monocle.Model

  @fields "email", "name", "surname", "valuation", "position", "plate", "model", "image", "capacity", "accesible", "animals", "appPayment"

  @get: (id) -> @select (driver) -> driver.email is id