import { Game } from './Game';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  PHP_API_SERVER = "http://127.0.0.1:80/angular-php-app/backend";

  constructor(private httpClient: HttpClient) {

  }

  readGames(): Observable<Game[]> {
    return this.httpClient.get<Game[]>(`${this.PHP_API_SERVER}/games/read.php`);
  }

  createGame(game: Game): Observable<Game> {
    return this.httpClient.post<Game>(`${this.PHP_API_SERVER}/games/create.php`, game);
  }

  updateGame(game: Game) {
    return this.httpClient.put<Game>(`${this.PHP_API_SERVER}/games/update.php`, game);
  }

  deleteGame(id: number) {
    return this.httpClient.delete<Game>(`${this.PHP_API_SERVER}/games/delete.php/?id=${id}`);
  }

  editGame(id: number) {
    return this.httpClient.get<Game>(`${this.PHP_API_SERVER}/games/readid.php/?id=${id}`);
  }

  updateGame2(name, price, id) {

    const obj = {
      name: name,
      price: price
    };
    this
      .httpClient
      .post(`${this.PHP_API_SERVER}/update/${id}`, obj)
      .subscribe(res => console.log('Done'));
  }
}
