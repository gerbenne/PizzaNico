import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { Tab3Page } from './tab3.page';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    // ReactiveFormsModule,
    RouterModule.forChild([{ path: '', component: Tab3Page }])
  ],
  declarations: [Tab3Page]
})
export class Tab3PageModule{
  constructor (private navController: NavController, private router: Router) {}

}

