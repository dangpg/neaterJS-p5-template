import Player from './player.js';

var CANVAS = { WIDTH: 800, HEIGHT: 600 };
var POPULATION_SIZE = 100;
var NUM_INPUTS = 2;
var NUM_OUTPUTS = 1;

var NEAT = neaterJS.init(POPULATION_SIZE, NUM_INPUTS, NUM_OUTPUTS, neaterJS.Activations.sigmoid);

var canvas = function(p) {
  let players = [];
  p.preload = function() {
    // load sprites if needed
  };

  p.setup = function() {
    p.createCanvas(CANVAS.WIDTH, CANVAS.HEIGHT);

    // Setup players
    for (let i = 0; i < NEAT.population.length; i++) {
      players.push(new Player(CANVAS.WIDTH / 2, CANVAS.HEIGHT / 2, NEAT.population[i]));
    }
  };

  p.draw = function() {
    // Setup game

    // ----------------RUN SIMULATION----------------------
    for (let i = 0; i < players.length; i++) {
      if (players[i].isDead) {
        continue;
      }

      players[i].act();
      players[i].update();
      players[i].show(p);
    }

    // ----------------EVALUATE----------------------
    if (players.every(p => p.isDead)) {
      for (let i = 0; i < players.length; i++) {
        // Set fitness
        players[i].evaluate();
      }

      NEAT.repopulate();
      p.setup();
    }
  };

  p.mouseClicked = function() {};
};

new p5(canvas, 'canvas');
