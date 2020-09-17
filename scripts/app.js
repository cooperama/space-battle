console.log('------*-------*-------*------')
console.log('Space Battle')
console.log('------*-------*-------*------')




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
    console.log(`${this.name} shoots and...`)
    if (Math.random() < this.accuracy) {
      target.hull -= this.firepower;
      console.log(`hits ${target.name}!`);
      // return target.stillAlive();                  //////???????
      // target.displayStats();
    } else {
      console.log(`missed its target!`);
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

  retreat() {
    console.log('RETREAT!');
    game.playing = false;
  }

  stillAlive() {
    if (this.getHull() <= 0) {
      console.log(`
         ---------------
         -${this.name}-
         --------------
         hull: ${this.hull}
         ---------------
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
      `)
      return false;
    }
    return true;
  }
}

class AlienSpaceship extends Spaceship {
  constructor(name, hull, firepower, accuracy) {
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
    let hull;
    let firepower;
    let accuracy;
    let name;
    let newShip;

    for (let i = 0; i < num; i++) {

      hull = Math.floor(Math.random() * (6-3) + 3) + 1;
      firepower = Math.floor(Math.random() * (4-2) + 2) + 1;
      accuracy = Math.random() * (.8-.6) + .6;
      name = `Alien Ship ${this.alienShips.length + 1}`;

      newShip = new AlienSpaceship(name, hull, firepower, accuracy)
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
  intro() {
    console.log(`
    Earth has been attacked by a horde of aliens! You are the captain of the USS Assembly, on a mission to destroy every last alien ship.

    Battle the aliens as you try to destroy them with your lasers.

    There are six alien ships. The aliens' weakness is that they are too logical and attack one at a time: they will wait to see the outcome of a battle before deploying another alien ship. Your strength is that you have the initiative and get to attack first. However, you do not have targeting lasers and can only attack the aliens in order. After you have destroyed a ship, you have the option to make a hasty retreat.
    `)
  },
  start() {
    let youWin = false;
    this.intro();
    playing = true;

    const USS_Assembly = new MySpaceship('USS Assembly');   // generate players
    const alienHorde = new AlienSpaceshipFactory();
    alienHorde.generateShip(6);

    // const alienShip = alienHorde.alienShips[0];
    const alienShips = alienHorde.alienShips;

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
             You destroyed one ship!
          Attack next ship or retreat?
                   attack: a
                   retreat: r
          `)
          if (attackAgain.toLowerCase() !== 'a') {
            game.playing = false;
            game.youWin = false;
            break;
          }


          alienHorde.removeFromHorde();
          if (!alienHorde.isHordeAlive()) {
            youWin = true;
            this.playing = false;
            break;
          }
        }

      } else {
        this.playing = false;
      }

    }
    this.winner(youWin);
  },
  winner(win) {
    if (win) {
      console.log(`
        ***********************************
                   ***********************************
  ____    ____  ______    __    __     ____    __    ____  __  .__   __. 
  \   \  /   / /  __  \  |  |  |  |    \   \  /  \  /   / |  | |  \ |  | 
   \   \/   / |  |  |  | |  |  |  |     \   \/    \/   /  |  | |   \|  | 
    \_    _/  |  |  |  | |  |  |  |      \            /   |  | |  . '  | 
      |  |    |  '--'  | |  '--'  |       \    /\    /    |  | |  |\   | 
      |__|     \______/   \______/         \__/  \__/     |__| |__| \__| 
                                                                                                                  
                   ***********************************
        ***********************************
   `)
    } else {
      console.log(`
                            ***********************************
      ***********************************
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
      ***********************************
                            ***********************************
      `)
    }
  }
}


game.start();
