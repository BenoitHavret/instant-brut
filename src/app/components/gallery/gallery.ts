import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, HostListener, signal } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './gallery.html',
  styleUrl: './gallery.scss',
})
export class Gallery {
  // On utilise un Signal pour une détection de changement ultra-rapide
  photos = signal([
    { id: 1, url: 'assets/img/cheval-blanc.jpg', title: 'Étalon en Camargue', category: 'Chevaux' },
    { id: 2, url: 'assets/img/flamant-rose.jpg', title: 'Aube sur l\'étang', category: 'Oiseaux' },
    { id: 3, url: 'assets/img/taureau-noir.jpg', title: 'Puissance brute', category: 'Taureaux' },
    { id: 4, url: 'assets/img/abrivado.jpg', title: 'Course de rue', category: 'Tradition' }
  ]);

  selectedIdx = signal<number | null>(null);

  // ... dans ton constructor ou inject :
constructor(private router: Router) {}

  openLightbox(index: number) {
    this.selectedIdx.set(index);
  }

  closeLightbox() {
    this.selectedIdx.set(null);
  }

  next(event: Event) {
    event.stopPropagation();
    const current = this.selectedIdx();
    if (current !== null) {
      this.selectedIdx.set((current + 1) % this.photos().length);
    }
  }

  prev(event: Event) {
    event.stopPropagation();
    const current = this.selectedIdx();
    if (current !== null) {
      this.selectedIdx.set((current - 1 + this.photos().length) % this.photos().length);
    }
  }

  // Bonus : Gérer les touches du clavier (Flèches et Echap) sur ton Mac
  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if (this.selectedIdx() === null) return;
    if (event.key === 'ArrowRight') this.next(event);
    if (event.key === 'ArrowLeft') this.prev(event);
    if (event.key === 'Escape') this.closeLightbox();
  }

  orderPrint(photo: any) {
  // On ferme la lightbox
  this.closeLightbox();
  
  // On redirige vers contact avec un paramètre (QueryParam)
  this.router.navigate(['/contact'], { 
    queryParams: { photo: photo.title } 
  });
}
// Ajoute cette méthode dans ta classe GalleryComponent
sharePhoto(photo: any, event: Event) {
  event.stopPropagation(); // Pour éviter de fermer la lightbox au clic

  const shareData = {
    title: `Instant Brut - ${photo.title}`,
    text: `Découvrez cette photographie de Camargue : ${photo.title}`,
    url: window.location.href // Partage l'URL actuelle avec le paramètre de la photo
  };

  // Si le navigateur supporte le partage natif (Mobile / Safari Mac)
  if (navigator.share) {
    navigator.share(shareData)
      .then(() => console.log('Partage réussi'))
      .catch((err) => console.log('Erreur de partage', err));
  } else {
    // Fallback : On copie le lien dans le presse-papier pour les vieux navigateurs
    navigator.clipboard.writeText(window.location.href);
    alert('Lien de la photo copié dans le presse-papier !');
  }
}
}
