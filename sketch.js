import Player from './player.js';
import Game from './game.js';

var CANVAS = {
  WIDTH: document.getElementById('canvas').offsetWidth,
  HEIGHT: document.getElementById('canvas').offsetHeight
};
var FRAMERATE = 60;

var POPULATION_SIZE = 100;
var NUM_INPUTS = 2;
var NUM_OUTPUTS = 1;

var NEAT = neaterJS.init(POPULATION_SIZE, NUM_INPUTS, NUM_OUTPUTS, neaterJS.Activations.sigmoid);

var canvas = function(p5) {
  let game = new Game();
  let players = [];

  p5.preload = function() {
    // load sprites if needed
  };

  p5.setup = function() {
    p5.createCanvas(CANVAS.WIDTH, CANVAS.HEIGHT);
    p5.frameRate(FRAMERATE);

    // Setup game
    game.setup(CANVAS.WIDTH, CANVAS.HEIGHT);

    // Setup players
    for (let i = 0; i < NEAT.population.length; i++) {
      let player = new Player(CANVAS.WIDTH / 2, CANVAS.HEIGHT / 2, NEAT.population[i]);
      player.setup();
      players.push(player);
    }
  };

  p5.draw = function() {
    // Update game
    game.update();
    game.draw(p5);

    // ----------------RUN SIMULATION----------------------
    for (let i = 0; i < players.length; i++) {
      if (players[i].isDead) {
        continue;
      }

      players[i].act();
      players[i].update();
      players[i].draw(p5);
    }

    // ----------------EVALUATE----------------------
    if (players.every(p => p.isDead)) {
      for (let i = 0; i < players.length; i++) {
        // Set fitness
        players[i].evaluate();
      }

      NEAT.repopulate();
      p5.setup();
    }
  };

  p5.mouseClicked = function() {};
};

new p5(canvas, 'canvas');
