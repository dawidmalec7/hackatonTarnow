import { Component, OnInit } from '@angular/core';
import { DefinedPlaces } from '../defined-places';
import { MapStyle } from '../map-style';


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
  map: any;
  mapMenuVisible = true;
  constructor(private definedPlaces: DefinedPlaces, private mapStyle: MapStyle) { }

  ngOnInit() {
    var t = this;
    function initMap() {
      t.map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: t.startLatitude, lng: t.startLongitude },
        zoom: 13,
        styles: t.mapStyle.style
      });

      for (let i = 0; i < t.definedPlaces.placRybny.length; i++) {
        console.log(t.definedPlaces.placRybny[i]);
        let pos = {
          lat: t.definedPlaces.placRybny[i][1],
          lng: t.definedPlaces.placRybny[i][0]
        };
        t.markers[i] = new google.maps.Marker({ position: pos, map: t.map });

      }

    }

    initMap(); 
    //let map = L.map('map').setView([this.startLatitude, this.startLongitude], 13);
    //let map  = L.map('map', {
    //  center: [this.startLatitude, this.startLongitude],
    //  zoom: 13,
    //  minZoom: 11,
    //  maxZoom: 18
    //});
    //let places = this.definedPlaces.placRybny;
    //L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    //  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    //}).addTo(map);

    //for (let i = 0; i < places.length; i++) {
    //  console.log(places[i]);
    //  var icon_free = L.icon({
    //    iconUrl: '../../assets/car-green.png',
    //    iconSize: [10, 19],
    //    iconAnchor: [7, 16],
    //    popupAnchor: [1, -20],
    //  });

    //  L.marker([places[i][1], places[i][0]], { icon: icon_free }).addTo(map)
    //    .bindPopup('Miejsce ' + (i + 1) + '/' + places.length);
    //}
    //function onMapClick(e) {
    //  console.log("You clicked the map at " + e.latlng);
    //}
    //map.on('click', onMapClick);

  }

}
