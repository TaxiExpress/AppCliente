class __Model.NearDriver extends Monocle.Model

  @fields "email", "name", "surname", "valuation", "position", "plate", "model", "image", "capacity", "accessible", "animals", "appPayment", "distance", "time"

  @get: (id) -> @select (neardriver) -> neardriver.email is id