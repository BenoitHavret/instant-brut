import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule],
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
}
