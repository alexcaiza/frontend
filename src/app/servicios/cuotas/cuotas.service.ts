import { PagoCuotaLote } from '../../models/PagoCuotaLote';
import { Deposito } from './../../models/Deposito';
import { Lote } from './../../models/Lote';
import { Persona } from './../../models/Persona';
import { Cuota } from './../../models/Cuota';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CuotasService {

  PHP_API_SERVER = "http://127.0.0.1:80/angular-php-app/backend/cuotas";

  //XDEBUG_SESSION_START = "?XDEBUG_SESSION_START=ECLIPSE_DBGP&KEY=15764311442171";
  XDEBUG_SESSION_START = "?XDEBUG_SESSION_START=ECLIPSE_DBGP";
  
  constructor(private httpClient: HttpClient) {
  }

  readCuotas(): Observable<Cuota[]> {
    return this.httpClient.get<Cuota[]>(`${this.PHP_API_SERVER}/read.php${this.XDEBUG_SESSION_START}`);
  }

  readPersonas(): Observable<Persona[]> {
    return this.httpClient.get<Persona[]>(`${this.PHP_API_SERVER}/readpersonas.php${this.XDEBUG_SESSION_START}`);
  }

  readCuota(): Observable<Cuota[]> {
    return this.httpClient.get<Cuota[]>(`${this.PHP_API_SERVER}/readcuotas.php${this.XDEBUG_SESSION_START}`);
  }

  readLote(codigopersona): Observable<Lote[]> {
    return this.httpClient.get<Lote[]>(`${this.PHP_API_SERVER}/read_lotes_persona.php${this.XDEBUG_SESSION_START}&codigopersona=${codigopersona}`);
  }

  readDeposito(codigopersona): Observable<Deposito[]> {
    return this.httpClient.get<Deposito[]>(`${this.PHP_API_SERVER}/read_depositos_persona.php${this.XDEBUG_SESSION_START}&codigopersona=${codigopersona}`);
  }

  createPagoCuotaLote(pagoCuotaLote: PagoCuotaLote): Observable<PagoCuotaLote> {
    return this.httpClient.post<PagoCuotaLote>(`${this.PHP_API_SERVER}/create_pago_cuota_lote.php${this.XDEBUG_SESSION_START}`, pagoCuotaLote);
  }
}
