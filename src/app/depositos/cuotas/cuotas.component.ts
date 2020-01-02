import { PagoCuotaLote } from '../../models/PagoCuotaLote';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Cuota } from './../../models/Cuota';
import { Deposito } from './../../models/Deposito';
import { Lote } from './../../models/Lote';
import { CuotasService } from './../../servicios/cuotas/cuotas.service';
import { Persona } from './../../models/Persona';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, Subject, merge } from 'rxjs';
import {NgbTypeahead} from '@ng-bootstrap/ng-bootstrap';
import { debounceTime, distinctUntilChanged, switchMap, catchError, map, filter  } from 'rxjs/operators';

@Component({
  selector: 'app-cuotas',
  templateUrl: './cuotas.component.html',
  styleUrls: ['./cuotas.component.css']
})
export class CuotasComponent implements OnInit {

  persona: Persona = new Persona();
  lote: Lote = new Lote();
  deposito: Deposito = new Deposito();
  cuota: Cuota = new Cuota();

  modelPersona: any;
  modelLote: any;
  modelDeposito: any;
  modelCuota: any;

  codigopersona: Number;
  codigolote: Number;
  codigodeposito: Number;
  codigocuota: Number;

  public formGroup: FormGroup;

  @ViewChild('instanceLote', {static: true}) 
  instanceLote: NgbTypeahead;

  @ViewChild('instanceDeposito', {static: true}) 
  instanceDeposito: NgbTypeahead;

  @ViewChild('instanceCuota', {static: true}) 
  instanceCuota: NgbTypeahead;

  focus$ = new Subject<Lote>();
  click$ = new Subject<Lote>();

  focusDeposito$ = new Subject<Deposito>();
  clickDeposito$ = new Subject<Deposito>();

  focusCuota$ = new Subject<Cuota>();
  clickCuota$ = new Subject<Cuota>();

