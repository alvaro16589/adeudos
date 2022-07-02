import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User, saveUser, updateUser } from '../../models/user.model';
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  uri_user = "users";
  constructor(
    private http:HttpClient
  ) { }
  getAllUsers(){
    return this.http.get<User[]>(environment.url_of_api + this.uri_user);
  }
  createUser(user : saveUser){
    return this.http.post(environment.url_of_api + this.uri_user, user);
  }
  updateUser(id:string, changes : Partial<updateUser>){
    return this.http.put(environment.url_of_api + this.uri_user + '/' + id, changes);
  }
  deleteUser(id:string){
    return this.http.delete(environment.url_of_api+  this.uri_user + '/' + id);
  }
}
