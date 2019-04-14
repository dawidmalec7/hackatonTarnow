import { Component, OnInit } from '@angular/core';
import { DefinedPlaces } from '../defined-places';
import { MapStyle } from '../map-style';
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
  map: any;
  mapMenuVisible = true;
  filtered = false;
  constructor(private definedPlaces: DefinedPlaces, private mapStyle: MapStyle) { }

  ngOnInit() {
    

    this.getLocation().then(
      () => {
        this.initMap();
      }
    );
  
  }

  async getLocation() {
    navigator.geolocation.getCurrentPosition(function (position) {
      console.info(position.coords.latitude, position.coords.longitude);
    });
  }

  initMap() {
    var t = this;
    let icon_free = {
      url: '../../assets/car-green-min.png', size: new google.maps.Size(25, 42)
    };
    let icon_taken = {
      url: '../../assets/car-red-min.png', size: new google.maps.Size(25, 42)
    };

      t.map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: t.startLatitude, lng: t.startLongitude },
        zoom: 13,
        styles: t.mapStyle.style
      });

      for (let i = 0; i < t.definedPlaces.placRybny.length; i++) {
        console.log(i);
        let pos = {
          lat: t.definedPlaces.placRybny[i][1],
          lng: t.definedPlaces.placRybny[i][0]
        };

        if (i == 2) {
          t.markers[i] = new google.maps.Marker({
            position: pos,
            map: t.map,
            title: 'zajete',
            icon: icon_taken
          });
        }
        else {
          t.markers[i] = new google.maps.Marker({
            position: pos,
            map: t.map,
            title: 'wolne',
            icon: icon_free
          });
        }
      }
      let visibleMarkers = t.markers;
      new MarkerClusterer(t.map, visibleMarkers, { imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' })

    
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
}
