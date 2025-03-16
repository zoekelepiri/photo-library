import { Routes } from '@angular/router';
import { PhotosComponent } from './components/photos/photos.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { PhotoDetailComponent } from './components/photo-detail/photo-detail.component';

export const routes: Routes = [
    { path: '', component: PhotosComponent },
    { path: 'favorites', component: FavoritesComponent },
    { path: 'photos/:id', component: PhotoDetailComponent, data: { renderMode: 'default' }}
];
