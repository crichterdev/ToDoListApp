// todo.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../shared/models/Task';


@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private apiUrl = 'https://localhost:7214';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = this.getJwtToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
  }

  private getJwtToken(): string | null {
    return sessionStorage.getItem('jwtToken');
  }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}/api/v1/task/all`, {
      headers: this.getHeaders(),
    });
  }

  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(`${this.apiUrl}/api/v1/task/add`, task, {
      headers: this.getHeaders(),
    });
  }

  updateTask(task: Task): Observable<Task> {
    return this.http.put<Task>(
      `${this.apiUrl}/api/v1/task/update/${task.id}`,
      task,
      {
        headers: this.getHeaders(),
      }
    );
  }

  deleteTask(taskId: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/api/v1/task/delete/${taskId}`,
      {
        headers: this.getHeaders(),
      }
    );
  }
}
