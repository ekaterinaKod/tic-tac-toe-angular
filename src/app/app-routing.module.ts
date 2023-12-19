import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NameInputComponent } from './components/name-input/name-input.component';
import { TicTacToeComponent } from './components/tic-tac-toe/tic-tac-toe.component';
import { GameInProgressGuard } from './guards/game-in-progress.guard';
import { NoGameInProgressGuard } from './guards/no-game-in-progress.guard';

const routes: Routes = [
  {
    path: 'name-input', 
    component: NameInputComponent,
    canActivate: [NoGameInProgressGuard]
  },
  {
    path: 'tic-tac-toe',
    component: TicTacToeComponent,
    canActivate: [GameInProgressGuard]
  },
  {
    path: '', 
    redirectTo: '/name-input',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
