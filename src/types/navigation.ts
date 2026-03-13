// Tipos de navegación para React Navigation

import type { MovieDetails } from './index';

/**
 * Parámetros de las rutas principales
 */
export type RootStackParamList = {
  Config: undefined;
  Login: undefined;
  Library: undefined;
  MovieDetails: {
    movieId: string;
  };
  Player: {
    movie: MovieDetails;
  };
};

/**
 * Nombres de las rutas
 */
export type RouteName = keyof RootStackParamList;
