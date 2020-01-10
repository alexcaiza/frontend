import { PagoCuotaLote } from './../../models/PagoCuotaLote';
import { Deposito } from './../../models/Deposito';
import { FlashMessagesService } from 'angular2-flash-messages';
import { CuotasService } from './../../servicios/cuotas/cuotas.service';
import {  Component,   OnInit,   EventEmitter,   Output,   ViewChild } from "@angular/core";
import {  NgbModalRef, NgbModal,  ModalDismissReasons} from "@ng-bootstrap/ng-bootstrap";
import { Pago } from 'src/app/models/Pago';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Observable, Subject, merge } from 'rxjs';
import {NgbTypeahead} from '@ng-bootstrap/ng-bootstrap';
import { debounceTime, distinctUntilChanged, switchMap, catchError, map, filter  } from 'rxjs/operators';

@Component({
  selector: 'app-modalpago',
  templateUrl: './modalpago.component.html',
  styleUrls: ['./modalpago.component.css']
})
export class ModalpagoComponent implements OnInit {

  mensaje: string;

  pago: Pago;

  codigodeposito: Number;

  deposito: Deposito = new Deposito();

  modelDeposito: any;

  valorpagocuotaloteTotal: Number;  

  private modalRef: NgbModalRef;

  formModalPago: FormGroup;

  @ViewChild("childmodalpago", { static: false }) 
  childmodalpago: any;

  @ViewChild('instanceDeposito', {static: true}) 
  instanceDeposito: NgbTypeahead;

