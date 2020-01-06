import { ExampleComponent } from './examples/example/example.component';

import { EventEmitterService } from './servicios/event-emitter.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { ReactiveFormsModule } from '@angular/forms';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateComponent } from './create/create.component';
import { IndexComponent } from './index/index.component';
import { EditComponent } from './edit/edit.component';
import { ProjectComponent } from './projects/project/project.component';
import { ProjectListComponent } from './projects/project-list/project-list.component';
import { ProjectCreateComponent } from './projects/project-create/project-create.component';
import { ProjectUpdateComponent } from './projects/project-update/project-update.component';
import { DepositoComponent } from './depositos/deposito/deposito.component';
import { DepositoListComponent } from './depositos/deposito-list/deposito-list.component';
import { DepositoCreateComponent } from './depositos/deposito-create/deposito-create.component';
import { DepositoUpdateComponent } from './depositos/deposito-update/deposito-update.component';

import { FlashMessagesModule } from 'angular2-flash-messages';
import { FlashMessagesService } from 'angular2-flash-messages';

import { NgHttpLoaderModule } from 'ng-http-loader';

import { Ng2CompleterModule } from 'ng2-completer';

import { Example2Component } from './examples/example2/example2.component';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { Example3Component } from './examples/example3/example3.component';
import { Example4Component } from './examples/example4/example4.component';
import { CuotasComponent } from './depositos/cuotas/cuotas.component';
import { PagosComponent } from './depositos/pagos/pagos.component';
import { ModalpagoComponent } from './depositos/modalpago/modalpago.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    CreateComponent,
    IndexComponent,
    EditComponent,
    ProjectComponent,
    ProjectListComponent,
    ProjectCreateComponent,
    ProjectUpdateComponent,
    DepositoComponent,
    DepositoListComponent,
    DepositoCreateComponent,
    DepositoUpdateComponent,
    ExampleComponent,
    Example2Component,
    Example3Component,
    Example4Component,
    CuotasComponent,
    PagosComponent,
    ModalpagoComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FlashMessagesModule,
    NgHttpLoaderModule.forRoot(),
    Ng2CompleterModule,
    AutocompleteLibModule,
    NgbModule
  ],
  providers: [
    FlashMessagesService,
    EventEmitterService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
