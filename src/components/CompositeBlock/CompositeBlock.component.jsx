import { useState } from "react";
import { useEffect } from "react";
import { BasicBlock } from "../BasicBlock/BasicBlock.component";
import "./CompositeBlock.styles.scss";

export function CompositeBlock(props) {
  const [compositeBlockState, setCompositeBlockState] = useState(
    props.defBlockState
  );
  console.log(compositeBlockState);

  const toAppend = compositeBlockState.to.append;
  useEffect(() => {
    if (toAppend === false) return;
    const playingField = document.querySelector(".playingField");
    const basicBlocks = document.querySelectorAll(".playingField .basicBlock");
    console.log(basicBlocks[0].style.backgroundColor);
    for (let i = 0; i < basicBlocks.length; i++) {
      basicBlocks[i].style.height = 50;
    }
    playingField.append(...basicBlocks);
    compositeBlockState.to.append = false;
    return () =>
      (compositeBlockState.blockType = Math.floor(Math.random() * 7));
  }, [compositeBlockState, toAppend]);

  const style = {
    top: compositeBlockState.top,
    left: compositeBlockState.left,
    height:
      compositeBlockState.basicBlockSize *
      compositeBlockState.compositeBlockSize,
    width:
      compositeBlockState.basicBlockSize *
      compositeBlockState.compositeBlockSize,
    transform: `rotate(${compositeBlockState.rotation}deg)`,
  };
  const size = compositeBlockState.basicBlockSize;
  const compositeBlockList = [
    [[1, 1, 1, 1], [0, 1, 2, 3], "I-block"],
    [[1, 2, 1, 2], [0, 0, 1, 1], "O-block"],
    [[1, 1, 1, 2], [0, 1, 2, 2], "L-Block"],
    [[1, 1, 1, 0], [0, 1, 2, 2], "J-block"],
    [[1, 0, 1, 2], [0, 1, 1, 1], "T-block"],
    [[0, 1, 1, 2], [0, 0, 1, 1], "Z-block"],
    [[2, 1, 1, 0], [0, 0, 1, 1], "S-block"],
  ];
  const offSetX = compositeBlockList[compositeBlockState.blockType][0];
  const offSetY = compositeBlockList[compositeBlockState.blockType][1];
  const compositeBlockRecipe = {
    recipe: [
      {
        top: size * offSetY[0],
        left:
          size *
          (offSetX[0] + Math.floor(compositeBlockState.playingFieldWidth / 2)),
      },
      {
        top: size * offSetY[1],
        left:
          size *
          (offSetX[1] + Math.floor(compositeBlockState.playingFieldWidth / 2)),
      },
      {
        top: size * offSetY[2],
        left:
          size *
          (offSetX[2] + Math.floor(compositeBlockState.playingFieldWidth / 2)),
      },
      {
        top: size * offSetY[3],
        left:
          size *
          (offSetX[3] + Math.floor(compositeBlockState.playingFieldWidth / 2)),
      },
    ],
  };
  const basicBlocks = compositeBlockRecipe.recipe.map(
    (compositeBlock, index) => (
      <BasicBlock
        key={index}
        indexkey={index}
        defBlockState={props.defBlockState}
        compositeBlock={compositeBlock}
      />
    )
  );
  return (
    <div className="compositeBlockCentering">
      <div className="compositeBlock" style={style}>
        {basicBlocks}
      </div>
    </div>
  );
}
