import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Note } from '../models/note.model';

/**
 * PUBLIC_INTERFACE
 * NotesService provides CRUD and search APIs for notes.
 */
@Injectable({ providedIn: 'root' })
export class NotesService {
  constructor(private http: HttpClient) {}

  // PUBLIC_INTERFACE
  /** Get all notes with optional search query. */
  list(query?: string): Observable<Note[]> {
    let params = new HttpParams();
    if (query && query.trim()) {
      params = params.set('q', query.trim());
    }
    return this.http.get<Note[]>(`${environment.apiBaseUrl}/notes`, { params });
  }

  // PUBLIC_INTERFACE
  /** Get a single note by id. */
  get(id: string): Observable<Note> {
    return this.http.get<Note>(`${environment.apiBaseUrl}/notes/${encodeURIComponent(id)}`);
  }

  // PUBLIC_INTERFACE
  /** Create a new note. */
  create(payload: Partial<Note>): Observable<Note> {
    return this.http.post<Note>(`${environment.apiBaseUrl}/notes`, payload);
  }

  // PUBLIC_INTERFACE
  /** Update an existing note. */
  update(id: string, payload: Partial<Note>): Observable<Note> {
    return this.http.put<Note>(`${environment.apiBaseUrl}/notes/${encodeURIComponent(id)}`, payload);
  }

  // PUBLIC_INTERFACE
  /** Delete a note by id. */
  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.apiBaseUrl}/notes/${encodeURIComponent(id)}`);
  }
}
