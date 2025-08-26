import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotesService } from '../../services/notes.service';
import { Note } from '../../models/note.model';

/**
 * PUBLIC_INTERFACE
 * NoteEditorComponent allows creating and editing notes.
 */
@Component({
  standalone: true,
  selector: 'app-note-editor',
  imports: [CommonModule, FormsModule],
  templateUrl: './note-editor.component.html',
  styleUrl: './note-editor.component.css'
})
export class NoteEditorComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private notes = inject(NotesService);

  id: string | null = null;
  model = signal<Partial<Note>>({ title: '', content: '' });
  titleModel = '';
  contentModel = '';
  saving = signal(false);
  error = signal<string | null>(null);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.id = id;
    if (id) {
      this.notes.get(id).subscribe({
        next: (n) => {
          this.model.set({ title: n.title, content: n.content, tags: n.tags });
          this.titleModel = n.title || '';
          this.contentModel = n.content || '';
        },
        error: () => this.error.set('Failed to load note')
      });
    }
  }

  save() {
    this.saving.set(true);
    this.error.set(null);

    // Sync local fields into signal model before saving
    this.model.set({ ...this.model(), title: this.titleModel, content: this.contentModel });
    const payload = this.model();

    const obs = this.id
      ? this.notes.update(this.id, payload)
      : this.notes.create(payload);

    obs.subscribe({
      next: (n) => {
        this.saving.set(false);
        this.router.navigate(['/note', n.id]);
      },
      error: () => {
        this.saving.set(false);
        this.error.set('Failed to save note');
      }
    });
  }
}
