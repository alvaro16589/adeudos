import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TypeJob } from '../../models/typeJob.model';

@Injectable({
  providedIn: 'root'
})
export class TypeJobService {
  constructor(private http: HttpClient
    ) { }
    getAllStates() {
      return this.http.get<TypeJob[]>(environment.url_of_api + 'jobtypes');
    }
}
