import { Routes } from '@angular/router';
import { Gallery } from './components/gallery/gallery';
import { Contact } from './components/contact/contact';

export const routes: Routes = [
  { 
    path: '', 
    component: Gallery // Affiche la galerie dès l'arrivée sur le site
  },
  { path: 'contact', component: Contact },
//   { 
//     path: 'boutique', 
//     loadComponent: () => import('./pages/shop/shop.component').then(m => m.ShopComponent) 
//     // Utilisation du "Lazy Loading" pour la performance (très Angular 21 !)
//   },
//   { 
//     path: 'contact', 
//     loadComponent: () => import('./pages/contact/contact.component').then(m => m.ContactComponent) 
//   },
  { 
    path: '**', 
    redirectTo: '' // Redirige les erreurs vers l'accueil
  }
];
