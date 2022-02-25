import {Component, HostListener, ViewChild} from '@angular/core';
import {GameService} from "../game.service";

@Component({
  selector: 'app-sprites',
  templateUrl: './sprites.component.html',
  styleUrls: ['./sprites.component.scss']
})
export class SpritesComponent {
  @ViewChild('dino') dino: any;
  @ViewChild('cactus') cactus: any;
  @ViewChild('gameStart') gameStart: any;
  @ViewChild('gameEnd') gameEnd: any;

  points = 0;
  record = this.points;
  speed = 1.5;
  message:string = '';


  //При нажатии на пробел динозавр прыгает
  @HostListener('document:keydown.Space', []) onKeydownHandler() {
    this.dino.nativeElement.classList.add('jump');
    setTimeout(()=> this.dino.nativeElement.classList.remove('jump'), 700)
  }





  newGame () {
    this.gameStart.nativeElement.style.display = "none";
    this.gameEnd.nativeElement.style.display = "none";
    this.cactus.nativeElement.style.left = "580px";
    this.cactus.nativeElement.style.animation =  "cactusMove 1.5s infinite linear"
    this.points = 0;
    this.speed = 1.5;

    const setPoint = setInterval(() => this.points += 1, 100);

    const isAlive = setInterval(() => {
      const dinoTop = (parseInt(window.getComputedStyle(this.dino.nativeElement).getPropertyValue('top')));
      const cactusLeft = (parseInt(window.getComputedStyle(this.cactus.nativeElement).getPropertyValue('left')));

      if (cactusLeft < 50 && cactusLeft > 0 && dinoTop >= 136) {
        if (this.record < this.points) {
          this.record = this.points;
        }
        this.gameOver();
        clearInterval(setPoint);
      }
    }, 10)
  }

  gameOver () {
    this.gameEnd.nativeElement.style.display = "flex";
    this.cactus.nativeElement.style.animation = "none";
    this.message = 'Вы набрали ' + this.points + ' очков.' + ' Рекорд ' + this.record;
  }
}
