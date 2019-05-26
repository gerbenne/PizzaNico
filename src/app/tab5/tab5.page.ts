import { Component,OnInit } from '@angular/core';
import { PizzasService } from "../services/pizzas.service";
import {AuthService} from "../services/authentication.service";
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab5',
  templateUrl: 'tab5.page.html',
  styleUrls: ['tab5.page.scss']
})
export class Tab5Page implements OnInit{
    private token = "";

    private pizzas = [];

    private likeUser = [];

    constructor(
        private PizzasService: PizzasService,
        private AuthService:AuthService,
        public toastController: ToastController
    ) { }

    ngOnInit(){
        this.init()
    }
    async init(){
        this.PizzasService.getAll()
            .then( apiResponse => this.providePizza(apiResponse))
            .catch( apiResponse => console.error(apiResponse) );
        await this.AuthService.getToken().then(res => this.provideToken(res));
        this.AuthService.getLike(this.token)
            .then( apiResponse => this.provideLikeUser(apiResponse))
            .catch( apiResponse => console.error(apiResponse) );
    }
    provideToken(token){
        this.token = token;
    }

    provideLikeUser(data){
      if (data.statusCode===""){
          this.likeUser = data.results;
      }
    }

    isPizzaLikedByUser(id){
      for(let row of this.likeUser){
        if(row.pizza_id===id){
          return true;
        }
      }
      return false;
    }

    async resrtLikeUser(){
      this.likeUser = [];
        await this.AuthService.getLike(this.token)
            .then( apiResponse => this.provideLikeUser(apiResponse))
            .catch( apiResponse => console.error(apiResponse));
    }

    async providePizza(data){
      let comp;
      for (let row of data.results){
        comp = await this.PizzasService.getIngds(row.id)
            .then( apiResponse => comp = apiResponse.results)
            .catch( apiResponse => console.error(apiResponse) );
        let obj = {"id":row.id,"name":row.name,"price":row.price,comp:[]};
        let subarr = [];
        for (let subrow of comp){
          subarr.push(subrow.name);
        }
        obj.comp = subarr;
        this.pizzas.push(obj);
      }
    }

    async like(id){
      const toast = await this.toastController.create({
        message: "J'aime",
        duration: 2000
      });
      toast.present();
        this.PizzasService.like(id,this.token)
            .then( apiResponse => this.resrtLikeUser())
            .catch( apiResponse => console.error(apiResponse) );
    }

    async unlike(id){
      const toast = await this.toastController.create({
        message: "J'aime pas trop",
        duration: 2000
      });
      toast.present();
        this.PizzasService.unlike(id,this.token)
            .then( apiResponse => this.resrtLikeUser())
            .catch( apiResponse => console.error(apiResponse) );
    }
    getPrice(str){
        return parseFloat(str).toFixed(2)
    }
}
