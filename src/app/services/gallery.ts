import { Injectable, signal } from '@angular/core';
import { Photo } from '../models/photo.model';

@Injectable({
  providedIn: 'root',
})
export class GalleryService {
  private allPhotos = signal<Photo[]>([
    { id: 1, url: 'assets/img/cheval-blanc.jpg', title: 'Étalon en Camargue', category: 'Chevaux' },
    { id: 2, url: 'assets/img/flamant-rose.jpg', title: 'Aube sur l\'étang', category: 'Oiseaux' },
    { id: 3, url: 'assets/img/taureau-noir.jpg', title: 'Puissance brute', category: 'Taureaux' },
    { id: 4, url: 'assets/img/abrivado.jpg', title: 'Course de rue', category: 'Tradition' }
  ])

  public getPhotosByCategory(category: string) {
    if(category === '')
      return this.allPhotos()
    return this.allPhotos().filter(p => p.category === category);
  }

  public getCategories() {
    return [...new Set(this.allPhotos().map(p => p.category))];
  }
}
