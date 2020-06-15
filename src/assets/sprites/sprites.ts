import background from './background.png';
import ball from './ball.png';
import block from './block.png';
import platform from './platform.png';
import controlRight from './controlRight.png';
import controlLeft from './controlLeft.png';
import replay from './replay.png';

export interface SpritesInterface {
  background: string | HTMLImageElement,
  platform: string | HTMLImageElement,
  ball: string | HTMLImageElement,
  block: string | HTMLImageElement,
  controlRight: string | HTMLImageElement,
  controlLeft: string | HTMLImageElement,
  replay: string | HTMLImageElement
}

export const spritesLevel1: SpritesInterface = {
  background,
  ball,
  block,
  platform,
  controlRight,
  controlLeft,
  replay
};
