import _ from 'lodash';
import { SpritesInterface, spritesLevel1 } from '../assets/sprites/sprites';
import { SoundsInterface, soundsLevel1} from '../assets/sounds/sounds';

interface KeysInterface {
  LEFT: number,
  RIGHT: number,
  ARROW_LEFT: number,
  ARROW_RIGHT: number,
  SPACE: number
}

const KEYS: KeysInterface = {
  LEFT: 37,
  RIGHT: 39,
  ARROW_LEFT: 65,
  ARROW_RIGHT: 68,
  SPACE: 32
};

interface ElementInterface {
  x: number,
  y: number,
  width: number,
  height: number,
  velocity?: number,
  dx?: number,
  dy?: number,
  active?: boolean
  move?: (gameState, limit?: number, callback?: (side: string) => void) => void,
  start?: (direction: string, callback: (direction?: string) => void) => void,
  stop?: (direction: string, callback: (direction: string) => void, condition: string) => void,
  forceStop?: () => void,
  collide?: (element: ElementInterface) => boolean,
  collideWall?: (rightWall: number, bottomWall: number, callback: () => void) => void,
  bumbBlock?: (block: ElementInterface, sound: HTMLAudioElement, callback: () => void) => void,
  bumbPlatform?: (platform: ElementInterface, sound: HTMLAudioElement) => void,
  getTouchOffset?: (x: number) => number
}

interface LevelInterface {
  sprites: SpritesInterface,
  sounds: SoundsInterface,
  blocksAmount: number,
  blocksRows: number,
  platform: ElementInterface,
  ball: ElementInterface,
  blocks: ElementInterface[]
}

const level1: LevelInterface = {
  sprites: spritesLevel1,
  sounds: soundsLevel1,
  blocksAmount: 32,
  blocksRows: 4,
  platform: {
    x: 810,
    y: 900,
    width: 300,
    height: 42,
    velocity: 0,
    dx: 0,
    move(gameState, limit, callback) {
      if (
        gameState.forceStopLeft ||
        gameState.forceStopRight
      ) {
        return ;
      }
      if (
        typeof this.dx !== 'undefined'
      ) {
        this.x += this.dx

        if (
          typeof callback !== 'undefined' &&
          this.x <= 0
        ) {
          this.x = 0;
          callback('left');
        } else if (
          typeof callback !== 'undefined' &&
          typeof limit !== 'undefined' &&
          this.x + this.width >= limit
        ) {
          this.x = limit - this.width;
          callback('right');
        }
      }
    },
    start(direction, callback) {
      switch (direction) {
        case 'left':
          if (
            typeof this.velocity !== 'undefined'
          ) {
            this.dx = -this.velocity;
          }
          callback(direction);
          break;

        case 'right':
          if (
            typeof this.velocity !== 'undefined'
          ) {
            this.dx = this.velocity;
          }
          callback(direction);
          break;

        default:
          break;
      }
    },
    stop(direction, callback, condition) {
      if (
        direction === condition
      ) {
        this.dx = 0;
        callback(direction);
      }
    },
    forceStop() {
      this.dx = 0;
    },
    getTouchOffset(x) {
      const offset = x - this.x;

      return (2 * offset / this.width) - 1;
    }
  },
  ball: {
    x: 930,
    y: 840,
    width: 60,
    height: 60,
    velocity: 0,
    dx: 0,
    dy: 0,
    move(gameState, limit) {
      if (
        !gameState.ballIsLaunched &&
        gameState.forceStopLeft
      ) {
        this.x = 120;
        return ;
      } else if (
        !gameState.ballIsLaunched &&
        gameState.forceStopRight &&
        typeof limit !== 'undefined'
      ) {
        this.x = limit - 180;
        return ;
      }
      if (
        typeof this.dx !== 'undefined' &&
        typeof this.dy !== 'undefined'
      ) {
        this.x += this.dx
        this.y -= this.dy
      }
    },
    start(direction, callback) {
      switch (direction) {
        case 'left':
          if (
            typeof this.velocity !== 'undefined'
          ) {
            this.dx = -this.velocity;
          }
          break;

        case 'right':
          if (
            typeof this.velocity !== 'undefined'
          ) {
            this.dx = this.velocity;
          }
          break;

        case 'top':
          if (
            typeof this.velocity !== 'undefined'
          ) {
            this.dx = _.random(-this.velocity, this.velocity);
            this.dy = this.velocity / 2;
          }
          callback();
          break;

        default:
          break;
      }
    },
    stop(direction, callback, condition) {
      if (
        direction === condition
      ) {
        this.dx = 0;
        callback(direction);
      }
    },
    collide(element: ElementInterface) {
      if (
        typeof this.x !== 'undefined' &&
        typeof this.dx !== 'undefined' &&
        typeof this.y !== 'undefined' &&
        typeof this.dy !== 'undefined'
      ) {
        const x = this.x + this.dx;
        const y = this.y - this.dy;
        return x - this.dx + this.width > element.x &&
          x - this.dx < element.x + element.width &&
          y - this.dy + this.height > element.y &&
          y - this.dy < element.y + element.height;
      }
      return false;
    },
    collideWall(wallRight, wallBottom, callback) {
      if (
        typeof this.x !== 'undefined' &&
        typeof this.dx !== 'undefined' &&
        typeof this.y !== 'undefined' &&
        typeof this.dy !== 'undefined' &&
        typeof this.velocity !== 'undefined'
      ) {
        switch (true) {
          case this.x <= 0:
            this.x = 0;
            this.dx = this.velocity / 2
            break;

          case this.x + this.width >= wallRight:
            this.x = wallRight - this.width;
            this.dx = -this.velocity / 2
            break;

          case this.y <= 0:
            this.y = 0;
            this.dy = -this.velocity / 2
            break;

          case this.y + this.height >= wallBottom:
            callback();
            break;

          default:
            break;
        }
      }
    },
    bumbBlock(block, sound, callback) {
      if (
        !block.active
      ) {
        return;
      }
      block.active = false;
      if (
        typeof this.dy !== 'undefined' &&
        typeof this.dx !== 'undefined'
      ) {
         sound.play();
         callback();
         if (
           this.y + this.dy - this.height / 2 + 5 > block.y + block.height &&
           this.y + this.dy - this.height / 2 - 5 < block.y + block.height ||
           this.y + this.dy + this.height + this.height / 2 + 5 > block.y &&
           this.y + this.dy + this.height + this.height / 2 - 5 < block.y
         ) {
           this.dy *= -1;
         } else {
           this.dx *= -1;
         }
      }
    },
    bumbPlatform(platform, sound) {
      if (
        platform.dx
      ) {
        this.x += platform.dx;
      }
      const touchX = this.x + this.width / 2;
      if (
       typeof this.dy !== 'undefined' &&
       typeof this.velocity !== 'undefined' &&
       typeof platform.getTouchOffset !== 'undefined'
      ) {
        if (
          this.dy > 0
        ) {
          return;
        }
        sound.play();
        this.dy = this.velocity / 2;
        this.dx = this.velocity * platform.getTouchOffset(touchX);
      }
    }
  },
  blocks: []
};

