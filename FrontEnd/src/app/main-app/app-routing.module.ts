import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/guards/auth.guard';
import { FeaturesModule } from '../features/features.module';

const routes: Routes = [
  // { path: 'features', canActivate: [AuthGuard],  loadChildren: () => FeaturesModule },
  { path: 'features', canActivate: [AuthGuard],  loadChildren: '../features/features.module#FeaturesModule' },
  { path: '', redirectTo: '/features', pathMatch: 'full' },
  { path: '**', redirectTo: '/features' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  // providers: [AuthGuard]
})
export class AppRoutingModule {}
