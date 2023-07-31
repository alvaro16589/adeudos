import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { User, UserLogin, saveUser, updateUser } from '../../models/user.model';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentUserData: BehaviorSubject<UserLogin[]> = new BehaviorSubject<UserLogin[]>([{
    created_at:'',
    email:"",
    email_verified_at:"",
    id: 0,
    idstate: 0,
    idtype: 0,
    lastname: '',
    name: '',
    nameac: '',
    remember_token:'',
    state: '',
    type: '',
    updated_at: ''
  }])
  uri_user = "users";
  constructor(
    private http: HttpClient,
    private cookies: CookieService

  ) { }
  

  getUserLogin(nameac: string, password: string):Observable<UserLogin[]> {
    return this.http.get<UserLogin[]>(environment.url_of_api + this.uri_user + "/" + nameac + "/" + password).
    pipe(//ejecuta acciones adicionales
      tap( value =>{//se utliza para realizar acciones adicionales mientras se va ejecutando el observable
        
        // Object.keys devuelve un arreglo con las propiedades del objeto
        if (Object.keys(value).length!==0){
          this.currentUserData.next(value);
          this,this.currentUserLoginOn.next(true);
          
        }else{
          this.currentUserData.next(value);
          this,this.currentUserLoginOn.next(false);
        }
        
      }),
      catchError(this.handleError),
    );
  }

  get userData(): Observable<UserLogin[]>{
    return this.currentUserData.asObservable();
  }

  get userLoginOn():Observable<boolean>{
    return this.currentUserLoginOn.asObservable();
  }


  //########################### sample request #############################
  getAllUsers() {
    return this.http.get<User[]>(environment.url_of_api + this.uri_user);
  }
  createUser(user: saveUser) {
    return this.http.post(environment.url_of_api + this.uri_user, user);
  }

  updateUser(id: string, changes: Partial<updateUser>) {
    return this.http.patch(environment.url_of_api + this.uri_user + '/' + id, changes);
  }

  deleteUser(id: string) {
    return this.http.delete(environment.url_of_api + this.uri_user + '/' + id);
  }

  setToken(token: string) {
    this.cookies.set("token", token);
  }

  getToken() {
    return this.cookies.get("token");
  }


  //################### handle error ####################
  private handleError(error: HttpErrorResponse){
    if (error.status===0) {
      console.error('Se ha producido un error, el cual se muestra a continuación.', error.error);
    }else{
      console.error('Backend retornó un código de estado', error.status, error.error);
    }
    return throwError('Algo falló, intente nuevamente');
  }
}
