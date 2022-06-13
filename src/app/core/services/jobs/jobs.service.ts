import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Job } from '../../models/job.model';
@Injectable({
  providedIn: 'root'
})
export class JobsService {

  constructor(
    private http:HttpClient
  ) { }
  getAllJobs(){
    return this.http.get<Job[]>('http://localhost:8000/api/jobs');
  }
}
