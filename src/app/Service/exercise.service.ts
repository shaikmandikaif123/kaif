import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Exercise } from '../Entity/Exercise';


@Injectable({
  providedIn: 'root'
})
export class ExerciseService {
  private baseUrl = 'http://localhost:8080/api/exercises'; // Change this URL according to your Spring Boot backend

  constructor(private http: HttpClient) { }

  createExercise(exercise: Exercise): Observable<Exercise> {
    return this.http.post<Exercise>(`${this.baseUrl}`, exercise);
  }
}
