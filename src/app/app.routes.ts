import { Routes } from '@angular/router';

export const routes: Routes = [
      { 
        path:'peliculas' , 
        loadComponent: () => import('./peliculas/peliculas.component').then((m) => m.PeliculasComponent)
      },
      { 
        path: '', 
        redirectTo: '/peliculas', 
        pathMatch: 'full' 
      },
      { 
        path:'altaActor' , 
        loadComponent: () => import('./alta-actor/alta-actor.component').then((m) => m.AltaActorComponent)
      },
      { 
        path:'altaPelicula' , 
        loadComponent: () => import('./alta-pelicula/alta-pelicula.component').then((m) => m.AltaPeliculaComponent)
      },
      { 
        path:'actor' , 
        loadComponent: () => import('./actor/actor.component').then((m) => m.ActorComponent)
      },
];