  focusDeposito$ = new Subject<Deposito>();
  clickDeposito$ = new Subject<Deposito>();

  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private cuotasService: CuotasService,
    public flashMessagesService: FlashMessagesService,
    ) { }

  ngOnInit() {
    this.createForm();
  }

  openModal(pago: Pago) {
    this.pago = pago;

    this.createForm();

    this.valorpagocuotaloteTotal = 0;

    this.cuotasService.consultarPagoCuotaLoteSum(this.pago.codigocuota, this.pago.codigolote).subscribe((data: any) => {
      console.log(data);
      console.log(data.data);
      console.log(data.data.valorpagocuotalote);
      if (data && data.data && data.data.valorpagocuotalote) {
        this.valorpagocuotaloteTotal = data.data.valorpagocuotalote;
      }
    });

    this.modalRef = this.modalService.open(this.childmodalpago);
    this.modalRef.result.then(result => {}, reason => {});
  }

  hideModal() {
    this.modalRef.close();
  }

  private createForm() {

    this.mensaje = '';

    this.modelDeposito = null;
    this.deposito = null;
    
    this.valorpagocuotaloteTotal = null;
    
    this.formModalPago = this.formBuilder.group({
      deposito: ['', Validators.required],
      valorpagocuotalote: ['', Validators.required],
    });
  }

  selectedDeposito(item){
    //console.log(item.item);
    console.log(this.deposito);
    this.codigodeposito = item.item.codigodeposito;
    console.log(this.codigodeposito);
    this.modelDeposito = item.item;
    console.log(this.modelDeposito);

    if (this.modelDeposito && this.modelDeposito.codigodeposito) {
      this.modelDeposito.valorpendientedeposito = (Number(this.modelDeposito.valordeposito) - Number(this.modelDeposito.valorutilizado));
    }
  }

  searchDeposito = (text$: Observable<Deposito>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.clickDeposito$.pipe(filter(() => {
      if (this.instanceDeposito) {
        return !this.instanceDeposito.isPopupOpen();
      }
      return false;
    }));
    const inputFocus$ = this.focusDeposito$;

    console.log('this.pago.codigopersona: ' + this.pago.codigopersona);

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
        switchMap( (searchText) => 
        //this.albumService.artistLookup(searchText)
        this.cuotasService.readDeposito(this.pago.codigopersona)
      )
    );
  }

  resultFormatDepositoListValue(value: any) {            
    return value.numerodeposito;
  }
  
  inputFormatDepositoListValue(value: any)   {
    if(value.numerodeposito)
      return value.numerodeposito
    return value;
  }

  savePagoCuotaLote(){
    console.log('Metodo: savePagoCuotaLote()');

    this.mensaje = '';

    console.log(this.formModalPago.value);

    // VALIDA LOS DATOS DE LA CUOTA
    if (this.pago.codigocuota == null) {
      this.mensaje = 'Ingrese el tipo de cuota a pagar.';
      this.flashMessagesService.show(this.mensaje, { cssClass: 'alert-danger', timeout: 5000 });
      return;
    }

    // VALIDA LOS DATOS DE LA PERSONA
    if (this.pago.codigopersona == null) {
      this.mensaje = 'Ingrese la cedula de la persona.';
      this.flashMessagesService.show(this.mensaje, { cssClass: 'alert-danger', timeout: 5000 });
      return;
    }

    // VALIDA LOS DATOS DEL LOTE
    if (this.pago.codigolote == null) {
      this.mensaje = 'Ingrese el lote para pagar la cuota pendiente.';
      this.flashMessagesService.show(this.mensaje, { cssClass: 'alert-danger', timeout: 5000 });
      return;
    }

    // VALIDA LOS DATOS DEL DEPOSITO
    const deposito = this.formModalPago.get("deposito").value;
    console.log('deposito: ' + deposito);

    if (deposito == null || deposito === '') {
      this.mensaje = 'Ingrese el numero del deposito.';
      this.flashMessagesService.show(this.mensaje, { cssClass: 'alert-danger', timeout: 5000 });
      return;
    }

    // VALIDA SI EL DEPOSITO TIENE SALDO DISPONIBLE PARA PAGAR LA COUTA
    let valorDeposito: Number = Number(deposito.valordeposito);
    let valorUtilizadoDeposito: Number = Number(deposito.valorutilizado);
    let valorPendienteDeposito: Number = (Number(valorDeposito) - Number(valorUtilizadoDeposito));
    if (valorUtilizadoDeposito >= valorDeposito) {
      this.mensaje = 'El deposito ('+deposito.numerodeposito+') del socio ('+this.pago.cedula+') esta utilizado completamente.'; 
      this.flashMessagesService.show(
        this.mensaje, 
        { cssClass: 'alert-warning', timeout: 5000 }
        );
      return;
    }

    // VALIDA EL VALOR PAGO CUOTA
    const valorPagoCuotaLote = this.formModalPago.get("valorpagocuotalote").value;
    console.log('valorPagoCuotaLote: ' + valorPagoCuotaLote);

    if (valorPagoCuotaLote == null || valorPagoCuotaLote === '') {
      this.mensaje = 'Ingrese el valor del pago de la cuota.';
      this.flashMessagesService.show(this.mensaje, { cssClass: 'alert-danger', timeout: 5000 });
      return;
    }

    if (valorPagoCuotaLote <= 0) {
      this.mensaje = 'El valor del pago de la cuota tiene que ser mayor a cero (0).';
      this.flashMessagesService.show(this.mensaje, { cssClass: 'alert-danger', timeout: 5000 });
      return;
    }

    if (valorPagoCuotaLote > valorPendienteDeposito) {
      this.mensaje = 'El valor del pago de la cuota no tiene que ser mayor al valor pendiente del deposito seleccionado (' + valorPendienteDeposito + ').';
      this.flashMessagesService.show(this.mensaje, { cssClass: 'alert-danger', timeout: 5000 });
      return;
    }

    // VALIDA EL VALOR PAGO CUOTA NO SEA MAYOR AL VALOR DE LA CUOTA
    let valorpagocuotaloteN: Number = Number(valorPagoCuotaLote);
    let valorcuotaN: Number = Number(this.pago.valorcuota);

    if (valorpagocuotaloteN > valorcuotaN) {
      this.mensaje = 'El valor del pago de la cuota no puede ser mayor al valor de la cuota ('+valorpagocuotaloteN+' - '+valorcuotaN+').';
      this.flashMessagesService.show(this.mensaje, { cssClass: 'alert-danger', timeout: 5000 });
      return;
    }

    // VALIDA EL VALOR PAGO CUOTA PENDIENTE
    let valorpagopendienteN = Number(valorcuotaN) - Number(this.valorpagocuotaloteTotal);
    
    if (valorpagopendienteN > 0 && valorpagocuotaloteN > valorpagopendienteN) {
      this.mensaje = 'El valor del pago de la cuota no puede ser mayor al valor pendiente de la cuota ('+valorpagocuotaloteN+' - '+valorpagopendienteN+').';
      this.flashMessagesService.show(this.mensaje, { cssClass: 'alert-danger', timeout: 5000 });
      return;
    }

    // VALIDA SI EXISTE PAGO PENDIENTE DE LA CUOTA
    var valorCuota: Number = Number(this.pago.valorcuota);

    console.log('valorCuota: ' + valorCuota);
    console.log('valorpagocuotaloteTotal: ' + this.valorpagocuotaloteTotal);
    
    if (this.valorpagocuotaloteTotal >= valorCuota) {
      this.mensaje = 'La cuota ('+this.pago.descripcioncuota+') del lote ('+this.pago.codigoreferencia+') esta pagada completamente.'; 
      this.flashMessagesService.show(
        this.mensaje, 
        { cssClass: 'alert-warning', timeout: 5000 }
        );
      return;
    }

    //

    const datos : any = this.formModalPago.value;

    console.log(datos);

    let pagoCuotaLote: PagoCuotaLote = new PagoCuotaLote();

    pagoCuotaLote.codigocuota = this.pago.codigocuota;
    pagoCuotaLote.codigolote = this.pago.codigolote;
    pagoCuotaLote.codigodeposito = datos.deposito.codigodeposito;    
    pagoCuotaLote.valorpagocuotalote = datos.valorpagocuotalote;

    console.log(pagoCuotaLote);
    
    this.cuotasService.createPagoCuotaLote(pagoCuotaLote).subscribe((response: any) => {
      console.log("response:");
      console.log(response);

      this.mensaje = 'El registro del pago de la cuota '+  datos.valorpagocuotalote +' del socio ' + this.pago.cedula + ' se realizo correctamente.';

      if (response.pagocuotalote && response.pagocuotalote.codigopagocuotalote !== null && response.pagocuotalote.codigopagocuotalote > 0) {
        this.flashMessagesService.show(this.mensaje, { cssClass: 'alert-success', timeout: 6000 });
        this.createForm();
        this.modalRef.close();
      }
      else {
        this.flashMessagesService.show(response.mensaje, { cssClass: 'alert-danger', timeout: 3000 });
      }

    });

    console.log('Fin guardar pago');

  }

}
