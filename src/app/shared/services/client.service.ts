import {Injectable} from '@angular/core';
import {environment} from '@/environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {DefaultResponse} from '../interfaces/default-response';
import {Movie} from '../interfaces/movie';
import {Banner} from '../interfaces/banner';
import {Country} from '../interfaces/country';
import {Genre} from '../interfaces/genre';
import {Episode} from '../interfaces/episode';
import {PaginateResponse} from '@/app/shared/interfaces/paginate-response';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private baseUrl = environment.api + '/clients';

  constructor(private httpClient: HttpClient) {
  }

  getAllTopMoviesSidebar(): Observable<DefaultResponse<{ movies?: Movie[], series?: Movie[] }>> {
    return this.httpClient
      .get<DefaultResponse<{ movies?: Movie[], series?: Movie[] }>>(`${this.baseUrl}/top-movies-sidebar`);
  }

  getAllTopMoviesBody(): Observable<DefaultResponse<{ movies?: Movie[], series?: Movie[], cartoons?: Movie[], cinemas?: Movie[] }>> {
    return this.httpClient
      .get<DefaultResponse<{ movies?: Movie[], series?: Movie[], cartoons?: Movie[], cinemas?: Movie[] }>>
      (`${this.baseUrl}/top-movies-body`);
  }

  getMovieDetail(slug: string): Observable<DefaultResponse<Movie>> {
    return this.httpClient
      .get<DefaultResponse<Movie>>(`${this.baseUrl}/find-movie-detail/${slug}`);
  }

  getMovieEpisodes(movieId: number): Observable<DefaultResponse<Episode[]>> {
    return this.httpClient
      .get<DefaultResponse<Episode[]>>(`${this.baseUrl}/find-episodes/${movieId}`);
  }

  getMovieType(slug: string, page: number = 1, pageSize = 18): Observable<DefaultResponse<PaginateResponse<Movie[]>>> {
    return this.httpClient
      .get<DefaultResponse<PaginateResponse<Movie[]>>>(`${this.baseUrl}/find-movie-type/${slug}?page=${page}&page_size=${pageSize}`);
  }

  getMovieGenre(slug: string, page: number = 1, pageSize = 18): Observable<DefaultResponse<PaginateResponse<Movie[]>>> {
    return this.httpClient
      .get<DefaultResponse<PaginateResponse<Movie[]>>>(`${this.baseUrl}/find-movie-genre/${slug}?page=${page}&page_size=${pageSize}`);
  }

  getMovieCountry(slug: string, page: number = 1, pageSize = 18): Observable<DefaultResponse<PaginateResponse<Movie[]>>> {
    return this.httpClient
      .get<DefaultResponse<PaginateResponse<Movie[]>>>(`${this.baseUrl}/find-movie-country/${slug}?page=${page}&page_size=${pageSize}`);
  }

  getMovieByName(name: string, page: number = 1, pageSize = 18): Observable<DefaultResponse<PaginateResponse<Movie[]>>> {
    return this.httpClient
      .get<DefaultResponse<PaginateResponse<Movie[]>>>(`${this.baseUrl}/find-movie-name/${name}?page=${page}&page_size=${pageSize}`);
  }

  getAllBanners(): Observable<DefaultResponse<Banner[]>> {
    return this.httpClient
      .get<DefaultResponse<Banner[]>>(`${this.baseUrl}/banners`);
  }

  getAllGenres(): Observable<DefaultResponse<Genre[]>> {
    return this.httpClient
      .get<DefaultResponse<Genre[]>>(`${this.baseUrl}/genres`);
  }

  getAllCountries(): Observable<DefaultResponse<Country[]>> {
    return this.httpClient
      .get<DefaultResponse<Country[]>>(`${this.baseUrl}/countries`);
  }
}
