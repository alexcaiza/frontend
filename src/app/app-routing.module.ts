import { ExampleComponent } from './example/example.component';
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
    path: 'example',
    component: ExampleComponent
  },
  {
    path: 'project',
    component: ProjectComponent,
    children: [
      {
        path: 'list',
        component: ProjectListComponent
      },
      {
        path: 'create',
        component: ProjectCreateComponent
      },
      {
        path: 'update',
        component: ProjectUpdateComponent
      }
    ]
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
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
