import { Component, OnInit } from '@angular/core';
import { UserLogin } from 'src/app/core/models/user.model';
import { UsersService } from 'src/app/core/services/users/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userlogin!: UserLogin;
  constructor(
    private userService: UsersService
  ) { }
    
  ngOnInit(): void {
    this.userService.currentUserData.subscribe(
      {
        next:(value)=>{
          this.userlogin = value[0]
        }
      }
    )
  }

}
