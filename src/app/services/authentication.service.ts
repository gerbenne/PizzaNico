/* 
Imports and config
*/
// The "Injectable" interface is needed to define a service
import { Injectable } from '@angular/core';

// The "HttpClient" and "HttpHeaders" interface is needed to make HTTP request
import { HttpClient, HttpHeaders } from "@angular/common/http";

// Import the model to type your function/parameters
import { UserModel } from "../models/user.model";

import { BehaviorSubject } from 'rxjs';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import {Pro} from "@ionic/pro";
const TOKEN_KEY = 'auth-token';

// Config
@Injectable({
    providedIn: 'root'
})
//


/* 
Export
*/
export class AuthService {

    // Declare your api URL
    private apiUrl = `https://apipizza.herokuapp.com/api/accounts`;

    authenticationState = new BehaviorSubject(false);

    constructor(
        // Inject "HttpClient" in the class to use it
        private HttpClient: HttpClient,
        private storage: Storage, private plt: Platform,
    ) {
        this.plt.ready().then(() => {
            this.checkToken();
        });
    }

    checkToken() {
        this.storage.get(TOKEN_KEY).then(res => {
            if (res) {
                this.authenticationState.next(true);
            }
        })
    }
    /* 
    Function to register a user
    - Param need to be type "UserModel"
    - Function return a Promise
    */
    public signup = ( data: UserModel ): Promise<any> => {
        // Optional: set header request
        let myHeader = new HttpHeaders();
        myHeader.append('Content-Type', 'application/json');

        return this.HttpClient.post( `${this.apiUrl}/signup/`, data, { headers: myHeader } )
            .toPromise() // Use Promise in an Angular Service
            .then( apiResponse => Promise.resolve(apiResponse) ) // Resolve Promise success
            .catch( apiResponse => Promise.reject(apiResponse) ) // Reject Promise error
    };

    public login = ( email: String, password: String ): Promise<any> => {
        // Optional: set header request
        let myHeader = new HttpHeaders();
        return this.HttpClient.post( `${this.apiUrl}/login/`, { "username":email, "password":password}, { headers: myHeader } )
            .toPromise() // Use Promise in an Angular Service
            .then( apiResponse => Promise.resolve(apiResponse) ) // Resolve Promise success
            .catch( apiResponse => Promise.reject(apiResponse) ) // Reject Promise error
    };

    public getLike = (token:String) : Promise<any>=>{
        let myHeader = new HttpHeaders();
        return this.HttpClient.post( `${this.apiUrl}/getlike`, { "token":token}, { headers: myHeader } )
            .toPromise() // Use Promise in an Angular Service
            .then( apiResponse => Promise.resolve(apiResponse) ) // Resolve Promise success
            .catch( apiResponse => Promise.reject(apiResponse) ) // Reject Promise error
    };


    setToken(token){
        return this.storage.set(TOKEN_KEY, token).then(() => {
            this.authenticationState.next(true);
        });
    };

    isAuthenticated() {
        return this.authenticationState.value;
    }

    getToken(){
        return this.storage.get(TOKEN_KEY);
    }

}
