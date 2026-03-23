import { Routes } from '@angular/router';
import { Contact } from './components/contact/contact';
import { Shop } from './components/shop/shop';
import { Gallery } from './components/gallery/gallery';

export const routes: Routes = [
  { 
    path: '', 
    redirectTo: 'galerie/tous',
    pathMatch: 'full'
  },
  {
    path: 'galerie/:theme', component: Gallery
  },
  { path: 'contact', component: Contact },
  { path: 'boutique', component: Shop },
  { 
    path: '**', 
    redirectTo: '' // Redirige les erreurs vers l'accueil
  }
];
