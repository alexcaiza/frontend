import { FlashMessagesService } from 'angular2-flash-messages';
import { Persona } from './../../models/Persona';
import { PersonasService } from './../../servicios/personas/personas.service';
import { DepositosService } from './../../servicios/depositos/depositos.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-deposito-create',
  templateUrl: './deposito-create.component.html',
  styleUrls: ['./deposito-create.component.css']
})
export class DepositoCreateComponent implements OnInit {

  public formGroup: FormGroup;

  //persona: any = {};

  cedula: string;
  persona: Persona;

  constructor(
    private formBuilder: FormBuilder,
    private depositosService: DepositosService,
    private personasService: PersonasService,
    public flashMessagesService: FlashMessagesService,
    ) { }

  ngOnInit() {
    this.cedula = '';
    this.buildForm();
  }

  private buildForm() {

    this.persona = null;

    const dateLength = 10;
    const today = new Date().toISOString().substring(0, dateLength);

    this.formGroup = this.formBuilder.group({
      cedula: ['', Validators.required],
      valordeposito: ['', Validators.required],
      fechadeposito: [today, Validators.required],
      tipodeposito: ['', Validators.required],
      numerodeposito: ['', Validators.required],
    });
  }

  public readPersonaByCedula() {
    console.log("Metodo DepositoCreateComponent.buscarPersonaPorCedula()");

    this.persona = null;
    
    const cedulaForm = this.formGroup.get("cedula");

    this.cedula = cedulaForm.value;
    console.log(this.cedula);

    if (this.cedula == null || this.cedula === '') {
      this.flashMessagesService.show('Ingrese la cedula para buscar el socio.', { cssClass: 'alert-danger', timeout: 2000 });
      return;
    }

    this.personasService.readPersonaByCedula(this.cedula).subscribe((persona: Persona) => {

      if (persona == null) {
        this.flashMessagesService.show('No se encontro el socio con el numero de cedula: ' + this.cedula + '.', { cssClass: 'alert-danger', timeout: 2000 });
      return;
      }
      this.persona = persona;
      console.log(this.persona);
      this.flashMessagesService.show('La busqueda del socio se realizo correctamente.', { cssClass: 'alert-success', timeout: 2000 });
    });
  }

  public saveDeposito() {
    console.log("Metodo DepositoCreateComponent.saveDeposito()");

    console.log(this.formGroup.value);

    if (this.cedula == null || this.cedula === '' || this.persona == null) {
      this.flashMessagesService.show('Ingrese la cedula para buscar el socio.', { cssClass: 'alert-danger', timeout: 2000 });
      return;
    }

    const numerodeposito = this.formGroup.get("numerodeposito").value;
    console.log('numerodeposito: ' + numerodeposito);

    if (numerodeposito == null || numerodeposito === '') {
      this.flashMessagesService.show('Ingrese el numero del deposito.', { cssClass: 'alert-danger', timeout: 2000 });
      return;
    }

    const valordeposito = this.formGroup.get("valordeposito").value;
    console.log('valordeposito: ' + valordeposito);

    if (valordeposito == null || valordeposito === '') {
      this.flashMessagesService.show('Ingrese el valor del deposito.', { cssClass: 'alert-danger', timeout: 2000 });
      return;
    }

    const fechadeposito = this.formGroup.get("fechadeposito").value;
    console.log('fechadeposito: ' + fechadeposito);

    if (fechadeposito == null || fechadeposito === '') {
      this.flashMessagesService.show('Ingrese la fecha del deposito.', { cssClass: 'alert-danger', timeout: 2000 });
      return;
    }

    const tipodeposito = this.formGroup.get("tipodeposito").value;
    console.log('tipodeposito: ' + tipodeposito);

    if (tipodeposito == null || tipodeposito === '') {
      this.flashMessagesService.show('Seleccione el tipo de deposito.', { cssClass: 'alert-danger', timeout: 2000 });
      return;
    }

    const datos : any = this.formGroup.value;

    if (this.persona != null) {
      datos.codigopersona = this.persona.codigopersona;
    }

    console.log(datos);

    this.depositosService.createDeposito(datos).subscribe((response: any) => {
      console.log("response:");
      console.log(response);

      if (response.deposito && response.deposito.codigodeposito !== null && response.deposito.codigodeposito > 0) {
        this.flashMessagesService.show('El registro del deposito '+  datos.numerodeposito +' del socio ' + this.persona.cedula + 'se realizo correctamente.', { cssClass: 'alert-success', timeout: 2000 });
        this.buildForm();
      }
      else {
        this.flashMessagesService.show(response.mensaje, { cssClass: 'alert-danger', timeout: 3000 });
      }

    });

  }

}
