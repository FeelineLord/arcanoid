!function(t){function e(e){for(var o,n,l=e[0],r=e[1],c=e[2],d=0,f=[];d<l.length;d++)n=l[d],Object.prototype.hasOwnProperty.call(a,n)&&a[n]&&f.push(a[n][0]),a[n]=0;for(o in r)Object.prototype.hasOwnProperty.call(r,o)&&(t[o]=r[o]);for(h&&h(e);f.length;)f.shift()();return s.push.apply(s,c||[]),i()}function i(){for(var t,e=0;e<s.length;e++){for(var i=s[e],o=!0,l=1;l<i.length;l++){var r=i[l];0!==a[r]&&(o=!1)}o&&(s.splice(e--,1),t=n(n.s=i[0]))}return t}var o={},a={0:0},s=[];function n(e){if(o[e])return o[e].exports;var i=o[e]={i:e,l:!1,exports:{}};return t[e].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=t,n.c=o,n.d=function(t,e,i){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(i,o,function(e){return t[e]}.bind(null,o));return i},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="";var l=window.webpackJsonp=window.webpackJsonp||[],r=l.push.bind(l);l.push=e,l=l.slice();for(var c=0;c<l.length;c++)e(l[c]);var h=r;s.push([122,1]),i()}({122:function(t,e,i){i(123),t.exports=i(312)},309:function(t,e,i){},312:function(t,e,i){"use strict";i.r(e);i(309);var o=i(88),a=i.n(o),s={background:i.p+"769745b9773aee44e4a44cda0aa5203d.png",ball:i.p+"0bc34a9aa1a9d0f80ec1159c30d52d0c.png",block:i.p+"66c8c36de22f744819503d33e0d81a2c.png",platform:i.p+"ee2715b1ddb0c69022142becaecf1038.png",controlRight:i.p+"35692f317a8613a3423b8972ad7f268c.png",controlLeft:i.p+"9f256ebdeb1bfdab2c85065953295fce.png",replay:i.p+"9b5fc45655fb04c67d6367b5aecc2464.png"},n=i.p+"e411f1fe6758e82fb8e3011bd489b142.mp3";function l(t,e){var i;if("undefined"==typeof Symbol||null==t[Symbol.iterator]){if(Array.isArray(t)||(i=function(t,e){if(!t)return;if("string"==typeof t)return r(t,e);var i=Object.prototype.toString.call(t).slice(8,-1);"Object"===i&&t.constructor&&(i=t.constructor.name);if("Map"===i||"Set"===i)return Array.from(t);if("Arguments"===i||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i))return r(t,e)}(t))||e&&t&&"number"==typeof t.length){i&&(t=i);var o=0,a=function(){};return{s:a,n:function(){return o>=t.length?{done:!0}:{done:!1,value:t[o++]}},e:function(t){throw t},f:a}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var s,n=!0,l=!1;return{s:function(){i=t[Symbol.iterator]()},n:function(){var t=i.next();return n=t.done,t},e:function(t){l=!0,s=t},f:function(){try{n||null==i.return||i.return()}finally{if(l)throw s}}}}function r(t,e){(null==e||e>t.length)&&(e=t.length);for(var i=0,o=new Array(e);i<e;i++)o[i]=t[i];return o}function c(t,e,i){return e in t?Object.defineProperty(t,e,{value:i,enumerable:!0,configurable:!0,writable:!0}):t[e]=i,t}var h=37,d=39,f=65,v=68,u=32,p={sprites:s,sounds:{bump:n},blocksAmount:32,blocksRows:4,platform:{x:810,y:900,width:300,height:42,velocity:0,dx:0,move:function(t,e,i){t.forceStopLeft||t.forceStopRight||void 0!==this.dx&&(this.x+=this.dx,void 0!==i&&this.x<=0?(this.x=0,i("left")):void 0!==i&&void 0!==e&&this.x+this.width>=e&&(this.x=e-this.width,i("right")))},start:function(t,e){switch(t){case"left":void 0!==this.velocity&&(this.dx=-this.velocity),e(t);break;case"right":void 0!==this.velocity&&(this.dx=this.velocity),e(t)}},stop:function(t,e,i){t===i&&(this.dx=0,e(t))},forceStop:function(){this.dx=0},getTouchOffset:function(t){return 2*(t-this.x)/this.width-1}},ball:{x:930,y:840,width:60,height:60,velocity:0,dx:0,dy:0,move:function(t,e){t.ballIsLaunched||!t.forceStopLeft?t.ballIsLaunched||!t.forceStopRight||void 0===e?void 0!==this.dx&&void 0!==this.dy&&(this.x+=this.dx,this.y-=this.dy):this.x=e-180:this.x=120},start:function(t,e){switch(t){case"left":void 0!==this.velocity&&(this.dx=-this.velocity);break;case"right":void 0!==this.velocity&&(this.dx=this.velocity);break;case"top":void 0!==this.velocity&&(this.dx=a.a.random(-this.velocity,this.velocity),this.dy=this.velocity/2),e()}},stop:function(t,e,i){t===i&&(this.dx=0,e(t))},collide:function(t){if(void 0!==this.x&&void 0!==this.dx&&void 0!==this.y&&void 0!==this.dy){var e=this.x+this.dx,i=this.y-this.dy;return e-this.dx+this.width>t.x&&e-this.dx<t.x+t.width&&i-this.dy+this.height>t.y&&i-this.dy<t.y+t.height}return!1},collideWall:function(t,e,i){if(void 0!==this.x&&void 0!==this.dx&&void 0!==this.y&&void 0!==this.dy&&void 0!==this.velocity)switch(!0){case this.x<=0:this.x=0,this.dx=this.velocity/2;break;case this.x+this.width>=t:this.x=t-this.width,this.dx=-this.velocity/2;break;case this.y<=0:this.y=0,this.dy=-this.velocity/2;break;case this.y+this.height>=e:i()}},bumbBlock:function(t,e,i){t.active&&(t.active=!1,void 0!==this.dy&&void 0!==this.dx&&(e.play(),i(),this.y+this.dy-this.height/2+5>t.y+t.height&&this.y+this.dy-this.height/2-5<t.y+t.height||this.y+this.dy+this.height+this.height/2+5>t.y&&this.y+this.dy+this.height+this.height/2-5<t.y?this.dy*=-1:this.dx*=-1))},bumbPlatform:function(t,e){t.dx&&(this.x+=t.dx);var i=this.x+this.width/2;if(void 0!==this.dy&&void 0!==this.velocity&&void 0!==t.getTouchOffset){if(this.dy>0)return;e.play(),this.dy=this.velocity/2,this.dx=this.velocity*t.getTouchOffset(i)}}},blocks:[]},_=function t(e,i,o,s,n){var r=this;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),c(this,"_canvas",void 0),c(this,"_ctx",void 0),c(this,"_canvasWidth",void 0),c(this,"_canvasHeight",void 0),c(this,"_difficulty",void 0),c(this,"_level",void 0),c(this,"_platform",void 0),c(this,"_ball",void 0),c(this,"_blocks",void 0),c(this,"_state",void 0),c(this,"setState",(function(t,e){var i=r._state;for(var o in t)t.hasOwnProperty(o)&&(i[o]=t[o]);a.a.isEqual(r._state,i)||(r._state=i),e&&e()})),c(this,"init",(function(){switch(r._difficulty){case"easy":r._platform.velocity=12,r._ball.velocity=12;break;case"medium":r._platform.velocity=18,r._ball.velocity=18;break;case"hard":r._platform.velocity=24,r._ball.velocity=24}r.setState({blocksAmount:r._level.blocksAmount}),r.setEvents()})),c(this,"handleKeyDown",(function(t){t.keyCode!==u||r._state.ballIsLaunched||void 0===r._ball.start||r._ball.start("top",(function(){r.setState({ballIsLaunched:!0})})),(t.keyCode===h&&void 0!==r._platform.start||t.keyCode===f&&void 0!==r._platform.start)&&(r._platform.start("left",(function(t){r.setState({platformIsMoving:t,forceStopRight:!1})})),void 0===r._ball.start||r._state.ballIsLaunched||r._ball.start("left",(function(){}))),(t.keyCode===d&&void 0!==r._platform.start||t.keyCode===v&&void 0!==r._platform.start)&&(r._platform.start("right",(function(t){r.setState({platformIsMoving:t,forceStopLeft:!1})})),void 0===r._ball.start||r._state.ballIsLaunched||r._ball.start("right",(function(){})))})),c(this,"handleKeyUp",(function(t){(t.keyCode===h&&void 0!==r._platform.stop||t.keyCode===f&&void 0!==r._platform.stop)&&(r._platform.stop("left",(function(t){r.setState({platformIsMoving:t,forceStopRight:!1})}),r._state.platformIsMoving),void 0===r._ball.stop||r._state.ballIsLaunched||r._ball.stop("left",(function(t){r.setState({platformIsMoving:t})}),r._state.platformIsMoving)),(t.keyCode===d&&void 0!==r._platform.stop||t.keyCode===v&&void 0!==r._platform.stop)&&(r._platform.stop("right",(function(t){r.setState({platformIsMoving:t})}),r._state.platformIsMoving),void 0===r._ball.stop||r._state.ballIsLaunched||r._ball.stop("right",(function(t){r.setState({platformIsMoving:t})}),r._state.platformIsMoving))})),c(this,"handleMouseDown",(function(t){var e=t.pageX-t.target.offsetLeft,i=t.pageY-t.target.offsetTop,o=t.target.offsetWidth/t.target.width,a=t.target.offsetHeight/t.target.height;e/o>=r._canvasWidth/2-120&&e/o<=r._canvasWidth/2-30&&i/a>=r._canvasHeight-120&&i/a<=r._canvasHeight-30&&void 0!==r._platform.start?(r._platform.start("left",(function(t){r.setState({platformIsMoving:t,forceStopRight:!1})})),void 0===r._ball.start||r._state.ballIsLaunched||r._ball.start("left",(function(){}))):e/o>=r._canvasWidth/2+30&&e/o<=r._canvasWidth/2+120&&i/a>=r._canvasHeight-120&&i/a<=r._canvasHeight-30&&void 0!==r._platform.start?(r._platform.start("right",(function(t){r.setState({platformIsMoving:t,forceStopLeft:!1})})),void 0===r._ball.start||r._state.ballIsLaunched||r._ball.start("right",(function(){}))):!r._state.ballIsLaunched&&void 0!==r._ball.start&&i/a<r._platform.y&&r._ball.start("top",(function(){r.setState({ballIsLaunched:!0})}))})),c(this,"handleMouseUp",(function(){void 0!==r._platform.stop&&"left"===r._state.platformIsMoving&&(r._platform.stop("left",(function(t){r.setState({platformIsMoving:t,forceStopRight:!1})}),r._state.platformIsMoving),void 0===r._ball.stop||r._state.ballIsLaunched||r._ball.stop("left",(function(t){r.setState({platformIsMoving:t})}),r._state.platformIsMoving)),void 0!==r._platform.stop&&"right"===r._state.platformIsMoving&&(r._platform.stop("right",(function(t){r.setState({platformIsMoving:t})}),r._state.platformIsMoving),void 0===r._ball.stop||r._state.ballIsLaunched||r._ball.stop("right",(function(t){r.setState({platformIsMoving:t})}),r._state.platformIsMoving))})),c(this,"setEvents",(function(){r._state.gameFinished?(window.removeEventListener("keydown",r.handleKeyDown),window.removeEventListener("keyup",r.handleKeyUp),window.removeEventListener("mousedown",r.handleMouseDown),window.removeEventListener("mouseup",r.handleMouseUp),void 0!==r._platform.forceStop&&r._platform.forceStop()):(window.addEventListener("keydown",r.handleKeyDown),window.addEventListener("keyup",r.handleKeyUp),window.addEventListener("mousedown",r.handleMouseDown),window.addEventListener("mouseup",r.handleMouseUp))})),c(this,"preload",(function(t){var e=0,i=Object.keys(r._level.sprites).length+Object.keys(r._level.sounds).length,o=function(){++e>=i&&t()};for(var a in r._level.sprites)if(r._level.sprites.hasOwnProperty(a)){var s=new Image;s.src=r._level.sprites[a],r._level.sprites[a]=s,r._level.sprites[a].addEventListener("load",o)}for(var n in r._level.sounds)if(r._level.sounds.hasOwnProperty(n)){var l=new Audio;l.src=r._level.sounds[n],r._level.sounds[n]=l,r._level.sounds[n].addEventListener("canplaythrough",o,{once:!0})}})),c(this,"create",(function(){var t=r._level.blocksRows,e=r._level.blocksAmount/t;Number.isInteger(e)||(t+=1,e=Math.floor(r._level.blocksAmount/t)+r._level.blocksAmount%t);for(var i=0;i<t;i++)for(var o=0;o<e;o++)r._blocks.push({x:195*o+195,y:75*i+105,width:180,height:60,active:!0})})),c(this,"update",(function(){void 0!==r._platform.move&&r._platform.move(r._state,r._canvasWidth,(function(t){switch(t){case"left":r.setState({forceStopLeft:!0});break;case"right":r.setState({forceStopRight:!0})}})),void 0!==r._ball.move&&r._ball.move(r._state,r._canvasWidth),r.collideBlock(),r.collidePlatform(),void 0!==r._ball.collideWall&&r._ball.collideWall(r._canvasWidth,r._canvasHeight,(function(){r.setState({gameFinished:!0},(function(){r.setEvents(),setTimeout((function(){r._ctx.clearRect(0,0,r._canvasWidth,r._canvasHeight)}),300)}))})),r._state.blocksAmount&&!r._state.gameFinished||r.setState({gameFinished:!0},(function(){r._canvas.addEventListener("click",r.reset),window.addEventListener("keyup",r.reset)}))})),c(this,"collideBlock",(function(){var t,e=l(r._blocks);try{for(e.s();!(t=e.n()).done;){var i=t.value;void 0!==r._ball.collide&&r._ball.collide(i)&&void 0!==r._ball.bumbBlock&&r._ball.bumbBlock(i,r._level.sounds.bump,(function(){var t=r._state.blocksAmount;r.setState({blocksAmount:t-1})}))}}catch(t){e.e(t)}finally{e.f()}})),c(this,"collidePlatform",(function(){void 0!==r._ball.collide&&r._ball.collide(r._platform)&&r._ball.bumbPlatform&&r._ball.bumbPlatform(r._platform,r._level.sounds.bump)})),c(this,"run",(function(){window.requestAnimationFrame((function(){r.update(),r.render(),r.run()}))})),c(this,"render",(function(){r._ctx.clearRect(0,0,r._canvasWidth,r._canvasHeight),r._ctx.drawImage(r._level.sprites.background,0,0,r._canvasWidth,r._canvasHeight),r._ctx.drawImage(r._level.sprites.ball,r._ball.x,r._ball.y,r._ball.width,r._ball.height),r._ctx.drawImage(r._level.sprites.platform,r._platform.x,r._platform.y,r._platform.width,r._platform.height),r._ctx.drawImage(r._level.sprites.controlRight,r._canvasWidth/2+30,r._canvasHeight-120,90,90),r._ctx.drawImage(r._level.sprites.controlLeft,r._canvasWidth/2-120,r._canvasHeight-120,90,90),r._state.gameFinished&&(r._ctx.drawImage(r._level.sprites.replay,(r._canvasWidth-180)/2,750,180,60),r._ctx.fillStyle="#fff",r._ctx.font="52px Arial",r._ctx.textAlign="center",r._state.blocksAmount?r._ctx.fillText("Blocks defeated you",960,690):r._ctx.fillText("There are not enough blocks for you",960,690)),r.renderBlocks()})),c(this,"renderBlocks",(function(){var t,e=l(r._blocks);try{for(e.s();!(t=e.n()).done;){var i=t.value;i.active&&r._ctx.drawImage(r._level.sprites.block,i.x,i.y,i.width,i.height)}}catch(t){e.e(t)}finally{e.f()}})),c(this,"start",(function(){r.init(),r.preload((function(){r.run(),r.create()}))})),c(this,"reset",(function(t){if(t.pageX){var e=t.pageX-t.target.offsetLeft,i=t.pageY-t.target.offsetTop,o=t.target.offsetWidth/t.target.width,a=t.target.offsetHeight/t.target.height;if(e/o<r._canvasWidth/2-90||e/o>r._canvasWidth/2+90||i/a<750||i/a>810||!r._state.gameFinished)return}else if(32!==t.keyCode&&13!==t.keyCode||!r._state.gameFinished)return;r._canvas.removeEventListener("click",r.reset),window.removeEventListener("keyup",r.reset),r._platform.x=810,r._platform.dx=0,r._ball.x=930,r._ball.dx=0,r._ball.y=840,r._ball.dy=0,r._blocks=[],r.setState({gameFinished:!1,platformIsMoving:"none",ballIsLaunched:!1,blocksAmount:r._level.blocksAmount,forceStopLeft:!1,forceStopRight:!1}),r.setEvents(),r.create()})),this._canvas=e,this._ctx=this._canvas.getContext("2d"),this._canvasWidth=i,this._canvasHeight=o,this._difficulty=s,this._level=n,this._platform=n.platform,this._ball=n.ball,this._blocks=n.blocks,this._state={gameFinished:!1,platformIsMoving:"none",ballIsLaunched:!1,blocksAmount:0,forceStopLeft:!1,forceStopRight:!1}};window.addEventListener("load",(function(){var t,e,i,o;t=1920,e=1080,i=document.querySelector("#root"),o=document.createElement("canvas"),i.prepend(o),o.width=t,o.height=e,o.id="arcanoid",o.className="arcanoid",new _(o,o.width,o.height,"hard",p).start()}))}});