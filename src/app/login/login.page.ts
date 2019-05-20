import { Component,OnInit  } from '@angular/core';
import { Router } from  "@angular/router";
import { AuthService } from "../services/authentication.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
    selector: 'app-login',
    templateUrl: 'login.page.html',
    styleUrls: ['login.page.scss']
})
export class LoginPage implements OnInit {

    public form: FormGroup;

    constructor(
        private AuthService: AuthService,
        private router:  Router,
        private FormBuilder: FormBuilder
    ) { }

    toRegister():void {
        this.router.navigateByUrl('register');
    }

    public login = () => {
        this.AuthService.login( this.form.value.email, this.form.value.password )
            .then( apiResponse => this.AuthService.setToken(apiResponse['results']))
            .catch( apiResponse => console.error(apiResponse) )
    };

    private initForm = () => {
        this.form = this.FormBuilder.group({
            email: [ "", Validators.required ],
            password: [ "", Validators.required ]
        })
    };

    ngOnInit() {
        this.initForm()
    }

}
