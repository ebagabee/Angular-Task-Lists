import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Task {
  id: number;
  title: string;
  description: string;
  deadline: string;
}

interface TaskResponse {
  success: boolean;
  data: Task[];
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:3000/task'; // URL do seu endpoint

  constructor(private http: HttpClient) { }

  getTasks(): Observable<TaskResponse> {
    return this.http.get<TaskResponse>(this.apiUrl);
  }
}
