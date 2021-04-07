import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SxFormModule } from '@sinbix-angular/common/form';

import { GamesCardComponent } from './card';
import { GamesGameComponent } from './game';
import { GamesListComponent } from './list';
import { UiMaterialModule } from '../material';
import { GamesFavoriteToggleComponent } from './favorite-toggle';
import { GamesNotFoundComponent } from './not-found';
import { GamesStepperComponent } from './stepper';
import { GamesFilterComponent } from './filter';
import { GamesPaginatorComponent } from './paginator';
import { GamesSortingComponent } from './sorting';

@NgModule({
  imports: [CommonModule, UiMaterialModule, RouterModule, SxFormModule],
  declarations: [
    GamesCardComponent,
    GamesListComponent,
    GamesGameComponent,
    GamesFavoriteToggleComponent,
    GamesNotFoundComponent,
    GamesStepperComponent,
    GamesFilterComponent,
    GamesPaginatorComponent,
    GamesSortingComponent,
  ],
  exports: [
    GamesCardComponent,
    GamesListComponent,
    GamesGameComponent,
    GamesFilterComponent,
    GamesPaginatorComponent,
    GamesSortingComponent,
  ],
})
export class UiGameModule {}
