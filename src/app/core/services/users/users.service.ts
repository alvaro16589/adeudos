import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User, saveUser, updateUser } from '../../models/user.model';
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private http:HttpClient
  ) { }
  getAllUsers(){
    return this.http.get<User[]>(environment.url_of_api + 'users');
  }
  createUser(user : saveUser){
    return this.http.post(environment.url_of_api + 'users', user);
  }
  updateUser(id:string, changes : Partial<updateUser>){
    return this.http.put(environment.url_of_api + 'users/'+ id, changes);
  }
}
