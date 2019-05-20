import { Component,OnInit } from '@angular/core';
import { Router } from  "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../services/authentication.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
    providers: [ AuthService ],
})
export class RegisterPage implements OnInit{

    public form: FormGroup;

    public errMdp = false;

    public done = false;

    public errCreate = false;

    constructor(private  router:  Router, private FormBuilder: FormBuilder, private AuthService: AuthService) { }
    toLogin():void {
        this.router.navigateByUrl('login');
    }

    ngOnInit() {
        this.initForm()
    }

    public signin = () => {
        if(this.form.value.passwordC===this.form.value.password){
            let data = {
                "first_name": this.form.value.first_name,
                "last_name": this.form.value.last_name,
                "mail": this.form.value.mail,
                "password": this.form.value.password,
                "phone": this.form.value.phone
            };
            this.AuthService.signup( data )
                .then( apiResponse => this.validateForm(apiResponse) )
                .catch( apiResponse => console.error(apiResponse) )
        }
        else{
            this.errMdp = true;
            this.done = false;
            this.errCreate = false;
        }
    };

    private validateForm(apiResponse){
        if(apiResponse.statusCode==="500"){
            this.errCreate = apiResponse.error.errorMessage;
        }else{
            this.done = true;
            this.errMdp = false;
            this.errCreate = false;
            this.initForm()
        }
    }

    private initForm = () => {
        this.form = this.FormBuilder.group({
            first_name: [ undefined, Validators.required ],
            last_name: [ undefined, Validators.required ],
            mail: [ undefined, Validators.required ],
            password: [ undefined, Validators.required ],
            passwordC: [ undefined, Validators.required ],
            phone: [ undefined, Validators.required ]
        })
    }
}