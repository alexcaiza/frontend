import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PagoCuotaLote {
    codigopagocuotalote: Number;
    codigodeposito: Number;
    codigocuota: Number;
    codigolote: Number;
    valorpagocuotalote: Number;
    estado: String;
    fecharegistro: Date;
  }