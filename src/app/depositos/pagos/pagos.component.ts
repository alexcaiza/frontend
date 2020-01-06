import { ModalpagoComponent } from './../modalpago/modalpago.component';
import { Observable, Subject, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, catchError, map, filter  } from 'rxjs/operators';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { Cuota } from './../../models/Cuota';
import { CuotasService } from './../../servicios/cuotas/cuotas.service';
import { CuotasComponent } from './../cuotas/cuotas.component';
import { EventEmitterService } from './../../servicios/event-emitter.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Pago } from 'src/app/models/Pago';

@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.component.html',
  styleUrls: ['./pagos.component.css']
})
export class PagosComponent implements OnInit {

  public formBusqueda: FormGroup;

  pagos: Pago[];

  cuota: Cuota = new Cuota();

  modelCuota: any;

  codigocuota: Number;

  @ViewChild(ModalpagoComponent, { static: false }) childModalPago: ModalpagoComponent;

  @ViewChild('instanceCuota', {static: true}) 
  instanceCuota: NgbTypeahead;

  focusCuota$ = new Subject<Cuota>();
  clickCuota$ = new Subject<Cuota>();

  constructor(
    private formBuilder: FormBuilder,
    public flashMessagesService: FlashMessagesService,
    private eventEmitterService: EventEmitterService,
    private cuotasService: CuotasService
  ) { }

  ngOnInit() {
    console.log('METODO: ngOnInit()');
    
    this.createFormBusqueda();
  }

  createFormBusqueda() {
    this.formBusqueda = this.formBuilder.group({
      cedula: [''],
      nombres: [''],
      apellidos: [''],
      numerodeposito: ['']
    });

    this.modelCuota = null;
    
    this.formBusqueda = this.formBuilder.group({
      cuota: ['', Validators.required],      
    });

  }

  selectedCuota(item){
    //console.log(item.item);
    console.log(this.cuota);
    this.codigocuota = item.item.codigocuota;
    console.log(this.codigocuota);
    this.modelCuota = item.item;

    this.pagos = [];
  }

  buscarCuotasLotesFilters() {
    console.log('METODO: PagosComponent.buscarDepositosFilters()');

    console.log(this.formBusqueda.value);

    this.cuotasService.consultarCuotasLotes(this.codigocuota).subscribe((response: any) => {
      
      console.log(response);

      this.pagos = [];
      
      if (response.data) {
        this.pagos = response.data;
      }
    });

  }

  searchCuota = (text$: Observable<Cuota>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.clickCuota$.pipe(filter(() => !this.instanceCuota.isPopupOpen()));
    const inputFocus$ = this.focusCuota$;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
        switchMap( (searchText) => 
        //this.albumService.artistLookup(searchText)
        this.cuotasService.readCuotas()
      )
    );
  }

  resultFormatCuotaListValue(value: any) {            
    return value.descripcioncuota;
  } 
  
  inputFormatCuotaListValue(value: any)   {
    if(value.descripcioncuota)
      return value.descripcioncuota
    return value;
  }

  openModalPago(pago) {
    console.log(pago);
    console.log(this.childModalPago);
    this.childModalPago.openModal(pago);
  }

}
