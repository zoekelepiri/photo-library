import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PhotoService } from '../../services/photo.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-photo-detail',
  imports: [RouterModule, CommonModule ],
  templateUrl: './photo-detail.component.html',
  styleUrl: './photo-detail.component.css'
})
export class PhotoDetailComponent implements OnInit {
  photo: any;

  constructor(
    private route: ActivatedRoute,
    private photoService: PhotoService
  ) {}

  ngOnInit(): void {
    const photoId = this.route.snapshot.paramMap.get('id');
    if (photoId) {
      this.photoService.getPhotoById(photoId).subscribe((data) => {
        this.photo = data;
      });
    }
  }

  toggleFavorite(): void {
    if (this.photoService.isFavorite(this.photo.id)) {
      this.photoService.removeFromFavorites(this.photo.id);
    } else {
      this.photoService.addToFavorites(this.photo);
    }
  }

  isFavorite(): boolean {
    return this.photoService.isFavorite(this.photo.id);
  }
}
