console.log('------*-------*-------*------')
console.log('Space Battle')
console.log('------*-------*-------*------')


// ------------------------------------------------------
// ------------------------------------------------------
// ------------------------------------------------------
// ------------------------------------------------------



const begin = document.getElementById('begin');


// ------------------------------------------------------
// ------------------------------------------------------
// ------------------------------------------------------
// ------------------------------------------------------


class Spaceship {
  constructor(name, hull, firepower, accuracy) {
    this.name = name;
    this.hull = hull;
    this.firepower = firepower;
    this.accuracy = accuracy;
  }
  attack(target) {
    alert('Pew pew!')
    console.log(`${this.name} shoots and...`)

    if (Math.random() < this.accuracy) {
      target.hull -= this.firepower;
      console.log(`                       %c  hits ${target.name}!`, 'color: #bf2c2c');
    } else {
      console.log(`                       %c  misses its target!`, 'color: #6ba1e8');
    }
  }
  getHull() {
    return this.hull;
  }
  displayStats() {
      console.log(`
                ---------------
                -${this.name}-
                --------------
                hull: ${this.hull}
                fire power: ${this.firepower}
                ---------------`);
  }
}


class MySpaceship extends Spaceship {
  constructor(name, hull=20, firepower=5, accuracy=0.7) {
    super(name, hull, firepower, accuracy);
  }

  stillAlive() {
    if (this.getHull() <= 0) {
      console.log(`
         ---------------
         -${this.name}-
         --------------
         hull: ${this.hull}
         --------------- %c
         ▓██   ██▓ ▒█████   █    ██     ██▓     ▒█████    ██████ ▓█████ 
         ▒██  ██▒▒██▒  ██▒ ██  ▓██▒   ▓██▒    ▒██▒  ██▒▒██    ▒ ▓█   ▀ 
          ▒██ ██░▒██░  ██▒▓██  ▒██░   ▒██░    ▒██░  ██▒░ ▓██▄   ▒███   
          ░ ▐██▓░▒██   ██░▓▓█  ░██░   ▒██░    ▒██   ██░  ▒   ██▒▒▓█  ▄ 
          ░ ██▒▓░░ ████▓▒░▒▒█████▓    ░██████▒░ ████▓▒░▒██████▒▒░▒████▒
           ██▒▒▒ ░ ▒░▒░▒░ ░▒▓▒ ▒ ▒    ░ ▒░▓  ░░ ▒░▒░▒░ ▒ ▒▓▒ ▒ ░░░ ▒░ ░
         ▓██ ░▒░   ░ ▒ ▒░ ░░▒░ ░ ░    ░ ░ ▒  ░  ░ ▒ ▒░ ░ ░▒  ░ ░ ░ ░  ░
         ▒ ▒ ░░  ░ ░ ░ ▒   ░░░ ░ ░      ░ ░   ░ ░ ░ ▒  ░  ░  ░     ░   
         ░ ░         ░ ░     ░            ░  ░    ░ ░        ░     ░  ░
         ░ ░                                                              
      `, 'color: #bf2c2c');
      return false;
    }
    return true;
  }
}


class AlienSpaceship extends Spaceship {
  constructor(
    name, 
    hull = Math.floor(Math.random() * (6-3) + 3), 
    firepower = Math.floor(Math.random() * (4-2) + 2), 
    accuracy = Math.random() * (.8-.6) + .6
    ) {
    super(name, hull, firepower, accuracy);
  }

  stillAlive() {
    if (this.getHull() <= 0) {
      console.log(`
                ---------------
                -${this.name}-
                  -DESTROYED-
                --------------
      `)
      
      return false;
    }
    return true;
  }
}


class AlienSpaceshipFactory {
  constructor() {
    this.alienShips = [];
  }
  generateShip(num=1) {
    let name;
    let newShip;

    for (let i = 0; i < num; i++) {

      name = `Alien Ship ${this.alienShips.length + 1}`;
      newShip = new AlienSpaceship(name)
      this.alienShips.push(newShip);
    }
  }
  displayHorde() {
    this.alienShips.forEach(ship => {
      console.log(`
                ---------------
                -${ship.name}-
                --------------
                hull: ${ship.hull}
                fire power: ${ship.firepower}
                ---------------`);
    })
    return this.alienShips;
  }
  isHordeAlive() {
    return this.alienShips.length > 0;
  }
  removeFromHorde() {
    this.alienShips.shift();                  
    if (this.alienShips.length <= 0) {
      return false;
    }
  }

}



