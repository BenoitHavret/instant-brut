import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GalleryService {
  private http = inject(HttpClient);

  private allPhotos = signal<any[]>([])

  constructor() {
    this.http.get<any[]>('data/photos.json').subscribe({
      next: (data) => this.allPhotos.set(data),
      error: (err) => console.error("Erreur lors du chargement", err)
    })
  }

 getPhotosByCategory(category: string) {
    // 3. ICI : on lit le signal avec () pour créer la dépendance
    const photos = this.allPhotos(); 
    
    if (!category || category === 'tous') return photos;
    return photos.filter(p => p.category.toLowerCase() === category.toLowerCase());
  }

  public getCategories() {
    return [...new Set(this.allPhotos().map(p => p.category))];
  }
}
