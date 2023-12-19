import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { BoardComponent } from './components/board/board.component';
import { CardComponent } from './components/card/card.component';
import { StatusComponent } from './components/status/status.component';
import { PipesModule } from './pipes/pipes.module';
import { TicTacToeComponent } from './components/tic-tac-toe/tic-tac-toe.component';
import { NameInputComponent } from './components/name-input/name-input.component';
import { ScoreComponent } from './components/score/score.component';
import { AppRoutingModule } from './app-routing.module';


@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    CardComponent,
    StatusComponent,
    TicTacToeComponent,
    NameInputComponent,
    ScoreComponent,
  ],
  imports: [
    BrowserModule,
    PipesModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [
    PipesModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
