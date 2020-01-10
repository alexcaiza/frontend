import { Persona } from './Persona';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Deposito {
    codigodeposito: Number;
    numerodeposito: String;
    codigopersona: Number;
    fechadeposito: Date;
    valordeposito: Number;
    valorutilizado: Number;
    tipodeposito: String;
    cedula: String;
    primernombre: String;
    segundonombre: String;
    primerapellido: String;
    segundoapellido: String;
    estado: String;
    socios: Persona[];
  }