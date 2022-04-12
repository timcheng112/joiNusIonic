import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ActivityEntity } from '../models/activity-entity';
import { NormalUserEntity } from '../models/normal-user-entity';
import { PunishReq } from '../models/punish-req';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class ActivityService {
  baseUrl: string = '/api/Activity';

  constructor(private httpClient: HttpClient) { }

  getActivities(): Observable<ActivityEntity[]> {
    return this.httpClient
      .get<ActivityEntity[]>(this.baseUrl + '/retrieveAllActivities')
      .pipe(catchError(this.handleError));
  }

  getMyActivities(): Observable<ActivityEntity[]> {
    return this.httpClient
      .get<ActivityEntity[]>(this.baseUrl + '/retrieveMyActivities')
      .pipe(catchError(this.handleError));
  }

  createNewActivity(
    newActivity: ActivityEntity,
    facilityName: string
  ): Observable<number> {
    return this.httpClient
      .put<number>(this.baseUrl, { newActivity, facilityName }, httpOptions)
      .pipe(catchError(this.handleError));
  }

  // addComment(
  //   comment: string,
  //   commentOwner: NormalUserEntity,
  //   commentDate: Date
  // ) {
  //   return this.httpClient
  //     .put<number>(
  //       this.baseUrl,
  //       { comment, commentOwner, commentDate },
  //       httpOptions
  //     )
  //     .pipe(catchError(this.handleError));
  // }

  private handleError(error: HttpErrorResponse) {
    let errorMessage: string = "";
    console.log(error.status);
    console.log(error.error.message);
    if (error.error instanceof ErrorEvent) 
    {		
      errorMessage = "An unknown error has occurred: " + error.error;
    } 
    else 
    {		
      errorMessage = "A HTTP error has occurred: " + `HTTP ${error.status}: ${error.error}`;
    }
    
    console.log("hmm");
    console.error(errorMessage);
    
    return throwError(() => new Error(errorMessage));
  }

  punishUsers(activityIdIn: number, absenteeIdsIn: number[]): Observable<any> 
  {
    console.log("here");
    console.log(activityIdIn);
    console.log(absenteeIdsIn);

    let punishReq: PunishReq = new PunishReq(activityIdIn, absenteeIdsIn);

    return this.httpClient.put<any>(this.baseUrl + "/punishUsers/", punishReq, httpOptions).pipe
    (
      catchError(this.handleError)
    );

  }
}
