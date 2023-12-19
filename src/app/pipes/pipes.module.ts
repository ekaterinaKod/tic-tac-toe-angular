import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowPlayerSymbolPipe } from './show-player-symbol.pipe';



@NgModule({
  declarations: [
    ShowPlayerSymbolPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [    
    CommonModule,
    ShowPlayerSymbolPipe
  ]
})
export class PipesModule { }
