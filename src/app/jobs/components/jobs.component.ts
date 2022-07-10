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
  jobs: Job[] = [];
  total = 0;
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
    price: new UntypedFormControl('50', [Validators.required, Validators.min(20), Validators.max(200)]),
    idtype: new UntypedFormControl('', Validators.required),
    iduser: new UntypedFormControl('', Validators.required),
    idstate: new UntypedFormControl('', Validators.required),

  });

  formUpdate = new UntypedFormGroup({
    id: new UntypedFormControl(),
    title: new UntypedFormControl('', [Validators.required, Validators.minLength(2)]),
    detail: new UntypedFormControl('', [Validators.required, Validators.minLength(2)]),
    date: new UntypedFormControl('', Validators.required),
    price: new UntypedFormControl('', [Validators.required, Validators.min(20), Validators.max(200)]),
    idtype: new UntypedFormControl('', Validators.required),
    iduser: new UntypedFormControl('', Validators.required),
    idstate: new UntypedFormControl('', Validators.required),
  });

  formFilter = new UntypedFormGroup({
    iduser: new UntypedFormControl('', Validators.required),
    state: new UntypedFormControl('checked'),
  });

  constructor(
    private jobsService: JobsService,
    private typeJobService: TypeJobService,
    private stateService: StateService,
    private usersService: UsersService
  ) { }

  ngOnInit() {
    this.fetchJobs();
    this.fetchStates();
    this.fetchTypeJobs();
    this.fetchUsers();
  }
  fetchJobs() {
    this.jobsService.getAllJobs()
      .subscribe(jobs => {
        this.jobs = jobs;
        //Calculamos el TOTAL 
        this.total = this.jobs.reduce((
          acc,
          obj,
        ) => (obj.state == "activo") ? acc + obj.price : acc + 0, 0);

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
    console.log("estamos en createonejob");
    this.jobsService.createJob(this.form.value)
      .subscribe(jobs => {

        this.fetchJobs();//after storage items, it back to fill the table
        this.form.reset();//delete all fields from form
      });

  }

  updateJob() {

    this.jobsService.updateJob(this.formUpdate.value.id, this.formUpdate.value)
      .subscribe(user => {

        this.fetchJobs();//after storage items, it back to fill the table
        alert("Save success...!");
      });

  }

  deleteJobField(id: string) {
    if (confirm("Are you sure?, this Job will delete.")) {
      this.jobsService.deleteJob(id)
        .subscribe(user => {
          this.fetchJobs();//after storage items, it back to fill the table
        });
    }

  }

  fillUpdateField(id: string) {
    for (let index = 0; index < this.jobs.length; index++) {
      if (id == this.jobs[index].id.toString()) {
        this.formUpdate.patchValue({
          id: this.jobs[index].id,
          title: this.jobs[index].title,
          detail: this.jobs[index].detail,
          date: this.jobs[index].date,
          price: this.jobs[index].price,
          idtype: this.jobs[index].idtype,
          iduser: this.jobs[index].iduser,
          idstate: this.jobs[index].idstate
        })
      }

    }

  }
  changeStateJob(id_: string, state: string) {

    var ch = 0;
    if (state == "activo") {
      ch = 2;
    } else {
      ch = 1;
    }
    for (let index = 0; index < this.jobs.length; index++) {
      if (id_ == this.jobs[index].id.toString()) {
        this.formUpdate.patchValue({
          id: this.jobs[index].id,
          title: this.jobs[index].title,
          detail: this.jobs[index].detail,
          date: this.jobs[index].date,
          price: this.jobs[index].price,
          idtype: this.jobs[index].idtype,
          iduser: this.jobs[index].iduser,
          idstate: ch,
        })
      }

    }


    this.jobsService.updateJob(id_, this.formUpdate.value)
      .subscribe(user => {
        this.fetchJobs();//after storage items, it back to fill the table
      });
  }
  ///########################################## FILTERS ##############################################################
  filterForUser() {
    //console.log(this.formFilter.value.iduser.toString() + "  -----  " + this.formFilter.value.state.toString() );

    switch (this.formFilter.value.state) {
      case "0":
        if (this.formFilter.value.iduser == 0) {
          this.fetchJobs();
        } else {
          this.filterFix(this.formFilter.value.iduser.toString(), "0");
        }

        break;
      case "1":
        if (this.formFilter.value.iduser == 0) {
          this.filterByState(this.formFilter.value.state);
        } else{
          this.filterFix(this.formFilter.value.iduser.toString(), "1");
        }
        
        break;
      default:
        if (this.formFilter.value.iduser == 0) {
          this.filterByState(this.formFilter.value.state);
        } else{
          this.filterFix(this.formFilter.value.iduser.toString(), "2");
        }
        break;
    }

  }

  filterFix(idUser: string, state: string) {
    this.jobsService.getAllJobs()
      .subscribe(jobs => {

        let element: Job[] = [];
        let cont = 0;

        if (state == "0") {
          for (let index = 0; index < jobs.length; index++) {
            if (jobs[index].iduser.toString() == idUser) {
              element[cont] = jobs[index];
              cont++;
            }

          }

          this.jobs = element;

          //Calculamos el TOTAL 
          this.total = this.jobs.reduce((
            acc,
            obj,
          ) => acc + obj.price, 0);
        } else {
          for (let index = 0; index < jobs.length; index++) {
            if (jobs[index].iduser.toString() == idUser && jobs[index].idstate.toString() == state) {
              element[cont] = jobs[index];
              cont++;
            }

          }

          this.jobs = element;
          //Calculamos el TOTAL 
          this.total = this.jobs.reduce((
            acc,
            obj,
          ) => acc + obj.price, 0);
        }


      });
  }

  filterByState(state: any) {
    this.jobsService.getAllJobs()
      .subscribe(jobs => {

        let element: Job[] = [];
        let cont = 0;

        
          for (let index = 0; index < jobs.length; index++) {
            if (jobs[index].idstate.toString() == state) {
              element[cont] = jobs[index];
              cont++;
            }

          }

          this.jobs = element;

          //Calculamos el TOTAL 
          this.total = this.jobs.reduce((
            acc,
            obj,
          ) => acc + obj.price, 0);
        

      });
  }

}

