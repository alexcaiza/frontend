import {Injectable, OnInit} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Cuota {
    codigocuota: Number;
    descripcioncuota: String;
    valorcuota: Number;
    fechainicio: Date;
    fechafin: Date;
  }