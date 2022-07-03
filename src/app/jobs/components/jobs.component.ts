import { Component, OnInit } from '@angular/core';
import { JobsService } from 'src/app/core/services/jobs/jobs.service';
import { Job, SaveJob } from 'src/app/core/models/job.model';
import { TypeJob } from 'src/app/core/models/typeJob.model';
import { State } from 'src/app/core/models/state.model';
//trabajar con formularios
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
//
import { User } from 'src/app/core/models/user.model';
import { TypeJobService } from 'src/app/core/services/typeJob/type-job.service';
import { StateService } from 'src/app/core/services/state/state.service';
import { UsersService } from 'src/app/core/services/users/users.service';



@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit {
  jobs: Job[]=[];
  total = 0 ;
  typeJobs_: TypeJob[] = [];
  states_: State[] = [];
  users_: User[] = [];
  //mensajes
  messages = {
    msj1: "Words are missing",
    msj2: "The field is required",
    msj3: "The value should to be, between 20 to 100"
  }

  form = new UntypedFormGroup({
    title: new UntypedFormControl('', [Validators.required, Validators.minLength(2)]),
    detail: new UntypedFormControl('', [Validators.required, Validators.minLength(2)]),
    date: new UntypedFormControl('', Validators.required),
    price: new UntypedFormControl('20', [Validators.required,Validators.min(20),Validators.max(100)]),
    idtype: new UntypedFormControl('', Validators.required),
    iduser: new UntypedFormControl('', Validators.required),
    idstate: new UntypedFormControl('', Validators.required),

  });

  newJob!: SaveJob;

  formUpdate = new UntypedFormGroup({
    
    title: new UntypedFormControl('', [Validators.required, Validators.minLength(2)]),
    detail: new UntypedFormControl('', [Validators.required, Validators.minLength(2)]),
    date: new UntypedFormControl('', Validators.required),
    price: new UntypedFormControl('', [Validators.required,Validators.min(20),Validators.max(100)]),
    idtype: new UntypedFormControl('', Validators.required),
    iduser: new UntypedFormControl('', Validators.required),
    idstate: new UntypedFormControl('', Validators.required),
  });

  jobUpdate!: SaveJob;

  constructor(
    private jobsService: JobsService,
    private typeJobService : TypeJobService,
    private stateService:StateService,
    private usersService: UsersService
  ) { }

  ngOnInit() {
    this.fetchJobs();
    this.fetchStates();
    this.fetchTypeJobs();
    this.fetchUsers();
  }
  fetchJobs(){
    this.jobsService.getAllJobs()
    .subscribe(jobs =>{
      this.jobs= jobs;
      //Calculamos el TOTAL 
      this.total = this.jobs.reduce((
        acc,
        obj,
      ) => acc + obj.price , 0 );

    });
  }

  fetchUsers() {
    this.usersService.getAllUsers()
      .subscribe(users => {
        this.users_ = users;
      });
  }

  fetchTypeJobs() {
    this.typeJobService.getAllJobTypes()
      .subscribe(typeJob => {
        this.typeJobs_ = typeJob;
      });
  }

  fetchStates() {

    this.stateService.getAllStates()
      .subscribe(states => {
        this.states_ = states;
      }
      )
  }

  createOneJob() {

    this.jobsService.createJob(this.form.value)
      .subscribe(jobs => {

        this.fetchJobs();//after storage items, it back to fill the table
        this.form.reset();//delete all fields from form
      });

  }

  updateJob(id:string) {

    this.jobsService.updateJob(id, this.formUpdate.value)
      .subscribe(user => {

        this.fetchJobs();//after storage items, it back to fill the table
        alert("Save success...!");
      });

  }

  deleteJobField(id: string) {
    if (confirm("Are you sure?, this Job will delete.")) {
      this.jobsService.deleteJob(id)
        .subscribe(user => {
          this.fetchUsers();//after storage items, it back to fill the table
        });
    }

  }

}
