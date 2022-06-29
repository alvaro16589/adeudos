import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { TypeUser } from '../../models/typeUser.model';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class TypeUserService {

  constructor(private http: HttpClient
  ) { }
  getAllTypeUsers() {
    return this.http.get<TypeUser[]>(environment.url_of_api + 'typeUsers');
  }
  
}
