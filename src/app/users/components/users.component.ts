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
    name: new UntypedFormControl('', [Validators.required, Validators.minLength(2)]),
    lastname: new UntypedFormControl('', [Validators.required, Validators.minLength(2)]),
    nameac: new UntypedFormControl('', [Validators.required, Validators.minLength(2)]),
    idtype: new UntypedFormControl('', Validators.required),
    idstate: new UntypedFormControl('', Validators.required),
    email: new UntypedFormControl('',[ Validators.required,Validators.email]),
    password: new UntypedFormControl('', [Validators.required, Validators.minLength(7)]),

  });

  newUser!: saveUser;

  formUpdate = new UntypedFormGroup({
    id: new UntypedFormControl(),
    name: new UntypedFormControl('', Validators.required),
    lastname: new UntypedFormControl('', Validators.required),
    nameac: new UntypedFormControl('', Validators.required),
    idtype: new UntypedFormControl('', Validators.required),
    idstate: new UntypedFormControl('', Validators.required),
    email: new UntypedFormControl('', [Validators.required, Validators.email]),
    password: new UntypedFormControl('', Validators.required),
  });

  userUpdate!: updateUser;

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
        alert("Guardado con exito");
      });

  }

  fillUpdateField(id: string) {
    for (let index = 0; index < this.users_.length; index++) {
      if (id == this.users_[index].id.toString()) {
        this.formUpdate.patchValue({
          id: this.users_[index].id,
          name: this.users_[index].name,
          lastname: this.users_[index].lastname,
          nameac: this.users_[index].nameac,
          idtype: this.users_[index].idtype,
          idstate: this.users_[index].idstate,
          email: this.users_[index].email,
          password: this.users_[index].password,
        })
      }

    }

  }
  changeStateUser(id_: string, state: string) {

    var ch = 0;
    if (state == "activo") {
      ch = 2;
    } else {
      ch = 1;
    }
    for (let index = 0; index < this.users_.length; index++) {
      if (id_ == this.users_[index].id.toString()) {
        this.formUpdate.patchValue({
          id: this.users_[index].id,
          name: this.users_[index].name,
          lastname: this.users_[index].lastname,
          nameac: this.users_[index].nameac,
          idtype: this.users_[index].idtype,
          idstate: ch,
          email: this.users_[index].email,
          password: this.users_[index].password,
        })
      }

    }
    this.userUpdate = this.formUpdate.value;

    this.usersService.updateUser(id_, this.userUpdate)
      .subscribe(user => {
        this.fetchUsers();//after storage items, it back to fill the table
      });
  }

  deleteUserField(id : string){
    if(confirm("Are you sure?, this users will delete.")){
      this.usersService.deleteUser(id)
      .subscribe(user => {
        this.fetchUsers();//after storage items, it back to fill the table
      });
    }

  }

}
