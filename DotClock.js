const MS_PER_DAY = 86400000;

class DotClock {
  constructor({dotCount, dotFactory, radiusMultiplier}) {
    this.positions = [];
    this.shapes = [];
    this.dotFactory = dotFactory;
    this.dotCount = dotCount;
    this.radiusMultiplier = radiusMultiplier;

    this.endOfDayTimestamp = 0;

    this.buildShapes();
  }

  buildShapes() {
    for (var i = 0; i < this.dotCount; i++) {
      this.shapes[i] = this.dotFactory.create(i);
    }
  }

  updateShapePositions() {
    const {shapes, positions} = this;
    for (var i in shapes) {
      const shape = shapes[i];
      const x = positions[i].x;
      const y = positions[i].y;
      shape.position.x = x;
      shape.position.y = y;
      shape.position.z = i * 0.01;
    }
  }

  getPositionsForProgress(progress) {
    const {positions, radiusMultiplier, dotCount} = this;

    const arcMultiplier = progress * -1; // make our clock turn clockwise

    for (var i = 0; i < dotCount; i++) {
      const arc = i * arcMultiplier * 2 * Math.PI;
      const radius = i * radiusMultiplier;
      positions[i] = {
        x: Math.sin(arc) * radius,
        y: Math.cos(arc) * radius
      };
    }
  }

  getEndOfDayTimestamp (time) {
    // skip recalculating this on every tick
    if (this.endOfDayTimestamp > time.getTime()) {
      return this.endOfDayTimestamp;
    }
    const today = new Date(time.getTime());
    today.setHours(23);
    today.setMinutes(59);
    today.setSeconds(59);
    today.setMilliseconds(999);
    const targetDate = new Date(today.toISOString());
    return targetDate.getTime();
  }

  update () {
    const time = new Date();
    const now = time.getTime();
    const msRemaining = this.getEndOfDayTimestamp(time) - now;
    const progress = (MS_PER_DAY - msRemaining) / MS_PER_DAY;
    this.getPositionsForProgress(progress);
    this.updateShapePositions();
  }

}
