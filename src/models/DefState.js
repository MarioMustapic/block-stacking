export class DefState {
  constructor({
    top,
    left,
    rotation,
    isInColision,
    toAppend,
    toRenderCompositeBlock,
    toRotate,
    playingFieldWidth,
    playingFieldHeight,
    text,
    gravityTimer,
    basicBlockSize,
    compositeBlockSize,
    backgroundColor,
    blockType,
    gameOver,
    mode,
  }) {
    this.top = top || 0;
    this.left = left || 0;
    this.rotation = rotation || 0;
    this.isInColision = isInColision || {
      down: [false, false, false, false],
      right: [false, false, false, false],
      left: [false, false, false, false],
      rotation: [false, false, false, false],
    };
    this.toAppend = toAppend || false;
    this.toRenderCompositeBlock = toRenderCompositeBlock || true;
    this.toRotate = toRotate || true;
    this.playingFieldWidth = playingFieldWidth || 10;
    this.playingFieldHeight = playingFieldHeight || 20;
    this.text = text || "";
    this.gravityTimer = gravityTimer || 700;
    this.basicBlockSize = basicBlockSize || 25;
    this.compositeBlockSize = compositeBlockSize || 5;
    this.backgroundColor = backgroundColor || "";
    this.blockType = blockType || Math.floor(Math.random() * 7);
    this.gameOver = gameOver || false;
    this.mode = mode || "desktop";
  }
  static fromObject() {
    const defState = new DefState({
      top: 0, //def value for starting Y-axis position(top)
      left: 0, //def value for starting X-axis position(centered)
      rotation: 0, //def value for angle of composite block
      //def value for colision logic
      isInColision: {
        down: [false, false, false, false],
        right: [false, false, false, false],
        left: [false, false, false, false],
        rotation: [false, false, false, false],
      },
      toAppend: false,
      toRenderCompositeBlock: true,
      toRotate: true,
      playingFieldWidth: 10,
      playingFieldHeight: 20,
      text: "", //block text (atm no use)
      gravityTimer: 700, //timer for downward movment over time
      basicBlockSize: 25, //size in pixels
      compositeBlockSize: 5, //max height or width in number of basicBlocks
      backgroundColor: "", //def background color
      blockType: Math.floor(Math.random() * 7), //block randomizer
      gameOver: false, //if true, start over
      mode: "desktop", //def display mode    });
    });

    return defState;
  }
}