class Game {
  _canvas: HTMLCanvasElement;
  _ctx: CanvasRenderingContext2D;
  _canvasWidth: number;
  _canvasHeight: number;
  _difficulty: string;
  _level: LevelInterface;
  _platform: ElementInterface;
  _ball: ElementInterface;
  _blocks: ElementInterface[];
  _state;

  constructor(
    canvas: HTMLCanvasElement,
    width: number,
    height: number,
    difficulty: string,
    level: LevelInterface
  ) {
    this._canvas = canvas;
    this._ctx = this._canvas.getContext('2d') as CanvasRenderingContext2D;
    this._canvasWidth = width;
    this._canvasHeight = height;
    this._difficulty = difficulty;
    this._level = level;
    this._platform = level.platform;
    this._ball = level.ball;
    this._blocks = level.blocks;
    this._state = {
      gameFinished: false,
      platformIsMoving: 'none',
      ballIsLaunched: false,
      blocksAmount: 0,
      forceStopLeft: false,
      forceStopRight: false
    };
  }

  setState = (newOptions, callback?: () => void): void => {
    const newState = this._state;

    for (const key in newOptions) {
      if (newOptions.hasOwnProperty(key)) {
        newState[key] = newOptions[key]
      }
    }

    if (
      !_.isEqual(this._state, newState)
    ) {
      this._state = newState
    }

    if (
      callback
    ) {
      callback();
    }
  };

  init = (): void => {
    switch(this._difficulty) {
      case 'easy':
        this._platform.velocity = 12;
        this._ball.velocity = 12;
        break;

      case 'medium':
        this._platform.velocity = 18;
        this._ball.velocity = 18;
        break;

      case 'hard':
        this._platform.velocity = 24;
        this._ball.velocity = 24;
        break;

      default:
        break;
    }

    this.setState({
      blocksAmount: this._level.blocksAmount
    });

    this.setEvents();
  };

