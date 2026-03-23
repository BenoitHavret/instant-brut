import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.html',
  styleUrls: ['./contact.scss']
})
export class Contact implements OnInit {
  private route = inject(ActivatedRoute);
  
  // Signaux pour le formulaire
  photoInteret = signal<string>('');

  ngOnInit() {
    // On récupère le paramètre "photo" de l'URL
    this.route.queryParams.subscribe(params => {
      if (params['photo']) {
        this.photoInteret.set(params['photo']);
      }
    });
  }
}