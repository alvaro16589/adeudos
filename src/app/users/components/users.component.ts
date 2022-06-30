import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/core/services/users/users.service';
import { User, saveUser, updateUser } from 'src/app/core/models/user.model';
import { TypeUserService } from 'src/app/core/services/typeUser/type-user.service';
import { TypeUser } from 'src/app/core/models/typeUser.model';
import { StateService } from 'src/app/core/services/state/state.service';
import { State } from 'src/app/core/models/state.model';

//trabajar con formularios
import { FormControl, FormGroup, Validators } from '@angular/forms';


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

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    nameac: new FormControl('', Validators.required),
    idtype: new FormControl('', Validators.required),
    idstate: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),

  });
  
  newUser!: saveUser;

  formUpdate = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    nameac: new FormControl('', Validators.required),
    idtype: new FormControl('', Validators.required),
    idstate: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
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