  handleKeyDown = (e: KeyboardEvent) => {
    if (
      e.keyCode === KEYS.SPACE &&
      !this._state.ballIsLaunched &&
      typeof this._ball.start !== 'undefined'
    ) {
      this._ball.start('top', () => {
        this.setState({
          ballIsLaunched: true
        });
      });
    }

    if (
      e.keyCode === KEYS.LEFT &&
      typeof this._platform.start !== 'undefined' ||
      e.keyCode === KEYS.ARROW_LEFT &&
      typeof this._platform.start !== 'undefined'
    ) {
      this._platform.start('left', (direction) => {
        this.setState({
          platformIsMoving: direction,
          forceStopRight: false
        });
      });

      if (
        typeof this._ball.start !== 'undefined' &&
        !this._state.ballIsLaunched
      ) {
        this._ball.start('left', () => {
          return ;
        });
      }
    }

    if (
      e.keyCode === KEYS.RIGHT &&
      typeof this._platform.start !== 'undefined' ||
      e.keyCode === KEYS.ARROW_RIGHT &&
      typeof this._platform.start !== 'undefined'
    ) {
      this._platform.start('right', (direction) => {
        this.setState({
          platformIsMoving: direction,
          forceStopLeft: false
        });
      });

      if (
        typeof this._ball.start !== 'undefined' &&
        !this._state.ballIsLaunched
      ) {
        this._ball.start('right', () => {
          return ;
        });
      }
    }
  };

  handleKeyUp = (e: KeyboardEvent): void => {
    if (
      e.keyCode === KEYS.LEFT &&
      typeof this._platform.stop !== 'undefined' ||
      e.keyCode === KEYS.ARROW_LEFT &&
      typeof this._platform.stop !== 'undefined'
    ) {
      this._platform.stop('left', (direction) => {
        this.setState({
          platformIsMoving: direction,
          forceStopRight: false
        });
      }, this._state.platformIsMoving);

      if (
        typeof this._ball.stop !== 'undefined' &&
        !this._state.ballIsLaunched
      ) {
        this._ball.stop('left', (direction) => {
          this.setState({
            platformIsMoving: direction
          });
        }, this._state.platformIsMoving);
      }
    }

    if (
      e.keyCode === KEYS.RIGHT &&
      typeof this._platform.stop !== 'undefined' ||
      e.keyCode === KEYS.ARROW_RIGHT &&
      typeof this._platform.stop !== 'undefined'
    ) {
      this._platform.stop('right', (direction) => {
        this.setState({
          platformIsMoving: direction
        });
      }, this._state.platformIsMoving);

      if (
        typeof this._ball.stop !== 'undefined' &&
        !this._state.ballIsLaunched
      ) {
        this._ball.stop('right', (direction) => {
          this.setState({
            platformIsMoving: direction
          });
        }, this._state.platformIsMoving);
      }
    }
  };

  handleMouseDown = (e) => {
    const x = e.pageX - e.target.offsetLeft;
    const y = e.pageY - e.target.offsetTop;
    const proportionX = e.target.offsetWidth / e.target.width;
    const proportionY = e.target.offsetHeight / e.target.height;

    if (
      x / proportionX >= this._canvasWidth / 2 - 120 &&
      x / proportionX <= this._canvasWidth / 2 - 30 &&
      y / proportionY >= this._canvasHeight - 120 &&
      y / proportionY <= this._canvasHeight - 30 &&
      typeof this._platform.start !== 'undefined'
    ) {
      this._platform.start('left', (direction) => {
        this.setState({
          platformIsMoving: direction,
          forceStopRight: false
        });
      });

      if (
        typeof this._ball.start !== 'undefined' &&
        !this._state.ballIsLaunched
      ) {
        this._ball.start('left', () => {
          return ;
        });
      }
    } else if (
      x / proportionX >= this._canvasWidth / 2 + 30 &&
      x / proportionX <= this._canvasWidth / 2 + 120 &&
      y / proportionY >= this._canvasHeight - 120 &&
      y / proportionY <= this._canvasHeight - 30 &&
      typeof this._platform.start !== 'undefined'
    ) {
      this._platform.start('right', (direction) => {
        this.setState({
          platformIsMoving: direction,
          forceStopLeft: false
        });
      });

      if (
        typeof this._ball.start !== 'undefined' &&
        !this._state.ballIsLaunched
      ) {
        this._ball.start('right', () => {
          return ;
        });
      }
    } else {
      if (
        !this._state.ballIsLaunched &&
        typeof this._ball.start !== 'undefined' &&
        y / proportionY < this._platform.y
      ) {
        this._ball.start('top', () => {
          this.setState({
            ballIsLaunched: true
          });
        });
      }
    }
  };

