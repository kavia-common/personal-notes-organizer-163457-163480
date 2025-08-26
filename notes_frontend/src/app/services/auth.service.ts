import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { environment } from '../../environments/environment';

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  user?: {
    id: string;
    email: string;
  };
}

/**
 * PUBLIC_INTERFACE
 * AuthService provides login, logout and token management for API calls.
 */
@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);

  private tokenSubject = new BehaviorSubject<string | null>(this.getStoredToken());
  token$ = this.tokenSubject.asObservable();

  // PUBLIC_INTERFACE
  /** Returns whether a user is currently authenticated. */
  isAuthenticated$ = this.token$.pipe(map((t) => !!t));

  private getStoredToken(): string | null {
    try {
      const g: any = typeof globalThis !== 'undefined' ? (globalThis as any) : undefined;
      if (g && g.localStorage) {
        return g.localStorage.getItem(environment.authTokenKey);
      }
      return null;
    } catch {
      return null;
    }
  }

  private storeToken(token: string | null) {
    try {
      const g: any = typeof globalThis !== 'undefined' ? (globalThis as any) : undefined;
      if (g && g.localStorage) {
        if (token) {
          g.localStorage.setItem(environment.authTokenKey, token);
        } else {
          g.localStorage.removeItem(environment.authTokenKey);
        }
      }
    } catch {
      // ignore storage errors in SSR or restricted environments
    }
  }

  // PUBLIC_INTERFACE
  /** Perform login against the backend, storing the JWT on success. */
  login(payload: LoginRequest): Observable<void> {
    return this.http.post<LoginResponse>(`${environment.apiBaseUrl}/auth/login`, payload).pipe(
      tap((res) => {
        this.storeToken(res.token);
        this.tokenSubject.next(res.token);
      }),
      map(() => void 0)
    );
  }

  // PUBLIC_INTERFACE
  /** Clear token and logout locally. */
  logout() {
    this.storeToken(null);
    this.tokenSubject.next(null);
  }

  // PUBLIC_INTERFACE
  /** Returns the current token or null. */
  getToken(): string | null {
    return this.tokenSubject.value;
  }
}
