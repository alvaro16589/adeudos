import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../models/user.model';
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private http:HttpClient
  ) { }
  getAllUsers(){
    return this.http.get<User[]>('http://localhost:8000/api/users');
  }
}
