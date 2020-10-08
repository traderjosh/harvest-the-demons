import { assetsDPR } from '..';

export default class Enemy extends Phaser.Physics.Matter.Sprite {
  constructor(config) {
    super(config.world, config.x, config.y, config.key);

    let scale = config.bigEye ? 1 / (assetsDPR / 3) : 1 / assetsDPR;

    this.setScale(scale, scale);

    this.body.label = config.label;

    this.isAlive = true;

    this.body.isStatic = true;
    this.body.ignoreGravity = true;

    this.setPosition(config.x, config.y);

    this.on('animationcomplete', this.onBloodSplatterEnd, this);

    this.scene.add.existing(this);
  }

  onBloodSplatterEnd() {
    this.setActive(false);
  }
}
