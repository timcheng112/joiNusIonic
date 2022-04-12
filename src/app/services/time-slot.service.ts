import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TimeSlotEntity } from '../models/time-slot-entity';
import { CreateNewActivityPage } from '../create-new-activity/create-new-activity.page';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class TimeSlotService {
  baseUrl: string = '/api/TimeSlot';

  constructor(private httpClient: HttpClient) {}

  getAllAvailTimeSlots(): Observable<TimeSlotEntity[]> {
    return this.httpClient
      .get<TimeSlotEntity[]>(this.baseUrl + '/retrieveAllAvailTimeSlots')
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
