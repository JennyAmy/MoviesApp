import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { movieTheatersCreationDTO, movieTheatersDTO } from './movie-theaters.model';

@Injectable({
  providedIn: 'root'
})
export class MovieTheatresService {

  constructor(private http: HttpClient) { }

  private apiURL = environment.apiURL + '/movieTheatres'

  public create(movieTheatreDTO: movieTheatersCreationDTO) {
    return this.http.post(this.apiURL, movieTheatreDTO);
  }

  public get(): Observable<movieTheatersDTO[]> {
    return this.http.get<movieTheatersDTO[]>(this.apiURL);
  }

  public getByid(id: number): Observable<movieTheatersDTO> {
    return this.http.get<movieTheatersDTO>(`${this.apiURL}/${id}`);
  }

  public edit(id: number, movieTheatersDTO: movieTheatersCreationDTO) {
    return this.http.put(`${this.apiURL}/${id}`, movieTheatersDTO);
  }

  public delete(id: number) {
    return this.http.delete(`${this.apiURL}/${id}`);
  }
}
