import { Routes } from '@angular/router';
import { Contact } from './components/contact/contact';
import { Gallery } from './components/gallery/gallery';
import { Shop } from './components/shop/shop';

export const routes: Routes = [
  { 
    path: '', 
    component: Gallery // Affiche la galerie dès l'arrivée sur le site
  },
  { path: 'contact', component: Contact },
  { path: 'boutique', component: Shop },
  { 
    path: '**', 
    redirectTo: '' // Redirige les erreurs vers l'accueil
  }
];