// GAME PLAY
const game = {
  playing: false,
  hull: 20,
  firepower: 5,
  accuracy: 0.7,
  youWin: false,
  retreat: false,
  intro() {
    console.log(`
    Earth has been attacked by a horde of aliens! You are the captain of the USS Assembly, on a mission to destroy every last alien ship.

    Battle the aliens as you try to destroy them with your lasers.
    `);
    console.log(`
    The aliens' weakness is that they are too logical and attack one at a time: they will wait to see the outcome of a battle before deploying another alien ship. 
    
    Your strength is that you have the initiative and get to attack first. However, you do not have targeting lasers and can only attack the aliens in order. 
    `);
    console.log(`
    After you have destroyed a ship, you have the option to make a hasty retreat.

    If you choose to retreat, your hull will be reinforced with 5 extra points, however, your accuracy will decrease by 10%. If your accuracy reaches 0, you lose.
    `);
  },
  start() {
    youWin = false;
    retreat = false;
    playing = true;
    
    const USS_Assembly = new MySpaceship('USS Assembly', this.hull, this.firepower, this.accuracy);   // generate players
    
    const alienHorde = new AlienSpaceshipFactory();
    
    let randomNumber = Math.floor(Math.random() * (15 - 6) + 6) + 1;
    alienHorde.generateShip(randomNumber);
    const alienShips = alienHorde.alienShips;
    
    this.intro();

    prompt('Are you ready?');

    console.log(`%c
    ********************************
              ********************************
                        ********************************
                                  ********************************
                                            ********************************
                                  ********************************
                        ********************************
              ********************************
    ********************************
    `, 'color: #773fab')

    alienHorde.displayHorde();

    prompt('Let\'s do it!')

    console.log(`%c
                                            ********************************
                                  ********************************
                        ********************************
              ********************************
    ********************************
              ********************************
                        ********************************
                                  ********************************
                                            ********************************
    `, 'color: #2d611c')

    while (playing) {

      if (USS_Assembly.stillAlive()) {
        USS_Assembly.displayStats();
        USS_Assembly.attack(alienShips[0]);

        if (alienShips[0].stillAlive()) {
          alienShips[0].displayStats();
          alienShips[0].attack(USS_Assembly);
        } else {

          // prompt for player choice when one ship has been destroyed
          let attackAgain = prompt(`
               You destroyed a ship!      
                     What now?            
                attack (a)  ||  retreat (r)
          `)
          if (attackAgain.toLowerCase() === 'r') {
            this.playing = false;
            this.youWin = false;
            retreat = true;
            break;
          }

          alienHorde.removeFromHorde();
          if (!alienHorde.isHordeAlive()) {
            this.youWin = true;
            this.playing = false;
            break;
          }
        }

      } else {
        this.playing = false;
        break;
      }
    }
    if (!this.retreat) {
      this.winner(this.youWin);
    } else {
      this.retreatRestart();
    }
  },
  winner(win) {
    if (win) {
      console.log(`%c
                                          *********************************************
   *********************************************
      ---      ---   --------   ----    ----      ---      --- --------  ----    ---- 
      ***    ***   **********  ****    ****      ***  **  *** ********  *****   **** 
       ---  ---   ----    ---- ----    ----      ---  --  ---   ----    ------  ---- 
        ******    ***      *** ****    ****      ***  **  ***   ****    ************ 
         ----     ---      --- ----    ----      ---  --  ---   ----    ------------ 
         ****     ****    **** ************      ************   ****    ****  ****** 
         ----      ----------  ------------       ----------  --------  ----   ----- 
         ****       ********   ************        ********   ********  ****    **** 
                                                                                     
   *********************************************
                                          *********************************************
      `, 'color: #5482f7')
    } else {
      console.log(`%c
                                        *****************************************
  *****************************************
       ▄████  ▄▄▄       ███▄ ▄███▓▓█████     ▒█████   ██▒   █▓▓█████  ██▀███  
      ██▒ ▀█▒▒████▄    ▓██▒▀█▀ ██▒▓█   ▀    ▒██▒  ██▒▓██░   █▒▓█   ▀ ▓██ ▒ ██▒
     ▒██░▄▄▄░▒██  ▀█▄  ▓██    ▓██░▒███      ▒██░  ██▒ ▓██  █▒░▒███   ▓██ ░▄█ ▒
     ░▓█  ██▓░██▄▄▄▄██ ▒██    ▒██ ▒▓█  ▄    ▒██   ██░  ▒██ █░░▒▓█  ▄ ▒██▀▀█▄  
     ░▒▓███▀▒ ▓█   ▓██▒▒██▒   ░██▒░▒████▒   ░ ████▓▒░   ▒▀█░  ░▒████▒░██▓ ▒██▒
      ░▒   ▒  ▒▒   ▓▒█░░ ▒░   ░  ░░░ ▒░ ░   ░ ▒░▒░▒░    ░ ▐░  ░░ ▒░ ░░ ▒▓ ░▒▓░
       ░   ░   ▒   ▒▒ ░░  ░      ░ ░ ░  ░     ░ ▒ ▒░    ░ ░░   ░ ░  ░  ░▒ ░ ▒░
     ░ ░   ░   ░   ▒   ░      ░      ░      ░ ░ ░ ▒       ░░     ░     ░░   ░ 
           ░       ░  ░       ░      ░  ░       ░ ░        ░     ░  ░   ░     
                                                          ░                   
  *****************************************
                                        *****************************************
      `, 'color: #bf2c2c')
    }
    let startOver = prompt(`
    ***********************************
                      ***********************************
                Play Again?    ----    y / n
                      ***********************************
    ***********************************
    `);
    if (startOver.toLowerCase() === 'y') {
      if (this.youWin ) {
        this.start();
      } else {
        this.retreatRestart();
      }
  }
  },
  retreatRestart() {
    this.hull += 5;
    this.accuracy -= 0.1;
    if (this.accuracy <= 0) {
      this.winner(false);
    } else {
      this.start()
    }
  }
}


// game.start();
