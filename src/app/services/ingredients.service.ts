/*
Imports and config
*/
// The "Injectable" interface is needed to define a service
import { Injectable } from '@angular/core';

// The "HttpClient" and "HttpHeaders" interface is needed to make HTTP request
import { HttpClient, HttpHeaders } from "@angular/common/http";

// Import the model to type your function/parameters

@Injectable({
    providedIn: 'root'
})


export class IngredientsService {

    // Declare your api URL
    private apiUrl = `https://apipizza.herokuapp.com/api/ingredients`;


    constructor(
        // Inject "HttpClient" in the class to use it
        private HttpClient: HttpClient,
    ) {

    }

    public getAll = (): Promise<any> => {
        // Optional: set header request
        let myHeader = new HttpHeaders();
        myHeader.append('Content-Type', 'application/json');

        return this.HttpClient.get( `${this.apiUrl}/`,  { headers: myHeader } )
            .toPromise() // Use Promise in an Angular Service
            .then( apiResponse => Promise.resolve(apiResponse) ) // Resolve Promise success
            .catch( apiResponse => Promise.reject(apiResponse) ) // Reject Promise error
    };

}