import { Lote } from './../../models/Lote';
import { Persona } from './../../models/Persona';
import { ModalpagoComponent } from './../../depositos/modalpago/modalpago.component';

import { Observable, Subject, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, catchError, map, filter  } from 'rxjs/operators';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { Cuota } from './../../models/Cuota';
import { CuotasService } from './../../servicios/cuotas/cuotas.service';

import { EventEmitterService } from './../../servicios/event-emitter.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Pago } from 'src/app/models/Pago';

@Component({
  selector: 'app-pagossocio',
  templateUrl: './pagossocio.component.html',
  styleUrls: ['./pagossocio.component.css']
})
export class PagossocioComponent implements OnInit {

  public formBusqueda: FormGroup;

  pagos: Pago[];

  cuota: Cuota = new Cuota();
  persona: Persona = new Persona();

  modelCuota: any;
  modelPersona: any;
  modelLote: any;

  codigocuota: Number;
  codigopersona: Number;
  codigolote: Number;

  @ViewChild(ModalpagoComponent, { static: false }) childModalPago: ModalpagoComponent;

  @ViewChild('instanceCuota', {static: true}) 
  instanceCuota: NgbTypeahead;

  @ViewChild('instancePersona', {static: true}) 
  instancePersona: NgbTypeahead;

  @ViewChild('instanceLote', {static: true}) 
  instanceLote: NgbTypeahead;

  focusCuota$ = new Subject<Cuota>();
  clickCuota$ = new Subject<Cuota>();

  focusPersona$ = new Subject<Persona>();
  clickPersona$ = new Subject<Persona>();

  focusLote$ = new Subject<Lote>();
  clickLote$ = new Subject<Lote>();

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
    
    this.modelCuota = null;
    
    this.formBusqueda = this.formBuilder.group({
      cuota: ['', Validators.required],
      persona: ['', Validators.required],
      apellidosocio: ['', Validators.required],
      nombresocio: ['', Validators.required],
      lote: ['', Validators.required],
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
    console.log('METODO: PagossocioComponent.buscarDepositosFilters()');

    console.log(this.formBusqueda.value);

    let params: any = {};

    const persona = this.formBusqueda.get("persona").value;
    console.log('persona: ' + persona);

    if (persona == null || persona === '') {
      this.codigopersona = null;
    }

    const cuota = this.formBusqueda.get("cuota").value;
    console.log('cuota: ' + cuota);

    if (cuota == null || cuota === '') {
      this.codigocuota = null;
    }

    const lote = this.formBusqueda.get("lote").value;
    console.log('cuota: ' + cuota);

    if (lote == null || lote === '') {
      this.codigolote = null;
    }

    params.codigopersona = this.codigopersona;
    params.codigolote = this.codigolote;
    params.codigocuota = this.codigocuota;

    this.cuotasService.consultarCuotasLotes2(params).subscribe((response: any) => {
      
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

  searchPersona = (text$: Observable<string>) => {
    console.log('text$:' + text$);
    
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.clickPersona$.pipe(filter(() => !this.instancePersona.isPopupOpen()));
    const inputFocus$ = this.focusPersona$;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
        switchMap( (searchText) => 
        //this.albumService.artistLookup(searchText)
        this.cuotasService.readPersonas()
      )
    );

  }

  selectedPersona(item){
    this.codigopersona = item.item.codigopersona;
    console.log(this.codigopersona);
    this.modelPersona = item.item;
    /*
    this.formBusqueda.setValue(
      {
        lote: null,
        nombresocio: null,
        apellidosocio: null
      }
    );
    */

   this.formBusqueda.patchValue({
      lote: null,
      nombresocio: item.item.primernombre,
      apellidosocio: item.item.primerapellido
    });
  }

  resultFormatPersonaListValue(value: any) {            
    return value.cedula;
  } 
  
  inputFormatPersonaListValue(value: any)   {
    if(value.cedula)
      return value.cedula
    return value;
  }

  searchLote = (text$: Observable<Lote>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.clickLote$.pipe(filter(() => {
      if (this.instanceLote) {
        return !this.instanceLote.isPopupOpen();
      }
      return false;
    }));
    const inputFocus$ = this.focusLote$;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
        switchMap( (searchText) => 
        //this.albumService.artistLookup(searchText)
        this.cuotasService.readLote(this.codigopersona)
      )
    );
  }

  selectedLote(item){
    //console.log(item.item);
    this.codigolote = item.item.codigolote;
    console.log(this.codigolote);
    this.modelLote = item.item;
  }

  resultFormatLoteListValue(value: any) {            
    return value.codigoreferencia;
  }
  
  inputFormatLoteListValue(value: any)   {
    if(value.codigoreferencia)
      return value.codigoreferencia
    return value;
  }

}
