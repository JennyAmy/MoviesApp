import { environment } from './../../environments/environment';
import { actorCreationDTO, actorDTO, actorsmovieDto } from './actors.model';
import { Injectable } from '@angular/core';
import { formatDateFormData } from '../utilities/utils';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActorsService {

  constructor(private http: HttpClient) { }

  private apiURL = environment.apiURL + '/actors'

  get(page: number, recordsPerPage: number): Observable<any> {
    let params = new HttpParams();
    params = params.append('page', page.toString());
    params = params.append('recordsPerPage', recordsPerPage.toString());
    return this.http.get<actorDTO[]>(this.apiURL, { observe: 'response', params });
  }

  getById(id: number): Observable<actorDTO> {
    return this.http.get<actorDTO>(`${this.apiURL}/${id}`);
  }

  searchByName(name: string): Observable<actorsmovieDto[]> {
    const headers = new HttpHeaders('Content-Type: application/json');
    return this.http.post<actorsmovieDto[]>(`${this.apiURL}/searchByName`,
      JSON.stringify(name), { headers });
  }

  create(actor: actorCreationDTO) {
    const formData = this.buildFormData(actor);
    return this.http.post(this.apiURL, formData);
  }


  edit(id: number, actor: actorCreationDTO) {
    const formData = this.buildFormData(actor);
    return this.http.put(`${this.apiURL}/${id}`, formData);
  }

  private buildFormData(actor: actorCreationDTO): FormData {
    const formData = new FormData();

    formData.append('name', actor.name);

    if (actor.biography) {
      formData.append('biography', actor.biography);
    }

    if (actor.dateOfBirth) {
      formData.append('dateOfBirth', formatDateFormData(actor.dateOfBirth));
    }

    if (actor.picture) {
      formData.append('picture', actor.picture);
    }

    return formData;
  }
}
