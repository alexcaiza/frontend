import { Persona } from './../../models/Persona';
import { Cuota } from './../../models/Cuota';
import { CuotasService } from './../../servicios/cuotas/cuotas.service';
import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, catchError, map  } from 'rxjs/operators';

@Component({
  selector: 'app-example4',
  templateUrl: './example4.component.html',
  styleUrls: ['./example4.component.css']
})
export class Example4Component implements OnInit {

  cuotas : Cuota[];
  personas : Persona[];

  cuota: Cuota = new Cuota;
  persona: Persona = new Persona;
  //: ErrorInfo = new ErrorInfo();
  loaded =  false;
  aniFrame = 'in';

  public searchData: any  = {};

  constructor(
    private cuotasService: CuotasService,
  ) { }

  ngOnInit() {
    this.buscarCuotas();
  }

  buscarCuotas() {
    console.log('METODO: ExampleComponent.buscarCuotas()');
    this.cuotasService.readCuotas().subscribe((cuotas: Cuota[]) => {
      this.cuotas = cuotas;
      console.log(this.cuotas);
      //this.flashMessagesService.show('La busqueda de cuotas se realizo correctamente.', { cssClass: 'alert-success', timeout: 4000 });
    });
  }

  searchCuota = (text$: Observable<string>) => {

    console.log(text$);

    return text$.pipe(      
        debounceTime(200), 
        distinctUntilChanged(),
        // switchMap allows returning an observable rather than maps array
        switchMap( (searchText) => 
          //this.albumService.artistLookup(searchText)
          this.cuotasService.readCuotas()
         )           
    );                 
  }

  searchPersona = (text$: Observable<string>) => {
    console.log(text$);
    return text$.pipe(      
        debounceTime(200), 
        distinctUntilChanged(),
        // switchMap allows returning an observable rather than maps array
        switchMap( (searchText) => 
          //this.albumService.artistLookup(searchText)
          this.cuotasService.readPersonas(searchText)
         )           
    );                 
  }

  /**
 * Used to format the result data from the lookup into the
 * display and list values. Maps `{name: "band", id:"id" }` into a string
*/
resultFormatBandListValue(value: any) {            
  return value.descripcioncuota;
} 

resultFormatPersonaListValue(value: any) {            
  return value.cedula;
} 
/**
  * Initially binds the string value and then after selecting
  * an item by checking either for string or key/value object.
*/
inputFormatPersonaListValue(value: any)   {
  if(value.cedula)
    return value.cedula
  return value;
}

}
