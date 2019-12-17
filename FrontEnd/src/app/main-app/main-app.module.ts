import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { UiSwitchModule } from 'ngx-ui-switch';
import { AuthModule } from '../auth/auth.module';
import { FeaturesModule } from '../features/features.module';
// COMPONENTS
import { MainAppComponent } from './container/main-app/main-app.component';
import { AppHeaderComponent } from './components/app-header/app-header.component';
import { AppNavComponent } from './components/app-nav/app-nav.component';
import { AppFooterComponent } from './components/app-footer/app-footer.component';


@NgModule({
  declarations: [AppHeaderComponent, AppNavComponent, MainAppComponent, AppFooterComponent],
  imports: [CommonModule, AppRoutingModule, UiSwitchModule, AuthModule, FeaturesModule],
  exports: [MainAppComponent]
})
export class MainAppModule {}
