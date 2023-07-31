import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { State } from '../../models/state.model';
import { environment } from 'src/environments/environment.prod';
//import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class StateService {
  constructor(
    private http: HttpClient
    ) { }

    getAllStates() {
      return this.http.get<State[]>(environment.url_of_api + 'states');
    }

    createState( state: State ){
      return this.http.post(environment.url_of_api + 'states',state);
    }
}
