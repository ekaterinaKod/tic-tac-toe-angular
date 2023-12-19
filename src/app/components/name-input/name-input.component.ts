import { Component } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PlayerSymbol } from 'src/app/models/game.model';
import { Player } from 'src/app/models/player.model';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-name-input',
  templateUrl: './name-input.component.html',
  styleUrls: ['./name-input.component.css'],
})
export class NameInputComponent {
  formGroup!: FormGroup;

  get playerOField(): FormControl {
    return this.formGroup.controls['playerO'] as FormControl;
  }

  get playerXField(): FormControl {
    return this.formGroup.controls['playerX'] as FormControl;
  }

  constructor(private router: Router, private storage: LocalStorageService) {}

  ngOnInit() {
    this.storage.clearAllData();
    this.formGroup = new FormGroup({
      playerO: new FormControl(
        {
          value: null,
          disabled: false,
        },
        [Validators.required, Validators.maxLength(25)]
      ),
      playerX: new FormControl(
        {
          value: null,
          disabled: false,
        },
        [Validators.required, Validators.maxLength(25)]
      ),
    });
  }

  playGame() {
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid) {
      const data = this.formGroup.getRawValue();
      const players: Player[] = [
        { name: data.playerO, symbol: PlayerSymbol.O, score: 0 },
        { name: data.playerX, symbol: PlayerSymbol.X, score: 0 },
      ];

      this.storage.setData(players);

      this.router.navigate(['/tic-tac-toe']);
    }
  }
}
