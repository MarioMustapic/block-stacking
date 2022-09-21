import { useEffect } from "react";
import { BasicBlock } from "../BasicBlock/BasicBlock.component";
import "./CompositeBlock.styles.scss";

export function CompositeBlock(props) {
  const toAppend = props.blockState.to.append;
  useEffect(() => {
    if (toAppend === false) return;
    const playingField = document.querySelector(".playingField");
    const basicBlocks = document.querySelectorAll(".playingField .basicBlock");
    console.log(basicBlocks);
    playingField.append(...basicBlocks);
    props.blockState.to.append = false;
    return () => (props.blockState.blockType = Math.floor(Math.random() * 7));
  }, [props.blockState, toAppend]);
  const style = {
    top: props.blockState.top,
    left: props.blockState.left,
    height:
      props.blockState.basicBlockSize * props.blockState.compositeBlockSize,
    width:
      props.blockState.basicBlockSize * props.blockState.compositeBlockSize,
    transform: `rotate(${props.blockState.rotation}deg)`,
  };
  const size = props.blockState.basicBlockSize;
  const compositeBlockList = [
    [[1, 1, 1, 1], [0, 1, 2, 3], "I-block"],
    [[1, 2, 1, 2], [0, 0, 1, 1], "O-block"],
    [[1, 1, 1, 2], [0, 1, 2, 2], "L-Block"],
    [[1, 1, 1, 0], [0, 1, 2, 2], "J-block"],
    [[1, 0, 1, 2], [0, 1, 1, 1], "T-block"],
    [[0, 1, 1, 2], [0, 0, 1, 1], "Z-block"],
    [[2, 1, 1, 0], [0, 0, 1, 1], "S-block"],
  ];
  const offSetX = compositeBlockList[props.blockState.blockType][0];
  const offSetY = compositeBlockList[props.blockState.blockType][1];
  const compositeBlockRecipe = {
    recipe: [
      {
        top: size * offSetY[0],
        left:
          size *
          (offSetX[0] + Math.floor(props.blockState.playingFieldWidth / 2)),
      },
      {
        top: size * offSetY[1],
        left:
          size *
          (offSetX[1] + Math.floor(props.blockState.playingFieldWidth / 2)),
      },
      {
        top: size * offSetY[2],
        left:
          size *
          (offSetX[2] + Math.floor(props.blockState.playingFieldWidth / 2)),
      },
      {
        top: size * offSetY[3],
        left:
          size *
          (offSetX[3] + Math.floor(props.blockState.playingFieldWidth / 2)),
      },
    ],
  };
  const basicBlocks = compositeBlockRecipe.recipe.map(
    (compositeBlock, index) => (
      <BasicBlock
        key={index}
        indexkey={index}
        blockState={props.blockState}
        compositeBlock={compositeBlock}
      />
    )
  );
  return (
    <div className="compositeBlockCentering">
      <div
        className="compositeBlock"
        style={style}
        onClick={props.handleClick}
        onKeyDown={props.onKeyDown}
      >
        {basicBlocks}
      </div>
    </div>
  );
}
