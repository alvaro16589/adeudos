import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobsRoutingModule } from './jobs-routing.module';
import { JobsComponent } from './components/jobs.component';
//para los formularios
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    JobsComponent
  ],
  imports: [
    CommonModule,
    JobsRoutingModule,
    ReactiveFormsModule
  ]
})
export class JobsModule { }
