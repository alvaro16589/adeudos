import { Component, OnInit } from '@angular/core';
import { TypeJobService } from 'src/app/core/services/typeJob/type-job.service';
import { TypeUserService } from 'src/app/core/services/typeUser/type-user.service';
import { TypeUser, SaveTypeUser } from 'src/app/core/models/typeUser.model';
import { TypeJob, SaveTypeJob } from 'src/app/core/models/typeJob.model';

//trabajar con formularios
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
//

@Component({
  selector: 'app-others',
  templateUrl: './others.component.html',
  styleUrls: ['./others.component.css']
})
export class OthersComponent implements OnInit {
  typeJobs_: TypeJob[] = [];
  typeUsers_: TypeUser[] = [];

  //messsages on alerts of errors for user view
  messages = {
    msj1: "Words are missing",
    msj2: "The field is required",
    msj3: "The value should to be, between 20 to 100"
  }

  form = new UntypedFormGroup({
    name: new UntypedFormControl('', [Validators.required, Validators.minLength(3)]),
  });
  formUpdate = new UntypedFormGroup({
    id: new UntypedFormControl(),
    name: new UntypedFormControl('', [Validators.required, Validators.minLength(3)]),
  });

  constructor(
    private typeJobService: TypeJobService,
    private typeUserService: TypeUserService
  ) { }

  ngOnInit(): void {
    this.fetchTypeJobs();
    this.fetchTypeUsers();
  }

  fetchTypeJobs() {
    this.typeJobService.getAllJobTypes()
      .subscribe(typeJob => {
        this.typeJobs_ = typeJob;
      });
  }

  fetchTypeUsers() {
    this.typeUserService.getAllTypeUsers()
      .subscribe(typeUsers => {
        this.typeUsers_ = typeUsers;
      });
  }
  //crud type job
  createJobType() {
    
    this.typeJobService.createJobType(this.form.value)
      .subscribe(jobs => {

        this.fetchTypeJobs();//after storage items, it back to fill the table
        this.form.reset();//delete all fields from form
      });

  }

  updateJobType() {

    this.typeJobService.updateJobType(this.formUpdate.value.id, this.formUpdate.value)
      .subscribe(typeJob => {

        this.fetchTypeJobs();//after storage items, it back to fill the table
        alert("Save success...!");
      });

  }

  deleteJobType(id: string) {
    if (confirm("Are you sure?, this type will delete.")) {
      this.typeJobService.deleteJobType(id)
        .subscribe(typeJob => {
          this.fetchTypeJobs();//after storage items, it back to fill the table
        });
    }

  }

  fillUpdateFieldTypeJob(id: string) {
    for (let index = 0; index < this.typeJobs_.length; index++) {
      if (id == this.typeJobs_[index].id.toString()) {
        this.formUpdate.patchValue({
          id: this.typeJobs_[index].id,
          name: this.typeJobs_[index].name,
        })
      }

    }

  }
  //////////////////////end type job
  //····································crud type users
  createTypeUser() {
    
    this.typeUserService.createTypeUser(this.form.value)
      .subscribe(typeUsers => {

        this.fetchTypeUsers();//after storage items, it back to fill the table
        this.form.reset();//delete all fields from form
      });

  }

  updateTypeUser() {

    this.typeUserService.updateTypeUser(this.formUpdate.value.id, this.formUpdate.value)
      .subscribe(typeUser => {

        this.fetchTypeUsers();//after storage items, it back to fill the table
        alert("Save success...!");
      });

  }

  deleteTypeUser(id: string) {
    if (confirm("Are you sure?, this type will delete.")) {
      this.typeUserService.deleteTypeUser(id)
        .subscribe(TypeUser => {
          this.fetchTypeUsers();//after storage items, it back to fill the table
        });
    }

  }

  fillUpdateFieldTypeUser(id: string) {
    for (let index = 0; index < this.typeUsers_.length; index++) {
      if (id == this.typeUsers_[index].id.toString()) {
        this.formUpdate.patchValue({
          id: this.typeUsers_[index].id,
          name: this.typeUsers_[index].name,
        })
      }

    }

  }
  //////////////////////end type users
}
