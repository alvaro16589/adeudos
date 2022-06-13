import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobsService } from './services/jobs/jobs.service';



@NgModule({
  declarations: [],
  providers:[
    JobsService,
  ],
  imports: [
    CommonModule
  ]
})
export class CoreModule { }
