import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './shop.html',
  styleUrls: ['./shop.scss']
})
export class Shop {
  // On définit tes offres de tirages
  products = signal([
    {
      id: 'fine-art',
      title: 'Tirage Fine Art',
      description: 'Papier Hahnemühle 305g, texture mate, idéal pour les noirs profonds.',
      price: 'à partir de 45€',
      image: '/assets/img/shop/fine-art.jpg'
    },
    {
      id: 'alu-dibond',
      title: 'Alu-Dibond',
      description: 'Rendu moderne et rigide, sans reflet. Prêt à être accroché.',
      price: 'à partir de 120€',
      image: '/assets/img/shop/alu-dibond.jpg'
    },
    {
      id: 'cadre-bois',
      title: 'Caisse Américaine',
      description: 'Le summum de l\'élégance. Cadre en bois massif noir ou chêne.',
      price: 'à partir de 190€',
      image: '/assets/img/shop/frame.jpg'
    }
  ]);
}