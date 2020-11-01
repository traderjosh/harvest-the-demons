import { assetsDPR } from '..';

export default class Enemy extends Phaser.Physics.PhaserPlanck {
  constructor(config) {
    super(config.world, config.x, config.y, config.key);

    this.isAlive = true;
    this.bigEye = config.bigEye;

    let scale = this.bigEye ? 1 / (assetsDPR / 3) : 1 / assetsDPR;

    this.setScale(scale, scale);

    this.body.label = config.label;

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
