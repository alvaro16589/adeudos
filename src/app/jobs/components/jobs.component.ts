import { Component, OnInit } from '@angular/core';
import { JobsService } from 'src/app/core/services/jobs/jobs.service';
import { Job } from 'src/app/core/models/job.model';
@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit {
  jobs: Job[]=[];
  total = 0 ;
  
  constructor(
    private jobsService: JobsService
  ) { }

  ngOnInit() {
    this.fetchJobs();
  
  }
  fetchJobs(){
    this.jobsService.getAllJobs()
    .subscribe(jobs =>{
      this.jobs= jobs;
      //Calculamos el TOTAL 
      this.total = this.jobs.reduce((
        acc,
        obj,
      ) => acc + obj.price , 0 );

    });
  }

}
