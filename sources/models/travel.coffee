class __Model.Travel extends Monocle.Model

  @fields "id", "starttime", "endtime", "startpoint", "endpoint", "cost", "driver", "origin", "destination"

  @get: (iden) -> @select (travel) -> travel.id is iden