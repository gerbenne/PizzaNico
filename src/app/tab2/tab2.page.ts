import { Component,OnInit } from '@angular/core';
import {IngredientsService} from "../services/ingredients.service";
import {AuthService} from "../services/authentication.service";
import {Router} from "@angular/router";
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{

  public ingredients = [];

    constructor(
        private IngredientsService: IngredientsService,
    ) { }

  init(){
      this.IngredientsService.getAll()
          .then( apiResponse => this.provideIngredients(apiResponse) )
          .catch( apiResponse => console.error(apiResponse) )
  }

  provideIngredients(data){
      for (let row of data.results){
          this.ingredients.push(row);
      }
  }

  ngOnInit(){
    this.init()
  }
}
