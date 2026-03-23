import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, computed, HostListener, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GalleryService } from '../../services/gallery';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './gallery.html',
  styleUrl: './gallery.scss',
})
export class Gallery {
  private route = inject(ActivatedRoute);
  private galleryService = inject(GalleryService);
  // On utilise un Signal pour une détection de changement ultra-rapide
  photos = computed(() => {
    const theme = this.route.snapshot.params['theme'] || 'tous';
    return this.galleryService.getPhotosByCategory(theme);
  });
  currentTheme = signal<string>('');

  selectedIdx = signal<number | null>(null);

  // ... dans ton constructor ou inject :
constructor(private router: Router) {
  // Chaque fois que l'URL change (ex: /galerie/faune -> /galerie/paysages)
    // this.route.params.subscribe(params => {
    //   const theme = params['theme'];
    //   this.currentTheme.set(theme);
      
    //   if (theme === 'tous') {
    //     // Logique pour tout afficher si tu veux une vue globale
    //     this.photos.set(this.galleryService.getPhotosByCategory('')); // À adapter
    //   } else {
    //     this.photos.set(this.galleryService.getPhotosByCategory(theme));
    //   }
    // });
  }


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
