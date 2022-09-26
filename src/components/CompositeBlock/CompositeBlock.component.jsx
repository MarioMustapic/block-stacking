import { useCallback, useState } from "react";
import { useEffect } from "react";
import { BasicBlock } from "../BasicBlock/BasicBlock.component";
import "./CompositeBlock.styles.scss";

export function CompositeBlock(props) {
  const [compositeBlockState, setCompositeBlockState] = useState(
    props.defBlockState
  );
  console.log(compositeBlockState);

  const moveRight = () => {
    setCompositeBlockState(() => ({
      ...compositeBlockState,
      [compositeBlockState.y]: compositeBlockState.left + 1,
    }));
  };
  const moveLeft = () => {
    setCompositeBlockState(() => ({
      ...compositeBlockState,
      [compositeBlockState.y]: compositeBlockState.left - 1,
    }));
  };
  const moveDown = useCallback(() => {
    if (compositeBlockState.isInColision.down === true) {
      compositeBlockState.to.append = true; /// move blocks from composite to terrain
      compositeBlockState.to.destroy = true; /// destroy old, now empty, composite block   ***triggers***
      compositeBlockState.to.spawn = true; /// spawn new composite block
      return;
    }
    setCompositeBlockState(() => ({
      ...compositeBlockState,
      [compositeBlockState.x]: compositeBlockState.top + 1,
    }));
  }, [compositeBlockState]);

  useEffect(() => {
    const timer = setInterval(() => {
      moveDown();
    }, compositeBlockState.gravityTimer);
    return () => clearTimeout(timer);
  }, [moveDown, compositeBlockState.gravityTimer]);

  const handleKeyDown = (e) => {
    e.preventDefault();
    if (e.code === "ArrowDown") return moveDown();
    else if (
      e.code === "ArrowRight" &&
      compositeBlockState.isInColision.right === false
    )
      return moveRight();
    else if (
      e.code === "ArrowLeft" &&
      compositeBlockState.isInColision.left === false
    )
      return moveLeft();
    else if (
      e.code === "ArrowUp" &&
      compositeBlockState.isInColision.rotation === false
    ) {
      return setCompositeBlockState((compositeBlockState) => ({
        ...compositeBlockState,
        [compositeBlockState.z]: compositeBlockState.rotation + 90,
      }));
    }
  };

  const toAppend = compositeBlockState.to.append;
  useEffect(() => {
    if (toAppend === false) return;
    const playingField = document.querySelector(".playingField");
    const basicBlocks = document.querySelectorAll(".playingField .basicBlock");
    for (let i = 0; i < basicBlocks.length; i++) {
      basicBlocks[i].style.height = 50;
    }
    playingField.append(...basicBlocks);
    compositeBlockState.to.append = false;
    return () =>
      (compositeBlockState.blockType = Math.floor(Math.random() * 7));
  }, [compositeBlockState, toAppend]);

  const style = {
    top: compositeBlockState.top * compositeBlockState.basicBlockSize,
    left: compositeBlockState.left * compositeBlockState.basicBlockSize,
    height:
      compositeBlockState.basicBlockSize *
      compositeBlockState.compositeBlockSize,
    width:
      compositeBlockState.basicBlockSize *
      compositeBlockState.compositeBlockSize,
    transform: `rotate(${compositeBlockState.rotation}deg)`,
  };

  const compositeBlockList = [
    [[1, 1, 1, 1], [0, 1, 2, 3], "I-block"],
    [[1, 2, 1, 2], [0, 0, 1, 1], "O-block"],
    [[1, 1, 1, 2], [0, 1, 2, 2], "L-Block"],
    [[1, 1, 1, 0], [0, 1, 2, 2], "J-block"],
    [[1, 0, 1, 2], [0, 1, 1, 1], "T-block"],
    [[0, 1, 1, 2], [0, 0, 1, 1], "Z-block"],
    [[2, 1, 1, 0], [0, 0, 1, 1], "S-block"],
  ];
  const offSetX = compositeBlockList[props.defBlockState.blockType][0];
  const offSetY = compositeBlockList[props.defBlockState.blockType][1];
  const compositeBlockRecipe = {
    recipe: [
      {
        top: offSetY[0],
        left: offSetX[0],
      },
      {
        top: offSetY[1],
        left: offSetX[1],
      },
      {
        top: offSetY[2],
        left: offSetX[2],
      },
      {
        top: offSetY[3],
        left: offSetX[3],
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
        compositeBlockState={compositeBlockState}
      />
    )
  );

  return (
    <div className="compositeBlockCentering">
      <div
        className="compositeBlock"
        style={style}
        onKeyDown={handleKeyDown}
        tabIndex={0}
      >
        {basicBlocks}
      </div>
    </div>
  );
}
