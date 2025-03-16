import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  [x: string]: any;

  // load photos from api
  private API_URL = 'https://picsum.photos/v2/list?page=1&limit=10';

  constructor(private http: HttpClient) {}

  getPhotos(page: number): Observable<any> {
    return this.http
      .get(`https://picsum.photos/v2/list?page=${page}&limit=6`);
  }

  addToFavorites(photo: any): void {
    let favorites = this.getFavorites();
    if (!favorites.some((fav) => fav.id === photo.id)) {
      favorites.push(photo);
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
  }
  
  removeFromFavorites(photoId: string): void {
    let favorites = this.getFavorites().filter((fav) => fav.id !== photoId);
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }
  
  getFavorites(): any[] {
    return JSON.parse(localStorage.getItem('favorites') || '[]');
  }
  
  isFavorite(photoId: string): boolean {
    return this.getFavorites().some((fav) => fav.id === photoId);
  }

  getPhotoById(photoId: string) {
    return this.http.get(`https://picsum.photos/id/${photoId}/info`);
  }
  
}
