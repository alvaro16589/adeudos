import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobsService } from './services/jobs/jobs.service';
import { UsersService } from './services/users/users.service';
import { StateService } from './services/state/state.service';
import { TypeJobService } from './services/typeJob/type-job.service';
import { TypeUserService } from './services/typeUser/type-user.service';



@NgModule({
  declarations: [],
  providers:[
    JobsService,
    UsersService,
    StateService,
    TypeJobService,
    TypeUserService
  ],
  imports: [
    CommonModule
  ]
})
export class CoreModule { }
