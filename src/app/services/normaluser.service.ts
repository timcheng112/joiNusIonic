import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NormalUserEntity } from '../models/normal-user-entity';
import { SessionService } from './session.service';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CreateNormalUserReq } from '../models/create-normal-user-req';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class NormalUserService {
  baseUrl: string = '/api/NormalUser';

  constructor(
    private httpClient: HttpClient,
    private sessionService: SessionService
  ) {}

  normalUserLogin(
    username: string | undefined,
    password: string | undefined
  ): Observable<NormalUserEntity> {
    return this.httpClient
      .get<NormalUserEntity>(
        this.baseUrl +
          '/normalUserLogin?username=' +
          username +
          '&password=' +
          password
      )
      .pipe(catchError(this.handleError));
  }

  retrieveNormalUsersByName(
    name: string | undefined
  ): Observable<NormalUserEntity[]> {
    return this.httpClient
      .get<NormalUserEntity[]>(
        this.baseUrl + '/retrieveNormalUsersByName?name=' + name
      )
      .pipe(catchError(this.handleError));
  }

  profile(productId: number): Observable<NormalUserEntity> {
    return this.httpClient
      .get<NormalUserEntity>(this.baseUrl + '/profile/')
      .pipe(catchError(this.handleError));
  }

  createNewNormalUser(
    newNormalUser: NormalUserEntity,
    categoryIds: number[]
  ): Observable<number> {
    let createNormalUserReq: CreateNormalUserReq = new CreateNormalUserReq(
      newNormalUser,
      categoryIds
    );
    return this.httpClient
      .put<number>(
        this.baseUrl + '/createNewNormalUser/',
        createNormalUserReq,
        httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  retrieveLeaderboard(): Observable<NormalUserEntity[]> {
    return this.httpClient
      .get<NormalUserEntity[]>(this.baseUrl + '/retrieveLeaderboard')
      .pipe(catchError(this.handleError));
  }

  retrieveNormalUserRank(userId: number): Observable<number> {
    console.log("sending out : " + userId);
    return this.httpClient
      .get<number>(this.baseUrl + '/retrieveNormalUserRank/' + userId)
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
