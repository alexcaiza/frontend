import { Game } from './../Game';
import { GameService } from './../game.service';
import { ApiService } from './../api.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  title = 'Add Game';
  angForm: FormGroup;

  constructor(
    private gameservice: GameService,
    private fb: FormBuilder
  ) {
    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required]
    });
  }

  addGame() {
    //this.gameservice.addGame(name, price);
    console.log(this.angForm);

    this.gameservice.createGame(this.angForm.value).subscribe((game: Game) => {
      console.log("Game created, ", game);
    });
  }

  addGame2(name, price) {

    const obj = {
      name: name,
      price: price
    };

    this.gameservice.createGame(obj).subscribe((game: Game) => {
      console.log("Game created, ", game);
    });

  }

  ngOnInit() {
  }


}
