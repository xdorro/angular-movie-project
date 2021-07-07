import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Genre} from '../interfaces/genre';

@Injectable({
  providedIn: 'root'
})
export class GenreService {

  private baseUrl = environment.api + '/genres';

  constructor(private http: HttpClient) {
  }

  getAllGenres(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  getGenreByGenreId(movieId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${movieId}`);
  }

  createGenre(body: Genre): Observable<any> {
    return this.http.post(`${this.baseUrl}`, {
      name: body.name,
      slug: body.slug,
      status: body.status
    });
  }

  updateGenreByGenreId(movieId: number, body: Genre): Observable<any> {
    return this.http.put(`${this.baseUrl}/${movieId}`, {
        name: body.name,
        slug: body.slug,
        status: body.status
      }
    );
  }

  deleteGenreByGenreId(movieId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${movieId}`);
  }
}
