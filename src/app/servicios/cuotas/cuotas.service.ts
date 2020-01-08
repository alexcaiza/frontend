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
  XDEBUG_SESSION_START1 = "?x=1";
  XDEBUG_SESSION_START2 = "?XDEBUG_SESSION_START=ECLIPSE_DBGP";
  
  constructor(private httpClient: HttpClient) {
  }

  readCuotas(): Observable<Cuota[]> {
    return this.httpClient.get<Cuota[]>(`${this.PHP_API_SERVER}/read.php${this.XDEBUG_SESSION_START1}`);
  }

  readPersonas(textSearch): Observable<Persona[]> {
    return this.httpClient.get<Persona[]>(`${this.PHP_API_SERVER}/readpersonas.php${this.XDEBUG_SESSION_START1}&textSearch=${textSearch}`);
  }

  readCuota(): Observable<Cuota[]> {
    return this.httpClient.get<Cuota[]>(`${this.PHP_API_SERVER}/readcuotas.php${this.XDEBUG_SESSION_START1}`);
  }

  readLote(codigopersona): Observable<Lote[]> {
    return this.httpClient.get<Lote[]>(`${this.PHP_API_SERVER}/read_lotes_persona.php${this.XDEBUG_SESSION_START1}&codigopersona=${codigopersona}`);
  }

  readDeposito(codigopersona): Observable<Deposito[]> {
    return this.httpClient.get<Deposito[]>(`${this.PHP_API_SERVER}/read_depositos_persona.php${this.XDEBUG_SESSION_START1}&codigopersona=${codigopersona}`);
  }

  createPagoCuotaLote(pagoCuotaLote: PagoCuotaLote): Observable<PagoCuotaLote> {
    return this.httpClient.post<PagoCuotaLote>(`${this.PHP_API_SERVER}/pago_cuota_lote_create.php${this.XDEBUG_SESSION_START1}`, pagoCuotaLote);
  }

  consultarPagoCuotaLoteSum(codigocuota, codigolote): Observable<any> {
    return this.httpClient.get<any>(`${this.PHP_API_SERVER}/pago_cuota_lote_consulta.php${this.XDEBUG_SESSION_START1}&codigocuota=${codigocuota}&codigolote=${codigolote}`);
  }

  consultarCuotasLotes(codigocuota): Observable<any> {
    return this.httpClient.get<any>(`${this.PHP_API_SERVER}/read_cuotas_lotes.php${this.XDEBUG_SESSION_START1}&codigocuota=${codigocuota}`);
  }

  consultarCuotasLotes2(params): Observable<any> {
    return this.httpClient.post<any>(`${this.PHP_API_SERVER}/read_cuotas_lotes_2.php${this.XDEBUG_SESSION_START1}`, params);
  }
}
