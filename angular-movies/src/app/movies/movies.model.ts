import { actorsmovieDto } from "../actors/actors.model";
import { genreDTO } from "../genres/genres.model";
import { movieTheatersDTO } from "../movie-theaters/movie-theaters.model";

export interface movieCreationDto {
  title: string;
  summary: string;
  poster: File;
  inTheaters: boolean;
  releaseDate: Date;
  trailer: string;
  genreIds: number[];
  movieTheatreIds: number[];
  actors: actorsmovieDto[];
}

export interface movieDto {
  title: string;
  summary: string;
  poster: string;
  inTheatres: boolean;
  releaseDate: Date;
  trailer: string;
}

export interface MoviePostgetDto {
  genres: genreDTO[];
  movieTheatres: movieTheatersDTO[];
}
