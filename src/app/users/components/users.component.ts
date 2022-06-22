import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/core/services/users/users.service';
import { User } from 'src/app/core/models/user.model';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users_: User[]=[];
  
  
  constructor(
    private usersService: UsersService
  ) { }

  ngOnInit() {
    this.fetchJobs();
  
  }
  fetchJobs(){
    this.usersService.getAllUsers()
    .subscribe(users =>{
      this.users_= users;
      //Calculamos el TOTAL 
      

    });
  }
}
