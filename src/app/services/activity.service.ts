import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ActivityEntity } from '../models/activity-entity';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class ActivityService {
  baseUrl: string = '/api/Activity';

  constructor(private httpClient: HttpClient) {}

  getActivities(): Observable<ActivityEntity[]> {
    return this.httpClient
      .get<ActivityEntity[]>(this.baseUrl + '/retrieveAllActivities')
      .pipe(catchError(this.handleError));
  }

  createNewActivity(newActivity: ActivityEntity): Observable<number> {
    return this.httpClient
      .put<number>(this.baseUrl, newActivity, httpOptions)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage: string = '';

    if (error.error instanceof ErrorEvent) {
      errorMessage = 'An unknown error has occurred: ' + error.error;
    } else {
      errorMessage =
        'A HTTP error has occurred: ' + `HTTP ${error.status}: ${error.error}`;
    }

    console.error(errorMessage);

    return throwError(() => new Error(errorMessage));
  }
}
