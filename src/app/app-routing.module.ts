import { NotFoundComponent } from './not-found/not-found.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  {
    path: 'data-elements',
    loadComponent: () =>
      import('./layout/layout.component').then((c) => c.LayoutComponent),
    data: {
      title: 'Data Elements',
      breadcrumb: [
        {
          label: 'Data Elements',
          url: '',
        },
      ],
    },
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./features/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
        data: {
          title: 'Dashboard',
          breadcrumb: [
            {
              label: 'Data Elements',
              url: '',
            },
            {
              label: 'Dashboard',
              url: '',
            },
          ],
        },
      },
      {
        path: 'domain-management',
        loadChildren: () =>
          import('./features/domain-management/domain-management.module').then(
            (m) => m.DomainManagementModule
          ),
        data: {
          title: 'Domain Management',
          breadcrumb: [
            {
              label: 'Data Elements',
              url: 'dashboard',
            },
            {
              label: 'Domain Management',
              url: '',
            },
          ],
        },
      },
      {
        path: 'data-model-management',
        loadChildren: () =>
          import(
            './features/data-model-management/data-model-management.module'
          ).then((m) => m.DataModelManagementModule),
        data: {
          title: 'Data Model Management',
          breadcrumb: [
            {
              label: 'Data Elements',
              url: 'dashboard',
            },
            {
              label: 'Data Model Management',
              url: '',
            },
          ],
        },
      },
      {
        path: 'user-management',
        loadChildren: () =>
          import('./features/user-management/user-management.module').then(
            (m) => m.UserManagementModule
          ),
        data: {
          title: 'User Management',
          breadcrumb: [
            {
              label: 'Data Elements',
              url: 'dashboard',
            },
            {
              label: 'User Management',
              url: '',
            },
          ],
        },
      },
      {
        path: 'client-management',
        loadChildren: () =>
          import('./features/client-management/client-management.module').then(
            (m) => m.ClientManagementModule
          ),
        data: {
          title: 'Client Management',
          breadcrumb: [
            {
              label: 'Data Elements',
              url: 'dashboard',
            },
            {
              label: 'Client Management',
              url: '',
            },
          ],
        },
      },
      {
        path: 'permissions',
        loadChildren: () =>
          import('./features/permissions/permissions.module').then(
            (m) => m.PermissionsModule
          ),
        data: {
          title: 'Permissions',
          breadcrumb: [
            {
              label: 'Data Elements',
              url: 'dashboard',
            },
            {
              label: 'Permissions',
              url: '',
            },
          ],
        },
      },
    ],
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
