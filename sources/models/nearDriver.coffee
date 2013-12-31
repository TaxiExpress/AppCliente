class __Model.NearDriver extends Monocle.Model

  @fields "email", "name", "surname", "valuation", "position", "plate", "model", "image", "capacity", "accesible", "animals", "appPayment"

  @get: (id) -> @select (neardriver) -> neardriver.email is id