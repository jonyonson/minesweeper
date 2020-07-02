function Cell(i, j, w) {
  this.i = i;
  this.j = j;
  this.x = i * w;
  this.y = j * w;
  this.w = w;
  this.neighborCount = 0;
  this.bee = false;
  this.revealed = false;
}

Cell.prototype.show = function () {
  stroke(0);
  noFill();
  rect(this.x, this.y, this.w, this.w);
  if (this.revealed) {
    if (this.bee) {
      fill(127);
      ellipse(this.x + this.w * 0.5, this.y + this.w * 0.5, this.w * 0.5);
    } else {
      fill(200);
      rect(this.x, this.y, this.w, this.w);
      if (this.neighborCount > 0) {
        textAlign(CENTER);
        fill(0);
        text(this.neighborCount, this.x + this.w * 0.5, this.y + this.w - 6);
      }
    }
  }
};

Cell.prototype.countBees = function () {
  if (this.bee) {
    this.neighborCount = -1;
    return;
  }
  let total = 0;
  for (let xoff = -1; xoff < 2; xoff++) {
    for (let yoff = -1; yoff < 2; yoff++) {
      let i = this.i + xoff;
      let j = this.j + yoff;
      if (i > -1 && i < cols && j > -1 && j < rows) {
        let neighbor = grid[i][j];
        if (neighbor.bee) {
          total++;
        }
      }
    }
  }
  this.neighborCount = total;
};

Cell.prototype.contains = function (x, y) {
  return x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.w;
};

Cell.prototype.reveal = function () {
  this.revealed = true;
  if (this.neighborCount === 0) {
    this.floodFill();
  }
};

Cell.prototype.floodFill = function () {
  for (let xoff = -1; xoff < 2; xoff++) {
    for (let yoff = -1; yoff < 2; yoff++) {
      let i = this.i + xoff;
      let j = this.j + yoff;
      if (i > -1 && i < cols && j > -1 && j < rows) {
        let neighbor = grid[i][j];
        if (!neighbor.bee && !neighbor.revealed) {
          neighbor.reveal();
        }
      }
    }
  }
};
