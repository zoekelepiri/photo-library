import { Component, HostListener, OnInit } from '@angular/core';
import { PhotoService } from '../../services/photo.service';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-photos',
  imports: [RouterModule, CommonModule],
  templateUrl: './photos.component.html',
  styleUrl: './photos.component.css'
})
export class PhotosComponent implements OnInit{
  photos: any[] = [];
  loading = false;
  page = 1;

  constructor(private photoService: PhotoService) {}

  ngOnInit(): void {
    this.loadPhotos();
  }

  loadPhotos() {
    if (this.loading) return;
    this.loading = true;
  
    this.photoService.getPhotos(this.page).subscribe((data) => { 
      this.photos = [...this.photos, ...data];
      this.loading = false;
      this.page++;
    });
  }
  

  @HostListener('window:scroll', ['$event'])
  onScroll(): void {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 500
    ) {
      this.loadPhotos();
    }
  }

  toggleFavorite(photo: any): void {
    if (this.photoService.isFavorite(photo.id)) {
      this.photoService.removeFromFavorites(photo.id);
    } else {
      this.photoService.addToFavorites(photo);
    }
  }
  isFavorite(photoId: string): boolean {
    return this.photoService.isFavorite(photoId);
  }
  

}