  handleMouseUp = () => {
    if (
      typeof this._platform.stop !== 'undefined' &&
      this._state.platformIsMoving === 'left'
    ) {
      this._platform.stop('left', (direction) => {
        this.setState({
          platformIsMoving: direction,
          forceStopRight: false
        });
      }, this._state.platformIsMoving);

      if (
        typeof this._ball.stop !== 'undefined' &&
        !this._state.ballIsLaunched
      ) {
        this._ball.stop('left', (direction) => {
          this.setState({
            platformIsMoving: direction
          });
        }, this._state.platformIsMoving);
      }
    }

    if (
      typeof this._platform.stop !== 'undefined' &&
      this._state.platformIsMoving === 'right'
    ) {
      this._platform.stop('right', (direction) => {
        this.setState({
          platformIsMoving: direction
        });
      }, this._state.platformIsMoving);

      if (
        typeof this._ball.stop !== 'undefined' &&
        !this._state.ballIsLaunched
      ) {
        this._ball.stop('right', (direction) => {
          this.setState({
            platformIsMoving: direction
          });
        }, this._state.platformIsMoving);
      }
    }
  };

  setEvents = (): void => {
    if (
      !this._state.gameFinished
    ) {
      window.addEventListener('keydown', this.handleKeyDown);
      window.addEventListener('keyup', this.handleKeyUp);
      window.addEventListener('mousedown', this.handleMouseDown);
      window.addEventListener('mouseup', this.handleMouseUp);
    } else {
      window.removeEventListener('keydown', this.handleKeyDown);
      window.removeEventListener('keyup', this.handleKeyUp);
      window.removeEventListener('mousedown', this.handleMouseDown);
      window.removeEventListener('mouseup', this.handleMouseUp);
      if (
        typeof this._platform.forceStop !== 'undefined'
      ) {
        this._platform.forceStop();
      }
    }
  };

  preload = (callback: () => void): void => {
    let loaded = 0;

    const requiredIterations = Object.keys(this._level.sprites).length + Object.keys(this._level.sounds).length;

    const onSourceLoaded = () => {
      ++loaded;

      if (loaded >= requiredIterations) {
        callback();
      }
    }

    for (const sprite in this._level.sprites) {
      if (
        this._level.sprites.hasOwnProperty(sprite)
      ) {
        const image = new Image() as HTMLImageElement;
        image.src = this._level.sprites[sprite];
        this._level.sprites[sprite] = image;
        this._level.sprites[sprite].addEventListener('load', onSourceLoaded)
      }
    }

    for (const sound in this._level.sounds) {
      if (
        this._level.sounds.hasOwnProperty(sound)
      ) {
        const audio = new Audio() as HTMLAudioElement;
        audio.src = this._level.sounds[sound];
        this._level.sounds[sound] = audio;
        this._level.sounds[sound].addEventListener('canplaythrough', onSourceLoaded, {once: true});
      }
    }
  };

