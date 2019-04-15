import { Component, OnInit } from '@angular/core';
import { DefinedPlaces } from '../defined-places';
import { MapStyle } from '../map-style';
import { HttpClient } from '@angular/common/http';
import { AppComponent } from '../app.component';
import * as MarkerClusterer from "@google/markerclusterer"


declare var google;
//declare var google;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  startLatitude: number = 50.0138100;
  startLongitude: number = 20.9869800;
  markers = [];
  parkingMarkers = [];
  parkingDetails = {address:null};
  map: any;
  detailsVisible;
  mapMenuVisible = true;
  filtered = false;
  mapStyleName = 'day';
  geocoder;
  parkings = [];
  parkCords = [];
  directionsDisplay;
  directionsService;
  stepDisplay;
  nearParking;

  constructor(private definedPlaces: DefinedPlaces, private mapStyle: MapStyle, private http: HttpClient, private app: AppComponent) {
    this.mapStyleName = localStorage.getItem('mapstyle') || 'day';
    this.geocoder = new google.maps.Geocoder();
    this.directionsService = new google.maps.DirectionsService();
  }

  ngOnInit() {
    this.fetch();
  }

  getLocation(geocoder) {
    var t = this;
    navigator.geolocation.getCurrentPosition( (position) => {
      this.nearParking = this.findNearPlace(position.coords.latitude, position.coords.longitude);
      this.calcRoute(position.coords.latitude, position.coords.longitude, this.nearParking.lat, this.nearParking.lng);
      console.log()
    });
  }

  calcRoute(start_lat, start_lng, end_lat, end_lng) {
  var request = {
      origin: start_lat + ',' + start_lng,
      destination: end_lat + ',' + end_lng,
      travelMode: 'DRIVING'
  };
  var t = this;
  var rendererOptions = {
      map: this.map
  }
  this.directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions)
  
  this.directionsService.route(request, function(response, status) {
    if (status == "OK") {
      t.directionsDisplay.setDirections(response);
    }
  });
}

  async getParking() {
    this.http.get(this.app.apiuri + "api/parking").subscribe(resp => {
      console.log(resp);
      (<any>resp).forEach((parking, i) => {
        this.parkings[i] = resp[i];
      })
    });
  }

  fetch() {
    this.http.get("https://localhost:5001/api/parking").toPromise().then(resp => {
      (<any>resp).forEach((parking, i) => {
        this.parkings[i] = resp[i];
      })

      if (this.parkings.length) {
        this.initMap();
      }
    }).catch(e => { console.log(e), this.initMap() });
  }

  findPlace() {
    let t = this;
    let address: HTMLInputElement = (<any>document.querySelector('#address')).value;
    this.geocoder.geocode({ 'address': address }, function (results, status) {
      if (status === 'OK') {
        let location = [results[0].geometry.location.lat(), results[0].geometry.location.lng()];
        //t.findClosestPlace(location);
        t.map.setCenter(results[0].geometry.location);
        t.map.zoom = 16;
      } else {
        alert('Wystąpił błąd wyszukiwania: ' + status);
      }
    });
  }

  findNearPlace(lat, lng) {
      this.getLocation(this.geocoder);
      return this.closestDistance(this.parkings, lat, lng)
  }
 
  initMap() {
    var t = this;
    var mapStyle = t.mapStyleName == 'day' ? t.mapStyle.day : t.mapStyle.night;
    let icon_free_car = {
      url: '../../assets/car-green-min.png', size: new google.maps.Size(25, 42)
    };
    let icon_taken_car = {
      url: '../../assets/car-red-min.png', size: new google.maps.Size(25, 42)
    };
    let icon_free_disabled = {
      url: '../../assets/disabled-red-min.png', size: new google.maps.Size(25, 42)
    };
    let icon_taken_disabled = {
      url: '../../assets/disabled-red-min.png', size: new google.maps.Size(25, 42)
    };
    let icon_parking = {
      url: '../../assets/parking.png', size: new google.maps.Size(30, 30)
    };

    t.map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: t.startLatitude, lng: t.startLongitude },
      zoom: 13,
      mapTypeControlOptions: {
        style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
        position: google.maps.ControlPosition.TOP_RIGHT
      },
      fullscreenControl: false,
      styles: mapStyle
    });

    let counter = 0;
    for (let i = 0; i < t.parkings.length; i++) {
      console.log(t.parkings[i]);
      let parkingPos = {
        lat: t.parkings[i].longtitude - 0.0002,
        lng: t.parkings[i].latitude - 0.0002
      }
      t.parkingMarkers[i] = new google.maps.Marker({
        position: parkingPos,
        map: t.map,
        title: 'parking',
        icon: icon_parking
      });
      t.parkingMarkers[i].addListener('click', function () {
        t.parkingDetails = t.parkings[i];
        console.log(t.parkingDetails );
        t.detailsVisible = true;
      });
      for (let j = 0; j < t.parkings[i].spaces.length; j++) {
        let pos = {
          lat: t.parkings[i].spaces[j].longtitude,
          lng: t.parkings[i].spaces[j].latitude

        }

        if (t.parkings[i].spaces[j].isBusy) {
          t.markers[counter] = new google.maps.Marker({
            position: pos,
            map: t.map,
            title: 'zajete',
            icon: { url: '../../assets/' + t.parkings[i].spaces[j].spaceType+'-red-min.png', size: new google.maps.Size(25, 42) }
          });
        } else {
          t.markers[counter] = new google.maps.Marker({
            position: pos,
            map: t.map,
            title: 'wolne',
            icon: { url: '../../assets/' + t.parkings[i].spaces[j].spaceType+'-green-min.png', size: new google.maps.Size(25, 42)}
          });
        }
        counter++;
      }
    }
    var mcOptions = { imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m', gridSize: 140, maxZoom: 16, zoomOnClick: true, minimumClusterSize: 4 };
    let visibleMarkers = t.markers;
    new MarkerClusterer(t.map, visibleMarkers, mcOptions)


    //  document.getElementById('findPlace').addEventListener('click', function() {
    //    findPlace(geocoder, this.map);
    //  });
  }


  closestDistance(parkings, geo_lat, geo_lon) {
    let calculateParkings = [];
    parkings.forEach((parking, i) => {
        let distance = this.calculateDistance(geo_lat, geo_lon, parking.longtitude, parking.latitude) 
        calculateParkings[i] = {
          parking: parking.address,
          distance: distance,
          lat: parking.longtitude,
          lng: parking.latitude
        }
    });
    let closestLoc = calculateParkings.reduce((prev, current) => (prev.distance < current.distance) ? prev : current);

    return closestLoc;
  }

  calculateDistance(lat1, lon1, lat2, lon2) {
    if (lat1 === '' || lon1 === '' || lat2 === '' || lon2 === '') {
      return 999999999999;
    }

    var p = 0.017453292519943295;
    var c = Math.cos;
    var a = 0.5 - c((lat2 - lat1) * p) / 2 +
      c(lat1 * p) * c(lat2 * p) *
      (1 - c((lon2 - lon1) * p)) / 2;

    return 12742 * Math.asin(Math.sqrt(a));
  }

  filterPlaces() {
    console.log(this.map);
    if (this.filtered == false) {
      console.log('filtrowanie on');
      this.filtered = true;
      for (let j = 0; j < this.markers.length; j++) {
        if (this.markers[j].title == 'zajete') {
          this.markers[j].setVisible(false);
        }
        else {
          this.markers[j].setVisible(true);
        }
      }
    }
    else {
      this.filtered = false;
      console.log('filtrowanie off');
      for (let j = 0; j < this.markers.length; j++) {
        this.markers[j].setVisible(true);
      }
    }
  }

  switchMapStyle() {
    var newStyle = this.mapStyleName == 'day' ? 'night' : 'day';
    this.mapStyleName = newStyle;
    console.log(newStyle);
    localStorage.setItem('mapstyle', newStyle);
    var mapStyle = newStyle == 'day' ? this.mapStyle.day : this.mapStyle.night;

    this.map.setOptions({ styles: mapStyle });

  }
}
