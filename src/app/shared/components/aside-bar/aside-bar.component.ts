import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserLogin } from 'src/app/core/models/user.model';
import { UsersService } from 'src/app/core/services/users/users.service';

@Component({
  selector: 'app-aside-bar',
  templateUrl: './aside-bar.component.html',
  styleUrls: ['./aside-bar.component.css']
})
export class AsideBarComponent implements OnInit, OnDestroy {
  title = "Ledad";
  user!: UserLogin ;
  constructor(
    private userService: UsersService
  ) {

  }

  ngOnInit(): void {
    this.userService.currentUserData.subscribe({
      next: (value) => {
        this.user = value[0];     
      }
    });
  }

  ngOnDestroy(): void {
    this.userService.currentUserData.unsubscribe();

  }

}
