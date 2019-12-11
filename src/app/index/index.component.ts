import { GameService } from './../game.service';
import { Game } from './../Game';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  games: Game[];

 	constructor(private gameservice: GameService) { }

  	ngOnInit() {  	
        this.gameservice.readGames().subscribe((games: Game[]) => {
          this.games = games;
          console.log(this.games);
        })
 	}
  deleteGame(id) {
     this.gameservice.deleteGame(id).subscribe(res => {
      console.log('Deleted');
    });
   }

}
