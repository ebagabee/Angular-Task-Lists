import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task, ApiResponse } from '../models/task.model'; 

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:3000/task';

  constructor(private http: HttpClient) { }

  getTasks(): Observable<ApiResponse<Task[]>> {
    return this.http.get<ApiResponse<Task[]>>(this.apiUrl);
  }

  getTask(id: number): Observable<ApiResponse<Task>> {
    return this.http.get<ApiResponse<Task>>(`${this.apiUrl}/${id}`);
  }

  getTaskById(id: number) {
    return this.http.get<{ success: boolean; data: Task; message: string }>(`/task/${id}`);
  }

  createTask(task: Task): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(this.apiUrl, task);
  }

  updateTask(id: number, task: Task): Observable<ApiResponse<any>> {
    return this.http.patch<ApiResponse<any>>(`${this.apiUrl}/${id}`, task);
  }

  deleteTask(id: number): Observable<ApiResponse<any>> {
    return this.http.delete<ApiResponse<any>>(`${this.apiUrl}/${id}`);
  }
}
