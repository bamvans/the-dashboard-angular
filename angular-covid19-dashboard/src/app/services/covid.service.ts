import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CovidService {
  private overallSubject = new Subject<any>();
  private latestSubject = new Subject<any>();

  constructor(private httpClient: HttpClient) {}

  private get(url: string): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/${url}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  callOverall() {
    this.get('timeline-overall.json').subscribe((x) => {
      this.overallSubject.next(x);
    });
  }

  getOverall(): Observable<any> {
    return this.overallSubject.asObservable();
  }

  callLatest() {
    this.get('timeline-latest.json').subscribe((x) => {
      this.latestSubject.next(x);
    });
  }

  getLatest(): Observable<any> {
    return this.latestSubject.asObservable();
  }
}
