import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TypeJob, SaveTypeJob } from '../../models/typeJob.model';

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
    createJobType(typeJob : SaveTypeJob){
      return this.http.post(environment.url_of_api + this.uri_jt, typeJob);
    }
    updateJobType(id:string, changes : Partial<SaveTypeJob>){
      return this.http.put(environment.url_of_api + this.uri_jt + '/' + id, changes);
    }
    deleteJobType(id:string){
      return this.http.delete(environment.url_of_api+  this.uri_jt + '/' + id);
    }
}
