import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TypeJob } from '../../models/typeJob.model';

@Injectable({
  providedIn: 'root'
})
export class TypeJobService {
  uri_jt = "jobtypes";
  constructor(private http: HttpClient
    ) { }
    getAllJobTypes() {
      return this.http.get<TypeJob[]>(environment.url_of_api + this.uri_jt);
    }
}
