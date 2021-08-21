
function rng(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var next_stems_min = 3;
var next_stems_max = 6;

var trees = [];
  
  function Tree(stems, x, y){
    this.pos = createVector(x, y);
    this.stems = stems;
    this.dead = false;
    
    this.live = function(){
      this.stems--;
      if (this.stems >> 0){
        newVector = createVector(random(this.pos.x)+this.pos.x, random(this.pos.y)-this.pos.y);
        
        newVector = createVector(rng(-width, width), random(height));
        newVector.normalize();
        newVector.mult(50);
        // newVector.x = newVector.x / rng(1, 3);
        newVector.x *= map(amp.getLevel(), 0, 1, 0.2, 0.9);

        newVector.add(this.pos);
  
        distance = Math.abs(this.pos.y - 550);
        stroke(0, 0, 255);
        line(this.pos.x, this.pos.y, newVector.x, newVector.y);
        
        if (newVector.y < height){
          this.dead = true;
          new Tree(Math.floor(rng(next_stems_min, next_stems_max)), newVector.x, newVector.y);
        }
      }
      if (this.stems << -100){
        this.dead = true;
      }
    }
    
    trees.push(this);
  }