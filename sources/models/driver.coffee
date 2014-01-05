class __Model.Driver extends Monocle.Model

  @fields "email", "name", "surname", "valuation", "plate", "model", "image", "capacity", "accessible", "animals", "appPayment"

  @get: (id) -> @select (driver) -> driver.email is id