import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { NotesService } from '../../services/notes.service';
import { Note } from '../../models/note.model';

/**
 * PUBLIC_INTERFACE
 * NoteViewComponent shows a single note and offers edit/delete actions.
 */
@Component({
  standalone: true,
  selector: 'app-note-view',
  imports: [CommonModule],
  templateUrl: './note-view.component.html',
  styleUrl: './note-view.component.css'
})
export class NoteViewComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private notes = inject(NotesService);

  note = signal<Note | null>(null);
  error = signal<string | null>(null);
  deleting = signal(false);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.error.set('Note not found');
      return;
    }
    this.notes.get(id).subscribe({
      next: (n) => this.note.set(n),
      error: () => this.error.set('Failed to load note')
    });
  }

  edit() {
    const n = this.note();
    if (n) {
      this.router.navigate(['/edit', n.id]);
    }
  }

  delete() {
    const n = this.note();
    if (!n) return;
    const w: any = typeof globalThis !== 'undefined' ? (globalThis as any) : undefined;
    const ok = w && typeof w.confirm === 'function' ? w.confirm('Delete this note? This cannot be undone.') : true;
    if (!ok) return;

    this.deleting.set(true);
    this.notes.delete(n.id).subscribe({
      next: () => {
        this.deleting.set(false);
        this.router.navigate(['/new']);
      },
      error: () => {
        this.deleting.set(false);
        this.error.set('Failed to delete note');
      }
    });
  }
}
