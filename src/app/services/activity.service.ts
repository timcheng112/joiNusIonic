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
import { CreateActivityReq } from '../models/create-activity-req';
import { SessionService } from './session.service';
import { AddCommentReq } from '../models/add-comment-req';
import { SignUpForActivityReq } from '../models/sign-up-for-activity-req';
import { PunishReq } from '../models/punish-req';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class ActivityService {
  baseUrl: string = '/api/Activity';

  constructor(
    private httpClient: HttpClient,
    private sessionService: SessionService
  ) {}

  getActivities(): Observable<ActivityEntity[]> {
    return this.httpClient
      .get<ActivityEntity[]>(this.baseUrl + '/retrieveAllActivities')
      .pipe(catchError(this.handleError));
  }

  getActivityByActivityId(activityId: number): Observable<ActivityEntity> {
    return this.httpClient
      .get<ActivityEntity>(
        this.baseUrl +
          '/retrieveActivity/' +
          activityId +
          '?username=' +
          this.sessionService.getUsername() +
          '&password=' +
          this.sessionService.getPassword()
      )
      .pipe(catchError(this.handleError));
  }

  signUpForActivity(activityId: number): Observable<any> {
    let signUpForActivityReq: SignUpForActivityReq = new SignUpForActivityReq(
      this.sessionService.getUsername(),
      this.sessionService.getPassword(),
      activityId
    );

    return this.httpClient
      .put<any>(
        this.baseUrl + '/signUpForActivity/',
        signUpForActivityReq,
        httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  // getMyActivities(): Observable<ActivityEntity[]> {
  //   return this.httpClient
  //     .get<ActivityEntity[]>(this.baseUrl + '/retrieveMyActivities')
  //     .pipe(catchError(this.handleError));
  // }

  createNewActivity(
    newActivityName: string,
    newActivityDescription: string,
    newActivityMaxParticipants: number,
    newActivityTags: string[],
    categoryId: number | null,
    timeSlotId: number | null
  ): Observable<any> {
    let createActivityReq: CreateActivityReq = new CreateActivityReq(
      this.sessionService.getUsername(),
      this.sessionService.getPassword(),
      newActivityName,
      newActivityDescription,
      newActivityMaxParticipants,
      newActivityTags,
      categoryId,
      timeSlotId
    );

    console.log(createActivityReq);

    return this.httpClient
      .put<any>(
        this.baseUrl + '/createNewActivity/',
        createActivityReq,
        httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  addComment(text: string, activityId: number): Observable<any> {
    let addCommentReq: AddCommentReq = new AddCommentReq(
      this.sessionService.getUsername(),
      this.sessionService.getPassword(),
      text,
      activityId
    );

    return this.httpClient
      .put<any>(this.baseUrl + '/addComment/', addCommentReq, httpOptions)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage: string = '';
    console.log(error.status);
    console.log(error.error.message);
    if (error.error instanceof ErrorEvent) {
      errorMessage = 'An unknown error has occurred: ' + error.error;
    } else {
      errorMessage =
        'A HTTP error has occurred: ' + `HTTP ${error.status}: ${error.error}`;
    }

    console.log('hmm');
    console.error(errorMessage);

    return throwError(() => new Error(errorMessage));
  }

  punishUsers(activityIdIn: number, absenteeIdsIn: number[]): Observable<any> {
    console.log('here');
    console.log(activityIdIn);
    console.log(absenteeIdsIn);

    let punishReq: PunishReq = new PunishReq(activityIdIn, absenteeIdsIn);

    return this.httpClient
      .put<any>(this.baseUrl + '/punishUsers/', punishReq, httpOptions)
      .pipe(catchError(this.handleError));
  }
}
