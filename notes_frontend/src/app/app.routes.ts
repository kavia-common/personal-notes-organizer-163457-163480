import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { NotesLayoutComponent } from './pages/notes/notes-layout.component';
import { NoteEditorComponent } from './pages/notes/note-editor.component';
import { NoteViewComponent } from './pages/notes/note-view.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: NotesLayoutComponent,
    canActivate: [() => import('./utils/auth.guard').then(m => m.authGuard)],
    children: [
      { path: 'new', component: NoteEditorComponent },
      { path: 'note/:id', component: NoteViewComponent },
      { path: 'edit/:id', component: NoteEditorComponent },
      { path: '', pathMatch: 'full', redirectTo: 'new' }
    ]
  },
  { path: '**', redirectTo: '' }
];
