import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from "@angular/common/http";


@Injectable({
    providedIn: 'root'
})


export class PizzasService{

    private apiUrl = `https://apipizza.herokuapp.com/api/pizza`;


    constructor(
        private HttpClient: HttpClient,
    ) {

    }

    public create = (name: String, comp: Array<object>,token: String): Promise<any> => {

        let myHeader = new HttpHeaders();
        return this.HttpClient.post( `${this.apiUrl}/create/`,{"name":name,"token":token,"ingredients":comp},  { headers: myHeader } )
            .toPromise()
            .then( apiResponse => Promise.resolve(apiResponse) ) // Resolve Promise success
            .catch( apiResponse => Promise.reject(apiResponse) ) // Reject Promise error
    };

}