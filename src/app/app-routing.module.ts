import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/components/layout.component';
import { SessionAllowGuard } from './core/guards/session-allow.guard';
import { IsRootGuard } from './core/guards/isRoot/is-root.guard';




const routes: Routes = [
  {
    path:'',
    redirectTo:'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: '',
    canActivate: [SessionAllowGuard],
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'users',
        canActivate: [IsRootGuard],
        loadChildren: () => import('./users/users.module').then(m => m.UsersModule)
      },

      {
        path: 'jobs',
        loadChildren: () => import('./jobs/jobs.module').then(m => m.JobsModule)
      },
      {
        path: 'others',
        canActivate: [IsRootGuard],
        loadChildren: () => import('./others/others.module').then(m => m.OthersModule)
      }
    ]
  },
  
  
  {
    path: '**',
    loadChildren: () => import('./notFound/not-found.module').then(m => m.NotFoundModule)
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
