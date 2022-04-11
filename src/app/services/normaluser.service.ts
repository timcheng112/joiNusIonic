import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NormalUserEntity } from '../models/normal-user-entity';
import { SessionService } from './session.service';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NormalUserService {

  baseUrl: string = "/api/NormalUser";

  constructor(private httpClient: HttpClient,
    private sessionService: SessionService) { }

    normalUserLogin(username: string | undefined, password: string | undefined): Observable<NormalUserEntity>
    {
      return this.httpClient.get<NormalUserEntity>(this.baseUrl + "/normalUserLogin?username=" + username + "&password=" + password).pipe
      (
        catchError(this.handleError)
      );
    }

    private handleError(error: HttpErrorResponse)
    {
      let errorMessage: string = "";
      
      if (error.error instanceof ErrorEvent) 
      {		
        errorMessage = "An unknown error has occurred: " + error.error;
      } 
      else 
      {		
        errorMessage = "A HTTP error has occurred: " + `HTTP ${error.status}: ${error.error}`;
      }
      
      console.error(errorMessage);
      
      return throwError(() => new Error(errorMessage));
    }

}
