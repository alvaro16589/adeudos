import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OthersRoutingModule } from './others-routing.module';
import { OthersComponent } from './components/others.component';

//para los formularios
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    OthersComponent
  ],
  imports: [
    CommonModule,
    OthersRoutingModule,
    ReactiveFormsModule
  ]
})
export class OthersModule { }
