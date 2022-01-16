import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Bewertung } from './bewertung.model';

@Injectable({
  providedIn: 'root'
})
export class BewertungService {
  constructor(private http: HttpClient) {
  }

  getBewertungen(): Observable<Bewertung[]> {
    return this.http.get<Bewertung[]>('http://localhost:3000/bewertungen');
  }

  addBewertung(bewertung: Bewertung): Observable<unknown> {
    return this.http.put('http://localhost:3000/bewertungen', bewertung);
    // return of({...bewertung, id: `b${Math.ceil(Math.random() * 1e9)}`});
  }
}
