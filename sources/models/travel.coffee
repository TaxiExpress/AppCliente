class __Model.Travel extends Monocle.Model

  @fields "id", "starttime", "endtime", "startpoint", "endpoint", "cost", "driver"

  @get: (iden) -> @select (travel) -> driver.id is iden