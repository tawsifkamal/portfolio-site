import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WorkExperience } from '../interfaces/work-experience';

@Injectable({
  providedIn: 'root'
})
export class WorkExperienceService {
  private apiUrl = 'http://localhost:3000/api/work-experiences';

  constructor(private http: HttpClient) { }

  getWorkExperiences(): Observable<WorkExperience[]> {
    return this.http.get<WorkExperience[]>(this.apiUrl);
  }
}
