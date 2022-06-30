import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/core/services/users/users.service';
import { User, saveUser, updateUser } from 'src/app/core/models/user.model';
import { TypeUserService } from 'src/app/core/services/typeUser/type-user.service';
import { TypeUser } from 'src/app/core/models/typeUser.model';
import { StateService } from 'src/app/core/services/state/state.service';
import { State } from 'src/app/core/models/state.model';

//trabajar con formularios
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';


//
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users_: User[] = [];
  typeUsers_: TypeUser[] = [];
  states_: State[] = [];

  form = new UntypedFormGroup({
    name: new UntypedFormControl('', Validators.required),
    lastname: new UntypedFormControl('', Validators.required),
    nameac: new UntypedFormControl('', Validators.required),
    idtype: new UntypedFormControl('', Validators.required),
    idstate: new UntypedFormControl('', Validators.required),
    email: new UntypedFormControl('', Validators.required),
    password: new UntypedFormControl('', Validators.required),

  });
  
  newUser!: saveUser;

  formUpdate = new UntypedFormGroup({
    id: new UntypedFormControl(),
    name: new UntypedFormControl(),
    lastname: new UntypedFormControl(),
    nameac: new UntypedFormControl(),
    idtype: new UntypedFormControl(),
    idstate: new UntypedFormControl(),
    email: new UntypedFormControl(),
    password: new UntypedFormControl(),
  });
  
  userUpdate! : updateUser;

  constructor(

    private usersService: UsersService,
    private typeUserService: TypeUserService,
    private stateService: StateService,

  ) {

  }

  ngOnInit() {
    this.fetchUsers();
    this.fetchTypeUser();
    this.fetchStates();

  }

  fetchUsers() {
    this.usersService.getAllUsers()
      .subscribe(users => {
        this.users_ = users;
      });
  }

  fetchTypeUser() {
    this.typeUserService.getAllTypeUsers()
      .subscribe(typeUser => {
        this.typeUsers_ = typeUser;
      });
  }

  fetchStates() {

    this.stateService.getAllStates()
      .subscribe(states => {
        this.states_ = states;
      }
      )
  }

  createOneUser() {
    this.newUser = this.form.value;

    this.usersService.createUser(this.newUser)
      .subscribe(user => {

        this.fetchUsers();//after storage items, it back to fill the table
        this.form.reset();//delete all fields from form
      });

  }

  updateUser() {
    this.userUpdate = this.formUpdate.value;

    this.usersService.updateUser(this.userUpdate.id.toString(), this.userUpdate)
      .subscribe(user => {

        this.fetchUsers();//after storage items, it back to fill the table
      });

  }

}
