import { Asset } from 'src/entities/engine/assets';

import { Rect } from '../../../entities/engine/2d/entities';

type BirdAssets = {
  bluebird_upflap: Asset;
  bluebird_midflap: Asset;
  bluebird_downflap: Asset;
};

export class Bird {
  private MIN_VELOCITY = -6;
  status: 'jump' | 'fly' | 'down' = 'fly';
  rect: Rect;
  asset: BirdAsset;
  velocity: number;

  constructor(height: number, assets: BirdAssets) {
    this.rect = new Rect(150, height, 50, 35, '#00ff00');
    this.asset = new BirdAsset(assets);
    this.velocity = 0;
  }

  private ubdate_status() {
    if (this.velocity < this.MIN_VELOCITY + 2) {
      return 'jump';
    } else if (this.velocity > this.MIN_VELOCITY + 2 && this.velocity < 0) {
      return 'fly';
    }
    return 'down';
  }

  reset() {
    this.rect.x = 150;
    this.rect.y = 350;
    this.velocity = 0;
  }
  render(ctx: CanvasRenderingContext2D) {
    // this.rect.render(ctx);
    this.asset.render(ctx, this);
  }

  think() {
    this.rect.y += this.velocity;
    if (this.velocity < 6) {
      this.velocity += 0.2;
    }
    this.status = this.ubdate_status();
  }

  jump() {
    this.velocity = this.MIN_VELOCITY;
  }
}

export class BirdAsset {
  assets: BirdAssets;
  constructor(assets: BirdAssets) {
    this.assets = assets;
  }
  render(ctx: CanvasRenderingContext2D, bird: Bird) {
    let asset = this.assets.bluebird_upflap.data;
    if (bird.status === 'jump') {
      asset = this.assets.bluebird_downflap.data;
    } else if (bird.status === 'fly') {
      asset = this.assets.bluebird_midflap.data;
    }
    ctx.save();
    ctx.drawImage(asset, 0, 0, 35, 35, bird.rect.x, bird.rect.y, 50, 50);
    ctx.restore();
  }
}
