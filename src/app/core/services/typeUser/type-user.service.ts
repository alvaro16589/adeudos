import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { TypeUser, SaveTypeUser } from '../../models/typeUser.model';
import { environment } from 'src/environments/environment.prod';
//import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class TypeUserService {
  uri_tu = 'typeUsers';
  constructor(private http: HttpClient
  ) { }
  getAllTypeUsers() {
    return this.http.get<TypeUser[]>(environment.url_of_api + 'typeUsers');
  }
  createTypeUser(typeUser: SaveTypeUser){
    return this.http.post(environment.url_of_api + this.uri_tu, typeUser);
  }
  updateTypeUser(id:string, changes : Partial<SaveTypeUser>){
    return this.http.put(environment.url_of_api + this.uri_tu + '/' + id, changes);
  }
  deleteTypeUser(id:string){
    return this.http.delete(environment.url_of_api+  this.uri_tu + '/' + id);
  }

}
