import { GameObjects } from 'phaser';

export default class HealthBar extends GameObjects.Container {
  constructor(scene) {
    super(scene, 25, 50);

    this.scene = scene;

    this.health = 100;

    this.healthBarLeftFrame = this.scene.add.sprite(103, 0, 'health_bar_left_frame');

    this.healthBarLeftEdge = this.scene.add.image(103, 0, 'health_bar_left_edge');

    this.healthBarMeterFrame = this.scene.add.image(103, 0, 'health_bar_meter_frame');

    this.healthBarMeter = this.scene.add.image(this.healthBarMeterFrame.x, 0, 'health_bar_meter');

    Phaser.Display.Align.To.RightTop(this.healthBarMeterFrame, this.healthBarLeftEdge);
    Phaser.Display.Align.To.RightTop(this.healthBarMeter, this.healthBarLeftEdge);

    this.healthBarRightFrame = this.scene.add.image(103, 0, 'health_bar_right_frame');

    this.healthBarRightEdge = this.scene.add.image(103, 0, 'health_bar_right_edge');

    Phaser.Display.Align.To.RightTop(this.healthBarRightFrame, this.healthBarMeterFrame);
    Phaser.Display.Align.To.RightTop(this.healthBarRightEdge, this.healthBarMeterFrame);

    this.healthMeterBadge = this.scene.add.image(103, 0, 'health_bar_badge');
    this.healthMeterBadge.setScale(0.3, 1);
    Phaser.Display.Align.In.TopCenter(this.healthMeterBadge, this.healthBarLeftFrame, -35);

    this.healthMeterIcon = this.scene.add.image(103, 0, 'health_bar_icon');
    this.healthMeterIcon.setScale(0.3, 1);
    Phaser.Display.Align.In.Center(this.healthMeterIcon, this.healthMeterBadge);

    this.add(this.healthBarLeftFrame);
    this.add(this.healthBarLeftEdge);
    this.add(this.healthBarMeterFrame);
    this.add(this.healthBarMeter);
    this.add(this.healthBarRightFrame);
    this.add(this.healthBarRightEdge);
    this.add(this.healthMeterBadge);
    this.add(this.healthMeterIcon);

    this.healthBarMeter.setDisplaySize(this.healthBarMeter.width * 10, this.healthBarMeter.height);
    this.healthBarMeter.setX(this.healthBarMeter.x + (this.healthBarMeter.width * 10) / 2 - this.healthBarMeter.width / 2);

    this.healthWidth = this.healthBarLeftEdge.displayWidth + this.healthBarMeter.displayWidth + this.healthBarRightEdge.displayWidth;

    this.setScale(0.7, 0.2);

    scene.add.existing(this);
  }
  damage(amount) {
    this.health = Math.max(this.health - amount, 0);

    let healthWidth = this.healthWidth * (this.health / 100);

    if (this.health === 0) {
      this.healthBarLeftEdge.displayWidth = 0; //* L
      this.healthBarRightEdge.displayWidth = 0; //* R
      this.healthBarMeter.displayWidth = 0; //* C
    }

    else if (healthWidth <= this.healthBarLeftEdge.width) {
      this.healthBarLeftEdge.displayWidth = healthWidth; //* L

      this.healthBarMeter.displayWidth = 0; //* C

      this.healthBarRightEdge.displayWidth = 0; //* R
      
    }
    else if (healthWidth <= this.healthBarLeftEdge.width + this.healthBarMeter.width * 10) {
      this.healthBarLeftEdge.displayWidth = this.healthBarLeftEdge.width; //* L

      healthWidth -= this.healthBarLeftEdge.width;
      
      this.healthBarMeter.displayWidth = healthWidth; //* C
      Phaser.Display.Align.To.RightTop(this.healthBarMeter, this.healthBarLeftEdge);

      this.healthBarRightEdge.displayWidth = 0; //* R
    }
    else if (healthWidth <= this.healthWidth) {
      this.healthBarLeftEdge.displayWidth = this.healthBarLeftEdge.width; //* L

      this.healthBarMeter.setDisplaySize(this.healthBarMeter.width * 10, this.healthBarMeter.height); //* C
      Phaser.Display.Align.To.RightTop(this.healthBarMeter, this.healthBarLeftEdge);

      healthWidth -= (this.healthBarLeftEdge.width + this.healthBarMeter.width);

      this.healthBarRightEdge.displayWidth = healthWidth; //* R
      Phaser.Display.Align.To.RightTop(this.healthBarRightEdge, this.healthBarMeterFrame);
      this.healthBarRightEdge.x -= healthWidth / 2;
    }
  }
  restore() {
    this.health = 100;
    this.healthBarLeftEdge.displayWidth = 206;
    this.healthBarMeter.displayWidth = 220;
    this.healthBarMeter.setDisplaySize(this.healthBarMeter.width * 10, this.healthBarMeter.height); //* C
    Phaser.Display.Align.To.RightTop(this.healthBarMeter, this.healthBarLeftEdge);
    this.healthBarMeter.setX(this.healthBarMeter.x + (this.healthBarMeter.width * 10) / 2 - this.healthBarMeter.width / 2);
    this.healthBarRightEdge.displayWidth = 206;
  }
}
