import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-favorites',
  imports: [RouterModule, CommonModule],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css'
})
export class FavoritesComponent {
  favorites: any[] = JSON.parse(localStorage.getItem('favorites') || '[]');

  removeFavorite(photo: any) {
    this.favorites = this.favorites.filter(f => f.id !== photo.id);
    localStorage.setItem('favorites', JSON.stringify(this.favorites));
  }
}
