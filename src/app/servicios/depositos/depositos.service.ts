import { Deposito } from './../../models/Deposito';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepositosService {

  PHP_API_SERVER = "http://127.0.0.1:80/angular-php-app/backend/depositos";

  XDEBUG_SESSION_START_1 = "?x=1";
  XDEBUG_SESSION_START_2 = "?XDEBUG_SESSION_START=ECLIPSE_DBGP";
  
  constructor(private httpClient: HttpClient) {
  }

  readDepositos(): Observable<Deposito[]> {
    return this.httpClient.get<Deposito[]>(`${this.PHP_API_SERVER}/read.php${this.XDEBUG_SESSION_START_1}`);
  }

  createDeposito(deposito: Deposito): Observable<Deposito> {
    return this.httpClient.post<Deposito>(`${this.PHP_API_SERVER}/create.php${this.XDEBUG_SESSION_START_1}`, deposito);
  }

  updateDeposito(deposito: Deposito) {
    return this.httpClient.put<Deposito>(`${this.PHP_API_SERVER}/update.php`, deposito);
  }

  deleteDeposito(id: number) {
    return this.httpClient.delete<Deposito>(`${this.PHP_API_SERVER}/delete.php/?id=${id}`);
  }

  editDeposito(id: number) {
    return this.httpClient.get<Deposito>(`${this.PHP_API_SERVER}/readid.php/?id=${id}`);
  }

  updateDeposito2(name, price, id) {
    console.log("Metodo: updateDeposito2()");

    const obj = {
      id: id,
      name: name,
      price: price
    };

    console.log(obj);

    this.httpClient.post(`${this.PHP_API_SERVER}/update.php/${id}`, obj).subscribe(res => console.log('Done'));
  }
}
