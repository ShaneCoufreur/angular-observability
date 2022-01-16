import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { UserInfo } from '../../../shared/user-info/user-info.model';
import { Training } from '../training.model';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  constructor(private http: HttpClient) { }

  getTrainings(): Observable<Training[]> {
    return this.http.get<Training[]>(environment.api + '/api/trainings.json');
  }
}