  create = (): void => {
    let rows = this._level.blocksRows;
    let cols = this._level.blocksAmount / rows;
    if (
      !Number.isInteger(cols)
    ) {
      rows += 1;
      cols = Math.floor(this._level.blocksAmount / rows) + (this._level.blocksAmount % rows);
    }

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        this._blocks.push({
          x: 195 * col + 195,
          y: 75 * row + 105,
          width: 180,
          height: 60,
          active: true
        });
      }
    }
  };

  update = (): void => {
    if (
      typeof this._platform.move !== 'undefined'
    ) {
      this._platform.move(this._state, this._canvasWidth, (side) => {
        switch (side) {
          case 'left':
            this.setState({
              forceStopLeft: true
            });
            break;

          case 'right':
            this.setState({
              forceStopRight: true
            });
            break;

          default:
            break;
        }
      });
    }

    if (
      typeof this._ball.move !== 'undefined'
    ) {
      this._ball.move(this._state, this._canvasWidth);
    }

    this.collideBlock();
    this.collidePlatform();

    if (typeof this._ball.collideWall !== 'undefined') {
      this._ball.collideWall(this._canvasWidth, this._canvasHeight, () => {
        this.setState({
          gameFinished: true
        }, () => {
          this.setEvents();
          setTimeout(() => {
            this._ctx.clearRect(0, 0, this._canvasWidth, this._canvasHeight);
          }, 300);
        });
      });
    }

    if (
      !this._state.blocksAmount ||
      this._state.gameFinished
    ) {
      this.setState({
        gameFinished: true
      }, () => {
        this._canvas.addEventListener('click', this.reset);
        window.addEventListener('keyup', this.reset);
      })
    }
  };

  collideBlock = (): void => {
    for (const block of this._blocks) {
      if (
        typeof this._ball.collide !== 'undefined' &&
        this._ball.collide(block) &&
        typeof this._ball.bumbBlock !== 'undefined') {
        this._ball.bumbBlock(block, this._level.sounds.bump as HTMLAudioElement, () => {
          const prev = this._state.blocksAmount;
          this.setState({
            blocksAmount: prev - 1
          });
        });
      }
    }
  };

  collidePlatform = (): void => {
    if (
      typeof this._ball.collide !== 'undefined' &&
      this._ball.collide(this._platform) &&
      this._ball.bumbPlatform
    ) {
      this._ball.bumbPlatform(this._platform, this._level.sounds.bump as HTMLAudioElement);
    }
  };

  run = (): void => {
    window.requestAnimationFrame(() => {
      this.update();
      this.render();
      this.run();
    });
  };

  render = (): void => {
    this._ctx.clearRect(0, 0, this._canvasWidth, this._canvasHeight);
    this._ctx.drawImage(this._level.sprites.background as HTMLImageElement, 0, 0, this._canvasWidth, this._canvasHeight);
    this._ctx.drawImage(this._level.sprites.ball as HTMLImageElement, this._ball.x, this._ball.y, this._ball.width, this._ball.height,);
    this._ctx.drawImage(this._level.sprites.platform as HTMLImageElement, this._platform.x, this._platform.y, this._platform.width, this._platform.height);
    this._ctx.drawImage(this._level.sprites.controlRight as HTMLImageElement, this._canvasWidth / 2 + 30, this._canvasHeight - 120, 90, 90);
    this._ctx.drawImage(this._level.sprites.controlLeft as HTMLImageElement, this._canvasWidth / 2 - 120, this._canvasHeight - 120, 90, 90);
    if (
      this._state.gameFinished
    ) {
      this._ctx.drawImage(this._level.sprites.replay as HTMLImageElement, (this._canvasWidth - 180) / 2, 750, 180, 60);
      this._ctx.fillStyle = '#fff';
      this._ctx.font = '52px Arial';
      this._ctx.textAlign = 'center';
      if (!this._state.blocksAmount) {
        this._ctx.fillText("There are not enough blocks for you", 960, 690);
      } else {
        this._ctx.fillText('Blocks defeated you', 960, 690);
      }
    }
    this.renderBlocks();
  };

  renderBlocks = ():void => {
    for (const block of this._blocks) {
      if (
        block.active
      ) {
        this._ctx.drawImage(this._level.sprites.block as HTMLImageElement, block.x, block.y, block.width, block.height);
      }
    }
  };

  start = (): void => {
    this.init();
    this.preload(() => {
      this.run();
      this.create();
    });
  };

  reset = (e): void => {
    if (
      e.pageX
    ) {
      const x = e.pageX - e.target.offsetLeft;
      const y = e.pageY - e.target.offsetTop;
      const proportionX = e.target.offsetWidth / e.target.width;
      const proportionY = e.target.offsetHeight / e.target.height;

      if (
        x / proportionX < this._canvasWidth / 2 - 90 ||
        x / proportionX > this._canvasWidth / 2 + 90 ||
        y / proportionY < 750 ||
        y / proportionY > 750 + 60 ||
        !this._state.gameFinished
      ) {
        return ;
      }
    } else if (
      e.keyCode !== 32 &&
      e.keyCode !== 13 ||
      !this._state.gameFinished
    ) {
      return ;
    }
    this._canvas.removeEventListener('click', this.reset);
    window.removeEventListener('keyup', this.reset);
    this._platform.x = 810;
    this._platform.dx = 0;
    this._ball.x = 930;
    this._ball.dx = 0;
    this._ball.y = 840;
    this._ball.dy = 0;
    this._blocks = [];

    this.setState({
      gameFinished: false,
      platformIsMoving: 'none',
      ballIsLaunched: false,
      blocksAmount: this._level.blocksAmount,
      forceStopLeft: false,
      forceStopRight: false
    });
    this.setEvents();
    this.create();
  };
}

const startGame = (width, height) => {
  const root = document.querySelector('#root') as HTMLElement;
  const canvas: HTMLCanvasElement = document.createElement('canvas');
  root.prepend(canvas);
  canvas.width = width;
  canvas.height = height;
  canvas.id = 'arcanoid';
  canvas.className = 'arcanoid';

  const game = new Game(
    canvas,
    canvas.width,
    canvas.height,
    'hard',
    level1
  );

  game.start();
};

window.addEventListener('load', () => {
  startGame(1920, 1080);
});
