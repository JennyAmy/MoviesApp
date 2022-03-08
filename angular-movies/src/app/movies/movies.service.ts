import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { formatDateFormData } from '../utilities/utils';
import { movieCreationDto, MoviePostgetDto } from './movies.model';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private http: HttpClient) { }
  private apiUrl = environment.apiURL + '/movie';

  public postGet(): Observable<MoviePostgetDto> {
    return this.http.get<MoviePostgetDto>(`${this.apiUrl}/postget`);
  }

  public create(movieCreationDto: movieCreationDto) {
    const formData = this.BuildFormData(movieCreationDto);
    return this.http.post(this.apiUrl, formData);
  }

  private BuildFormData(movie: movieCreationDto): FormData {
    const formData = new FormData();

    formData.append('title', movie.title);
    formData.append('summary', movie.summary);
    formData.append('trailer', movie.trailer);
    formData.append('inTheaters', String(movie.inTheaters));

    if (movie.releaseDate) {
      formData.append('releaseDate', formatDateFormData(movie.releaseDate));
    }

    if (movie.poster) {
      formData.append('poster', movie.poster);
    }

    formData.append('genreIds', JSON.stringify(movie.genreIds));
    formData.append('movieTheatreIds', JSON.stringify(movie.movieTheatreIds));
    formData.append('actors', JSON.stringify(movie.actors));

    return formData;

  }
}
