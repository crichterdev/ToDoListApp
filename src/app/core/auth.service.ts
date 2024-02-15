import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';
import { AuthenticationResponse } from './models/authentication-response';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://localhost:7214/api/v1';
  private loggedIn = new BehaviorSubject<boolean>(this.isAuthenticated());

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<AuthenticationResponse> {
    const loginData = { email, password };
    return this.http
      .post<AuthenticationResponse>(`${this.apiUrl}/auth/login`, loginData)
      .pipe(
        tap((response) => {
          sessionStorage.setItem('jwtToken', response.token);
          this.loggedIn.next(true);
        })
      );
  }

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  isAuthenticated(): boolean {
    const token = sessionStorage.getItem('jwtToken');
    return !!token; // Devuelve true si hay un token, false si no lo hay
  }

  get isLoggedInValue(): boolean {
    return this.loggedIn.value;
  }
}
