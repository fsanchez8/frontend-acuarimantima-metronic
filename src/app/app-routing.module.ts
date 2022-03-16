import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './modules/auth/auth.component';
import { LayoutComponent } from './_metronic/layout/layout.component';

export const routes: Routes = [
  {
    path: "", redirectTo: "auth", pathMatch: "full"
  },
  {
    path: 'auth',
    component: AuthComponent,
    children: [
        {
          path: "",
          loadChildren: () =>
          import('./modules/auth/auth.module').then((m) => m.AuthModule),
        }
    ]
  },
  {
    path: 'dashboard',
    component: LayoutComponent,
    children: [
        {
          path: "",
          loadChildren: () =>
          import('./_metronic/layout/layout.module').then((m) => m.LayoutModule),
        }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
