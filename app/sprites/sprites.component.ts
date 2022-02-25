import {Component, HostListener, ViewChild} from '@angular/core';

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
    this.jump();
  }
  @HostListener('touchstart', []) onTouch() {
    this.jump();
  }

  jump () {
    this.dino.nativeElement.classList.add('jump');
    setTimeout(()=> this.dino.nativeElement.classList.remove('jump'), 700);
  }

  startPos () {
    this.gameStart.nativeElement.style.display = "none";
    this.gameEnd.nativeElement.style.display = "none";
    this.cactus.nativeElement.style.right = "-7%";
    this.dino.nativeElement.style.bottom = "0%";
    this.cactus.nativeElement.style.animation =  "cactusMove 1.5s infinite linear";
    this.points = 0;
  }


  newGame () {
    this.startPos ();
    this.speed = 1.5;

    const setPoint = setInterval(() => this.points += 1, 100);

    const isAlive = setInterval(() => {
      const dinoBottom = (parseInt(window.getComputedStyle(this.dino.nativeElement).getPropertyValue('bottom')));
      const cactusRight = (parseInt(window.getComputedStyle(this.cactus.nativeElement).getPropertyValue('right')));

      if (cactusRight < 600 && cactusRight > 500 && dinoBottom <= 30) {
        this.cactus.nativeElement.style.animation = null;
        this.dino.nativeElement.classList.remove('jump');
        this.dino.nativeElement.style.bottom = dinoBottom + 'px';
        this.cactus.nativeElement.style.right = cactusRight + 'px';


        setTimeout(() => {
          this.gameOver();
        },300)


        clearInterval(setPoint);
        if (this.record < this.points) {
          this.record = this.points;
        }

      }
    }, 10)
  }

  gameOver () {
    this.gameEnd.nativeElement.style.display = "flex";
    this.dino.nativeElement.style.bottom = null;
    this.cactus.nativeElement.style.right = null;
    this.message = 'Вы набрали ' + this.points + ' очков.' + ' Рекорд ' + this.record;
  }
}
