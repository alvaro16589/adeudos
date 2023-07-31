import { Component, OnInit} from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/core/services/users/users.service';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  swUserLogin: boolean = false;
  errorConnectionLoginMessage: string = "";
  formUser = new UntypedFormGroup({
    user: new UntypedFormControl(null, Validators.required),
    password: new UntypedFormControl(null, Validators.required)
  });

  constructor(

    private userService: UsersService,
    private router: Router

  ) { }

  ngOnInit(): void {
    console.log(this.userService.currentUserLoginOn.value)
    
    /*//recuperar los valores de inicio de sesión
    this.userService.currentUserLoginOn.subscribe(
      {
        next:(valueLoginUser)=>{ //recuperar el valor booleano de si esta o no logeado
          
          
        }
      }
    );
    this.userService.currentUserData.subscribe(
      {
        next:(value)=>{//recuperar el valor de los datos
          
        }
      }
    );*/
  }

  login(): void {
    this.userService.getUserLogin(this.formUser.value.user, this.formUser.value.password)
      .subscribe({
        next: (value) => {
          this.swUserLogin = !(this.userService.currentUserLoginOn.value);
          if (Object.keys(value).length !== 0) {
            this.router.navigateByUrl('/home');

          }
        },
        error: (err) => {
          console.error("ha ocurrido un error", err);
          this.errorConnectionLoginMessage = err;
        },
        complete: () => {
        },
      });

  }

  


}
