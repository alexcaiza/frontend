import { Persona } from './../../models/Persona';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonasService {

  PHP_API_SERVER = "http://127.0.0.1:80/angular-php-app/backend/personas";

  constructor(private httpClient: HttpClient) {
  }

  readPersonas(): Observable<Persona[]> {
    return this.httpClient.get<Persona[]>(`${this.PHP_API_SERVER}/read.php`);
  }

  readPersonaByCedula(cedula: string) {
    return this.httpClient.get<Persona>(`${this.PHP_API_SERVER}/readcedula.php/?cedula=${cedula}`);
  }
}
