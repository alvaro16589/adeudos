import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/core/services/users/users.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  
  constructor(
    private userService: UsersService,
    private router:Router
  ) { }

  ngOnInit(): void {
  }

  logout(){
    this.userService.currentUserLoginOn.next(false);
    this.userService.currentUserData.next([]);
    this.router.navigateByUrl('/')
  }
}
