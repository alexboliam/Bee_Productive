import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { environment } from '../environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
// import ngx-translate and the http loader
// import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
// import {TranslateHttpLoader} from '@ngx-translate/http-loader';

// MODULES
import { CoreModule } from "./core/core.module";
import { AuthModule } from './auth/auth.module';
import { MainAppModule } from "./main-app/main-app.module";
import { SharedModule } from "./shared/shared.module";

// COMPONENTS project-952936604876
import { AppComponent } from "./app.component";
import { AuthGuard } from './auth/guards/auth.guard';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CoreModule,
    AuthModule,
    MainAppModule,
    SharedModule,
    !environment.production ? StoreDevtoolsModule.instrument() : [],
  //   TranslateModule.forRoot({
  //     loader: {
  //         provide: TranslateLoader,
  //         useFactory: HttpLoaderFactory,
  //         deps: [HttpClient]
  //     }
  // })
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {}

// export function HttpLoaderFactory(http: HttpClient) {
//   return new TranslateHttpLoader(http);
// }
