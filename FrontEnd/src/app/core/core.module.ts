import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers, metaReducers } from './reducers/index';
import { ProfileSettingsEffects } from './effects/profileSettings.effects';
import { UserEffects } from './effects/user.effects';
import { TasksEffects } from './effects/tasks.effects';
import { UploadFileEffects } from './effects/upload-file.effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([
      UserEffects,
      ProfileSettingsEffects,
      TasksEffects,
      UploadFileEffects
    ])
  ]
})
export class CoreModule { }
