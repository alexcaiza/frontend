import { Persona } from '../../models/Persona';
import { CuotasService } from '../../servicios/cuotas/cuotas.service';
import { Cuota } from '../../models/Cuota';
import { Component, OnInit } from '@angular/core';

import {Observable} from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import 'rxjs/Rx';

import { FlashMessagesService } from 'angular2-flash-messages';

import { CompleterService, CompleterData, CompleterItem } from 'ng2-completer';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.css']
})
export class ExampleComponent implements OnInit {

  searchStr2:string;

  cuotas : Cuota[];

  public searchStr: string;
  
  public cuotaStr: string;
  public cedulaStr: string;

  public cuotaSelected = false;
  
  public selectedColor: string;
  public selectedCuota: string;
  public selectedPersona: string;

  public dataService: CompleterData;
  
  public dataServiceCuotas: CompleterData;
  
  public dataServiceCedulas: CompleterData;
  
  public searchData = [
    { color: 'red', value: '#f00', },
    { color: 'green', value: '#0f0' },
    { color: 'blue', value: '#00f' },
    { color: 'cyan', value: '#0ff' },
    { color: 'magenta', value: '#f0f' },
    { color: 'yellow', value: '#ff0' },
    { color: 'black', value: '#000' },
    { color: 'flipkart', value: 'flipkart-coupons' }
  ];

  public myOtherValue: string;

  public captain: string;
  
  public captains = ['James T. Kirk', 'Benjamin Sisko', 'Jean-Luc Picard', 'Spock', 'Jonathan Archer', 'Hikaru Sulu', 'Christopher Pike', 'Rachel Garrett'];

  constructor(
    private completerService: CompleterService,
    private cuotasService: CuotasService,
    public flashMessagesService: FlashMessagesService,
  ) {
    //this.dataService = completerService.local(this.searchData, 'color', 'color');
    // Load data in delay using an Observale
    let timedRes = Observable.from([this.searchData]).delay(3000);
    
    this.dataService = completerService.local(timedRes, 'color', 'color');


    this.myOtherValue = 'alexcaiza';

    this.dataServiceCuotas = completerService.remote(`http://localhost/angular-php-app/backend/cuotas/read.php?query=&myOtherParam=${this.myOtherValue}`, 'descripcioncuota', 'descripcioncuota');

    this.dataServiceCedulas = completerService.remote(`http://localhost/angular-php-app/backend/cuotas/readpersonas.php?query=&myOtherParam=${this.myOtherValue}`, 'cedula', 'cedula');

  }

  ngOnInit() {
    this.buscarCuotas();
    this.buscarPersonas();
  }

  buscarCuotas() {
    console.log('METODO: ExampleComponent.buscarCuotas()');
    this.cuotasService.readCuotas().subscribe((cuotas: Cuota[]) => {
      this.cuotas = cuotas;
      console.log(this.cuotas);
      this.flashMessagesService.show('La busqueda de cuotas se realizo correctamente.', { cssClass: 'alert-success', timeout: 4000 });
    });
  }

  buscarPersonas() {
    console.log('METODO: ExampleComponent.buscarPersonas()');
    this.cuotasService.readCuotas().subscribe((cuotas: Cuota[]) => {
      this.cuotas = cuotas;
      console.log(this.cuotas);
      this.flashMessagesService.show('La busqueda de cuotas se realizo correctamente.', { cssClass: 'alert-success', timeout: 4000 });
    });
  }

  public onSelected(item: CompleterItem) {
    console.log('METODO: onSelected()');
    this.selectedCuota = item ? item.title : "";
    console.log(item);
    console.log('this.selectedColor: ' + this.selectedColor);
    //this.router.navigate(['/store/' + this.selectedColor]);

    console.log('cuotaStr: ' + this.cuotaStr);
  }

  public onSelectedPersona(selected: CompleterItem) {
    console.log('METODO: onSelectedPersona()');
    this.selectedPersona = selected.title;
    console.log(selected);
    console.log('this.selectedPersona: ' + this.selectedPersona);
    //this.router.navigate(['/store/' + this.selectedColor]);

    console.log('selectedPersona: ' + this.selectedPersona);
  }

  public onSelectedCuota(item: CompleterItem) {
    console.log(item);    
  }

}
