import { Component,OnInit } from '@angular/core';
import {IngredientsService} from "../services/ingredients.service";
import { PizzasService } from "../services/pizzas.service";
import {AuthService} from "../services/authentication.service";
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{

    public ingredients = [];

    public composition = [];

    public name = "";

    private token = "";

    constructor(
        private IngredientsService: IngredientsService,
        private PizzasService: PizzasService,
        private AuthService:AuthService,
        public alertController: AlertController
    ) { }

    init(){
      this.IngredientsService.getAll()
          .then( apiResponse => this.provideIngredients(apiResponse) )
          .catch( apiResponse => console.error(apiResponse) );
      this.AuthService.getToken().then(res => this.provideToken(res));
    }

    provideIngredients(data){
      for (let row of data.results){
          this.ingredients.push(row);
      }
    }

    provideToken(token){
        this.token = token;
    }

    create(){
        if (this.name!=="" && this.composition.length>0){
            this.PizzasService.create(this.name,this.composition,this.token)
                .then( apiResponse => this.validate(apiResponse) )
                .catch( apiResponse => console.error(apiResponse) )
        }
    }

    async validate(data){
        if (data.statusCode==="200"){
            const alert = await this.alertController.create({
                header: data.results,
                buttons: ['Ok']
              });
              await alert.present();
            this.name = "";
            this.composition = [];
        }
    }

    addToComp(id){
        let find = false;
        let i=0;
        for(let row of this.composition){
            if (row.id===id){
                this.composition[i].qte++;
                find = !find;
            }
            i++;
        }
        if(!find){
            let obj = {"id":id,"qte":1};
            this.composition.push(obj);
        }
    }

    findname(id){
        for (let row of this.ingredients){
            if (row.id===id){
                return row.name
            }
        }
        return "";
    }

    remove(id){
        let find = false;
        let i = 0;
        let temparr = [];
        for (let row of this.composition){
            if (row.id===id){
                find = true;
                if (row.qte>1){
                    row.qte--;
                    temparr.push(row);
                }
            }
            else {
                temparr.push(row);
            }
            i++;
        }
        this.composition = temparr;
    }

    ngOnInit(){
        this.init()
    }
}