  constructor(
    private formBuilder: FormBuilder,
    private cuotasService: CuotasService,
    public flashMessagesService: FlashMessagesService,
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  private buildForm() {
    
    this.modelCuota = null;
    this.modelDeposito = null;
    this.modelPersona = null;
    this.modelLote = null;
    
    this.formGroup = this.formBuilder.group({
      persona: ['', Validators.required],
      lote: ['', Validators.required],
      deposito: ['', Validators.required],
      cuota: ['', Validators.required],
      valorpagocuotalote: ['', Validators.required],
    });
  }

  selectedPersona(item){
    //console.log(item.item);
    console.log(this.persona);
    this.codigopersona = item.item.codigopersona;
    console.log(this.codigopersona);
    this.modelPersona = item.item;
  }

  selectedCuota(item){
    //console.log(item.item);
    console.log(this.cuota);
    this.codigocuota = item.item.codigocuota;
    console.log(this.codigocuota);
    this.modelCuota = item.item;
  }

  selectedDeposito(item){
    //console.log(item.item);
    console.log(this.deposito);
    this.codigodeposito = item.item.codigodeposito;
    console.log(this.codigodeposito);
    this.modelDeposito = item.item;
  }

  selectedLote(item){
    //console.log(item.item);
    console.log(this.lote);
    this.codigolote = item.item.codigolote;
    console.log(this.codigolote);
    this.modelLote = item.item;
  }

  savePagoCuotaLote(){
    console.log('Metodo: savePagoCuotaLote()');

    console.log(this.formGroup.value);

    const deposito = this.formGroup.get("deposito").value;
    console.log('deposito: ' + deposito);

    if (deposito == null || deposito === '') {
      this.flashMessagesService.show('Ingrese el numero del deposito.', { cssClass: 'alert-danger', timeout: 2000 });
      return;
    }

    const valorpagocuotalote = this.formGroup.get("valorpagocuotalote").value;
    console.log('valorpagocuotalote: ' + valorpagocuotalote);

    if (valorpagocuotalote == null || valorpagocuotalote === '') {
      this.flashMessagesService.show('Ingrese el valor del pago de la cuota.', { cssClass: 'alert-danger', timeout: 2000 });
      return;
    }

    const persona = this.formGroup.get("persona").value;
    console.log('persona: ' + persona);

    if (persona == null || persona === '') {
      this.flashMessagesService.show('Ingrese la cedula de la persona.', { cssClass: 'alert-danger', timeout: 2000 });
      return;
    }

    const cuota = this.formGroup.get("cuota").value;
    console.log('cuota: ' + cuota);

    if (cuota == null || cuota === '') {
      this.flashMessagesService.show('Ingrese el tipo de cuota a pagar.', { cssClass: 'alert-danger', timeout: 2000 });
      return;
    }

    const datos : any = this.formGroup.value;

    console.log(datos);

    let pagoCuotaLote: PagoCuotaLote = new PagoCuotaLote();

    pagoCuotaLote.codigocuota = datos.cuota.codigocuota;
    pagoCuotaLote.codigodeposito = datos.deposito.codigodeposito;
    pagoCuotaLote.codigolote = datos.lote.codigolote;
    pagoCuotaLote.valorpagocuotalote = datos.valorpagocuotalote;

    console.log(pagoCuotaLote);
    
    this.cuotasService.createPagoCuotaLote(pagoCuotaLote).subscribe((response: any) => {
      console.log("response:");
      console.log(response);

      if (response.pagocuotalote && response.pagocuotalote.codigopagocuotalote !== null && response.pagocuotalote.codigopagocuotalote > 0) {
        this.flashMessagesService.show('El registro del pago de la cuota '+  datos.valorpagocuotalote +' del socio ' + datos.persona.cedula + ' se realizo correctamente.', { cssClass: 'alert-success', timeout: 6000 });
        this.buildForm();
      }
      else {
        this.flashMessagesService.show(response.mensaje, { cssClass: 'alert-danger', timeout: 3000 });
      }

    });

  }

  searchPersona = (text$: Observable<string>) => {
    console.log('this.persona.codigopersona:' + this.persona.codigopersona);
    console.log('text$:' + text$);
    
    return text$.pipe(      
        debounceTime(0), 
        distinctUntilChanged(),
        // switchMap allows returning an observable rather than maps array
        switchMap( (searchText) => 
          //this.albumService.artistLookup(searchText)
          this.cuotasService.readPersonas()
         )           
    );                 
  }

  searchLote = (text$: Observable<Lote>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instanceLote.isPopupOpen()));
    const inputFocus$ = this.focus$;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
        switchMap( (searchText) => 
        //this.albumService.artistLookup(searchText)
        this.cuotasService.readLote(this.codigopersona)
      )
    );
  }

  searchDeposito = (text$: Observable<Lote>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.clickDeposito$.pipe(filter(() => !this.instanceDeposito.isPopupOpen()));
    const inputFocus$ = this.focusDeposito$;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
        switchMap( (searchText) => 
        //this.albumService.artistLookup(searchText)
        this.cuotasService.readDeposito(this.codigopersona)
      )
    );
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

  resultFormatPersonaListValue(value: any) {            
    return value.cedula;
  } 
  
  inputFormatPersonaListValue(value: any)   {
    if(value.cedula)
      return value.cedula
    return value;
  }

  resultFormatCuotaListValue(value: any) {            
    return value.descripcioncuota;
  } 
  
  inputFormatCuotaListValue(value: any)   {
    if(value.descripcioncuota)
      return value.descripcioncuota
    return value;
  }

  resultFormatLoteListValue(value: any) {            
    return value.codigoreferencia;
  }
  
  inputFormatLoteListValue(value: any)   {
    if(value.codigoreferencia)
      return value.codigoreferencia
    return value;
  }

  resultFormatDepositoListValue(value: any) {            
    return value.numerodeposito;
  }
  
  inputFormatDepositoListValue(value: any)   {
    if(value.numerodeposito)
      return value.numerodeposito
    return value;
  }


}
