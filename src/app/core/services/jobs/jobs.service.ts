import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Job, SaveJob } from '../../models/job.model';
import { environment } from 'src/environments/environment.prod';
//import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class JobsService {
  uri_j = "jobs"
  constructor(
    private http:HttpClient
  ) { }
  getAllJobs(){
    return this.http.get<Job[]>(environment.url_of_api + this.uri_j );
  }
  createJob(job : SaveJob){
    return this.http.post(environment.url_of_api + this.uri_j, job);
  }
  updateJob(id:string, changes : Partial<SaveJob>){
    return this.http.patch(environment.url_of_api + this.uri_j + '/' + id, changes);
  }
  deleteJob(id:string){
    return this.http.delete(environment.url_of_api+  this.uri_j + '/' + id);
  }

}
