import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Request {
  requesterName: string;
  subject: string;
  submissionDate: string;
}

@Injectable({
  providedIn: 'root'  
})
export class RequestsService {

  private apiUrl = 'https://localhost:7002/api/requests';

  constructor(private http: HttpClient) { }

  getRequests(): Observable<Request[]> {
    return this.http.get<Request[]>(this.apiUrl);
  }
  addRequest(request: Request): Observable<any> {
  return this.http.post(this.apiUrl, request);
}

}
