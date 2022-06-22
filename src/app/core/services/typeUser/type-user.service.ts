import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { TypeUser } from '../../models/typeUser.model';
@Injectable({
  providedIn: 'root'
})
export class TypeUserService {

  constructor(private http: HttpClient
  ) { }
  getAllTypeUsers() {
    return this.http.get<TypeUser[]>('http://localhost:8000/api/typeUsers');
  }
}
