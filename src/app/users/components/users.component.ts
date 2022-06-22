import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/core/services/users/users.service';
import { User } from 'src/app/core/models/user.model';
import { TypeUserService } from 'src/app/core/services/typeUser/type-user.service';
import { TypeUser } from 'src/app/core/models/typeUser.model';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users_: User[]=[];
  typeUsers_ : TypeUser[]=[];
  
  constructor(
    private usersService: UsersService,
    private typeUserService: TypeUserService
  ) { }

  ngOnInit() {
    this.fetchJobs();
    this.fetchTypeUser();
  
  }
  fetchJobs(){
    this.usersService.getAllUsers()
    .subscribe(users =>{
      this.users_= users;
    });
  }
  fetchTypeUser(){
    this.typeUserService.getAllTypeUsers()
    .subscribe(typeUser =>{
      this.typeUsers_= typeUser;
    });
  }
}
