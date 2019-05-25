import { Component,OnInit  } from '@angular/core';
import {
    GoogleMaps,
    GoogleMap,
    GoogleMapsEvent,
    GoogleMapOptions,
    CameraPosition,
    MarkerOptions,
    Marker,
    Environment
} from '@ionic-native/google-maps';

@Component({
    selector: 'app-tab3',
    templateUrl: 'tab3.page.html',
    styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

    map: GoogleMap;

    public locations = [
        [45.6513, 5.1010499999999865],
        [49.0474, 7.426179999999931],
        [45.0099, -0.43953799999997045],
        [48.0736, 7.348340000000007],
        [49.1143, 6.855040000000031],
        [48.088, 7.360080000000039],
        [48.621, 7.755670000000009],
        [48.8067, 7.775409999999965],
    ];

    public title =[
        'Saint Quentin Fallavier',
        'Bitche',
        'Saint André de Cubzac',
        'Colmar Gare',
        'Farebersviller',
        'Colmar Nord',
        "Hoenheim",
        'Haguenau'
    ];

    constructor() {
    }

    ionViewDidEnter() {
        this.loadMap();
    }

    loadMap() {
        // This code is necessary for browser
        Environment.setEnv({
            'API_KEY_FOR_BROWSER_RELEASE': 'AIzaSyCj8L1E9VFEExhEiIHYQNvpmC1xVEZ5alU',
            'API_KEY_FOR_BROWSER_DEBUG': 'AIzaSyCj8L1E9VFEExhEiIHYQNvpmC1xVEZ5alU'
        });

        let mapOptions: GoogleMapOptions = {
            camera: {
                target: {
                    lat: 46.661894,
                    lng: 2.435496
                },
                zoom: 5,
                tilt: 30
            }
        };

        this.map = GoogleMaps.create('map', mapOptions);
        for (let i = 0; i < this.locations.length; i++) {
            let lat = this.locations[i][0];
            let lng = this.locations[i][1];
            let title = this.title[i];
            let marker: Marker = this.map.addMarkerSync({
                    title: title,
                    icon: '#99d423',
                    animation: 'DROP',
                    position: {
                        lat: lat,
                        lng: lng
                    }
                });
        }

    }
}


