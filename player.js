export default class Player {
  constructor(x, y, brain) {
    this.x = x;
    this.y = y;
    this.brain = brain;
    this.isDead = false;
    this.score = 0;
  }

  show(p) {
    // draw player
    // p.circle...
  }

  update() {
    // update player's position...
    // check whether player is dead
  }

  act() {
    // give player some information
    let inputs = [];
    this.brain.see(inputs);

    // perform player's action depending on inputs
    let outputs = this.brain.think();
  }

  evaluate() {
    this.brain.setFitness(this.score);
  }
}
