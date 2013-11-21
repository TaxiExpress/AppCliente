(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  __Controller.AppCtrl = (function(_super) {
    __extends(AppCtrl, _super);

    function AppCtrl() {
      AppCtrl.__super__.constructor.apply(this, arguments);
      setTimeout((function() {
        return Lungo.Router.section("home_s");
      }), 1000);
      __Controller.profile = new __Controller.ProfileCtrl("section#profile_s");
      __Controller.home = new __Controller.HomeCtrl("section#home_s");
    }

    return AppCtrl;

  })(Monocle.Controller);

  $$(function() {
    Lungo.init({});
    return __Controller.App = new __Controller.AppCtrl("section#init_s");
  });

}).call(this);

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  __Controller.HomeCtrl = (function(_super) {
    var bounds, currentLocation, initialize, map, myPosition, poi_me, poi_taxi, pull_panel, refrescar,
      _this = this;

    __extends(HomeCtrl, _super);

    map = void 0;

    myPosition = void 0;

    currentLocation = void 0;

    bounds = void 0;

    poi_me = void 0;

    poi_taxi = void 0;

    HomeCtrl.prototype.elements = {
      "#refresh": "button_refresh"
    };

    HomeCtrl.prototype.events = {
      "singleTap #taxis_b": "showTaxis",
      "singleTap #map_b": "showMap",
      "singleTap #filters": "showFilters",
      "singleTap #refresh": "refresh"
    };

    pull_panel = new Lungo.Element.Pull("#taxis_a", {
      onPull: "Deslizar para abajo para refrescar",
      onRelease: "Suelta para recargar",
      onRefresh: "Cargando...",
      callback: function() {
        alert("Lista actualizada!");
        return pull_panel.hide();
      }
    });

    function HomeCtrl() {
      this.showMap = __bind(this.showMap, this);
      this.refresh = __bind(this.refresh, this);
      this.showTaxis = __bind(this.showTaxis, this);
      this.showFilters = __bind(this.showFilters, this);
      HomeCtrl.__super__.constructor.apply(this, arguments);
      poi_me = new google.maps.MarkerImage("img/poi1.png", null, null, new google.maps.Point(25, 25));
      poi_taxi = new google.maps.MarkerImage("img/poi2.png", null, null, new google.maps.Point(25, 25));
    }

    HomeCtrl.prototype.showFilters = function(event) {
      return console.log("MUESTRO FIlTROS");
    };

    HomeCtrl.prototype.showTaxis = function(event) {
      return console.log("CLICK TAXI");
    };

    HomeCtrl.prototype.refresh = function(event) {
      console.log("CLICK REFRESH");
      myPosition.setMap(null);
      if (navigator.geolocation) {
        return navigator.geolocation.getCurrentPosition(refrescar);
      } else {
        return alert("navigator.geolocation is not available");
      }
    };

    refrescar = function(location) {
      currentLocation = new google.maps.LatLng(location.coords.latitude, location.coords.longitude);
      return myPosition = new google.maps.Marker({
        position: currentLocation,
        icon: poi_me,
        map: map
      });
    };

    HomeCtrl.prototype.showMap = function(event) {
      var mapcanvas;
      console.log("CLICK MAP");
      mapcanvas = document.getElementById("map-canvas");
      mapcanvas.style.height = 100 % (mapcanvas.style.width = 100 % Lungo.Notification.show());
      if (navigator.geolocation) {
        return navigator.geolocation.getCurrentPosition(initialize);
      } else {
        return alert("navigator.geolocation is not available");
      }
    };

    initialize = function(location) {
      var i, mapOptions, marker, pos;
      if (map === void 0) {
        currentLocation = new google.maps.LatLng(location.coords.latitude, location.coords.longitude);
        mapOptions = {
          center: currentLocation,
          zoom: 16,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          panControl: false,
          streetViewControl: false,
          overviewMapControl: false,
          mapTypeControl: false,
          zoomControl: false
        };
        map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
        myPosition = new google.maps.Marker({
          position: currentLocation,
          icon: poi_me,
          map: map
        });
        bounds = new google.maps.LatLngBounds();
        bounds.extend(currentLocation);
        i = 1;
        while (i < 6) {
          pos = new google.maps.LatLng(location.coords.latitude + (i * 0.0001), location.coords.longitude);
          marker = new google.maps.Marker({
            position: pos,
            icon: poi_taxi,
            map: map
          });
          google.maps.event.addListener(marker, "click", (function(marker, i) {
            return function() {
              return Lungo.Router.section("chosenTaxi_s");
            };
          })(marker, i));
          bounds.extend(pos);
          i++;
        }
        map.fitBounds(bounds);
      }
      return Lungo.Notification.hide();
    };

    return HomeCtrl;

  }).call(this, Monocle.Controller);

}).call(this);

(function() {
  var _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  __Controller.ProfileCtrl = (function(_super) {
    __extends(ProfileCtrl, _super);

    function ProfileCtrl() {
      this.saveChanges = __bind(this.saveChanges, this);
      this.clickAvatar = __bind(this.clickAvatar, this);
      this.saveAvatar = __bind(this.saveAvatar, this);
      _ref = ProfileCtrl.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    ProfileCtrl.prototype.elements = {
      "#reg_email": "email",
      "#reg_phone": "phone",
      "#reg_name": "name",
      "#reg_surname": "surname",
      "#reg_image": "image",
      "#avatar": "avatar"
    };

    ProfileCtrl.prototype.events = {
      "singleTap #save": "saveChanges",
      "singleTap #avatar": "clickAvatar",
      "change #reg_image": "saveAvatar"
    };

    ProfileCtrl.prototype.saveAvatar = function(event) {
      var file, imageType, reader;
      file = this.image[0].files[0];
      imageType = /image.*/;
      reader = new FileReader();
      reader.readAsDataURL(file);
      return reader.onloadend = function() {
        var tempImg;
        tempImg = new Image();
        tempImg.src = reader.result;
        return tempImg.onload = function() {
          var MAX_HEIGHT, MAX_WIDTH, canvas, ctx, dataURL, tempH, tempW;
          MAX_WIDTH = 120;
          MAX_HEIGHT = 120;
          tempW = tempImg.width;
          tempH = tempImg.height;
          if (tempW > tempH) {
            if (tempW > MAX_WIDTH) {
              tempH *= MAX_WIDTH / tempW;
              tempW = MAX_WIDTH;
            }
          } else {
            if (tempH > MAX_HEIGHT) {
              tempW *= MAX_HEIGHT / tempH;
              tempH = MAX_HEIGHT;
            }
          }
          canvas = document.createElement("canvas");
          canvas.width = tempW;
          canvas.height = tempH;
          ctx = canvas.getContext("2d");
          ctx.drawImage(this, 0, 0, tempW, tempH);
          dataURL = canvas.toDataURL("image/jpeg");
          return $("#avatar").attr("src", dataURL);
        };
      };
    };

    ProfileCtrl.prototype.clickAvatar = function(event) {
      return $("#reg_image").click();
    };

    ProfileCtrl.prototype.saveChanges = function(event) {
      return Lungo.Router.back();
    };

    return ProfileCtrl;

  })(Monocle.Controller);

}).call(this);
