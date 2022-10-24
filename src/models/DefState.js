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
    this.top = top;
    this.left = left;
    this.rotation = rotation;
    this.isInColision = isInColision;
    this.toAppend = toAppend;
    this.toRenderCompositeBlock = toRenderCompositeBlock;
    this.toRotate = toRotate;
    this.playingFieldWidth = playingFieldWidth;
    this.playingFieldHeight = playingFieldHeight;
    this.text = text;
    this.gravityTimer = gravityTimer;
    this.basicBlockSize = basicBlockSize;
    this.compositeBlockSize = compositeBlockSize;
    this.backgroundColor = backgroundColor;
    this.blockType = blockType;
    this.gameOver = gameOver;
    this.mode = mode;
  }
  static fromObject(dataObject) {
    const defState = new DefState({
        top: 0,                       //def value for starting Y-axis position(top)
        left: 0,                      //def value for starting X-axis position(centered)
        rotation: 0,                  //def value for angle of composite block
        isInColision:                 //def value for colision logic
          {
            down:[false,false,false,false,],
            right:[false,false,false,false,],
            left:[false,false,false,false,],
            rotation:[false,false,false,false,],
          },
        toAppend: false,
        toRenderCompositeBlock: true,
        toRotate:true,
        playingFieldWidth: 10,
        playingFieldHeight: 20,
        text: "",                     //block text (atm no use)
        gravityTimer: 700,         //timer for downward movment over time
        basicBlockSize: 25,           //size in pixels
        compositeBlockSize: 5,        //max height or width in number of basicBlocks
        backgroundColor: "",          //def background color
        blockType: Math.floor(Math.random() * 7),  //block randomizer
        gameOver: false,              //if true, start over
        mode: "desktop",              //def display mode    });
        });

    return defState;
  }
}
