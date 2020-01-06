import { PagosComponent } from './depositos/pagos/pagos.component';
import { Example4Component } from './examples/example4/example4.component';
import { Example3Component } from './examples/example3/example3.component';
import { Example2Component } from './examples/example2/example2.component';
import { ExampleComponent } from './examples/example/example.component';
import { DepositoCreateComponent } from './depositos/deposito-create/deposito-create.component';
import { DepositoUpdateComponent } from './depositos/deposito-update/deposito-update.component';
import { DepositoListComponent } from './depositos/deposito-list/deposito-list.component';
import { DepositoComponent } from './depositos/deposito/deposito.component';
import { ProjectUpdateComponent } from './projects/project-update/project-update.component';
import { ProjectCreateComponent } from './projects/project-create/project-create.component';
import { ProjectListComponent } from './projects/project-list/project-list.component';
import { ProjectComponent } from './projects/project/project.component';
import { IndexComponent } from './index/index.component';
import { EditComponent } from './edit/edit.component';
import { CreateComponent } from './create/create.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CuotasComponent } from './depositos/cuotas/cuotas.component';


const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  {
    path: 'create',
    component: CreateComponent
  },
  {
    path: 'edit/:id',
    component: EditComponent
  },
  {
    path: 'index',
    component: IndexComponent
  },
  {
    path: 'pagos',
    component: PagosComponent
  },
  {
    path: 'depositos',
    component: DepositoComponent,
    children: [
      {
        path: 'list',
        component: DepositoListComponent
      },
      {
        path: 'create',
        component: DepositoCreateComponent
      },
      {
        path: 'update',
        component: DepositoUpdateComponent
      },
      {
        path: 'cuotas',
        component: CuotasComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
