import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NotesService } from '../../services/notes.service';
import { Note } from '../../models/note.model';
import { AuthService } from '../../services/auth.service';

/**
 * PUBLIC_INTERFACE
 * NotesLayoutComponent provides the sidebar and main content area with search.
 */
@Component({
  standalone: true,
  selector: 'app-notes-layout',
  imports: [CommonModule, RouterOutlet, RouterLink, FormsModule],
  templateUrl: './notes-layout.component.html',
  styleUrl: './notes-layout.component.css'
})
export class NotesLayoutComponent implements OnInit {
  private notesService = inject(NotesService);
  private router = inject(Router);
  private auth = inject(AuthService);

  notes = signal<Note[]>([]);
  query = signal('');
  queryModel = '';

  ngOnInit() {
    // Redirect to login if not authenticated
    if (!this.auth.getToken()) {
      this.router.navigate(['/login']);
      return;
    }
    this.loadNotes();
  }

  loadNotes() {
    this.notesService.list(this.query()).subscribe({
      next: (data) => this.notes.set(data),
      error: () => this.notes.set([])
    });
  }

  onSearchChange() {
    this.query.set(this.queryModel);
    this.loadNotes();
  }

  newNote() {
    this.router.navigate(['/new']);
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
