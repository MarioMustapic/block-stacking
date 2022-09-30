import { useCallback, useState } from "react";
import { useEffect } from "react";
import { BasicBlock } from "../BasicBlock/BasicBlock.component";
import "./CompositeBlock.styles.scss";

export function CompositeBlock(props) {
  const [compositeBlockState, setCompositeBlockState] = useState(
    props.defBlockState
  );

  useEffect(() => {
    //set focus on composite block so it can get keyboard inputs
    const compositeBlock = document.querySelector(".compositeBlock");
    const playingField = document.querySelector(".playingField");
    compositeBlock.focus();
    playingField.classList.add("focus");
    compositeBlock.addEventListener("focusout", () =>
      playingField.classList.remove("focus")
    );
  }, []);

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
    const collision = compositeBlockState.isInColision.down;
    let isCollisionTrue = false;
    isCollisionTrue =
      collision[0] === true || //cheking if any block is in colision down
      collision[1] === true ||
      collision[2] === true ||
      collision[3] === true;

    if (isCollisionTrue === true) {
      // move blocks from composite to terrain
      setCompositeBlockState(() => ({
        ...compositeBlockState,
        toAppend: true,
      }));
      return;
    }
    setCompositeBlockState(() => ({
      ...compositeBlockState,
      [compositeBlockState.x]: compositeBlockState.top + 1,
    }));
  }, [compositeBlockState]);
  useEffect(() => {
    if (props.gravityTick !== 0) moveDown();
  }, [props.gravityTick]);

  const handleKeyDown = (e) => {
    e.preventDefault();
    const collisionLeft = compositeBlockState.isInColision.left;
    let isCollisionLeftTrue = false;
    isCollisionLeftTrue =
      collisionLeft[0] === true || //cheking if any block is in colision left
      collisionLeft[1] === true ||
      collisionLeft[2] === true ||
      collisionLeft[3] === true;
    const collisionRight = compositeBlockState.isInColision.right;
    let isCollisionRightTrue = false;
    isCollisionRightTrue =
      collisionRight[0] === true || //cheking if any block is in colision right
      collisionRight[1] === true ||
      collisionRight[2] === true ||
      collisionRight[3] === true;
    if (e.code === "ArrowDown") return moveDown();
    else if (e.code === "ArrowRight" && isCollisionRightTrue === false)
      return moveRight();
    else if (e.code === "ArrowLeft" && isCollisionLeftTrue === false)
      return moveLeft();
    // else if (
    //   e.code === "ArrowUp" // &&
    //   // compositeBlockState.isInColision.rotation === false
    // ) {
    //   return setCompositeBlockState((compositeBlockState) => ({
    //     ...compositeBlockState,
    //     [compositeBlockState.z]: compositeBlockState.rotation + 90,
    //   }));
    // }
  };

  const toAppend = compositeBlockState.toAppend;

  useEffect(() => {
    if (toAppend === false) return;
    const playingField = document.querySelector(".playingField");
    const basicBlocks = document.querySelectorAll(
      ".compositeBlock .basicBlock"
    );

    playingField.append(...basicBlocks);
    setCompositeBlockState(() => ({
      ...compositeBlockState,
      toAppend: false,
    }));
    compositeBlockState.toAppend = false;
    props.setDefBlockState(() => ({
      ...props.defBlockState,
      toRenderCompositeBlock: false,
    })); /// destroy old, now empty, composite block
  }, [compositeBlockState, props, toAppend]);

  const compositeBlockList = [
    [[1, 1, 1, 1], [0, 1, 2, 3], "red", "I-block"],
    [[1, 2, 1, 2], [0, 0, 1, 1], "yellow", "O-block"],
    [[1, 1, 1, 2], [0, 1, 2, 2], "blue", "L-Block"],
    [[1, 1, 1, 0], [0, 1, 2, 2], "orange", "J-block"],
    [[1, 0, 1, 2], [0, 1, 1, 1], "green", "T-block"],
    [[0, 1, 1, 2], [0, 0, 1, 1], "teal", "Z-block"],
    [[2, 1, 1, 0], [0, 0, 1, 1], "pink", "S-block"],
  ];
  const offSetX = compositeBlockList[props.defBlockState.blockType][0];
  const offSetY = compositeBlockList[props.defBlockState.blockType][1];
  const blockColor = compositeBlockList[props.defBlockState.blockType][2];
  const compositeBlockRecipe = {
    recipe: [
      {
        top: offSetY[0],
        left: offSetX[0],
        backgroundColor: blockColor,
      },
      {
        top: offSetY[1],
        left: offSetX[1],
        backgroundColor: blockColor,
      },
      {
        top: offSetY[2],
        left: offSetX[2],
        backgroundColor: blockColor,
      },
      {
        top: offSetY[3],
        left: offSetX[3],
        backgroundColor: blockColor,
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
        setCompositeBlockState={setCompositeBlockState}
        playingFieldBlocksCords={props.playingFieldBlocksCords}
        updatePlayingFieldBlocksCords={props.updatePlayingFieldBlocksCords}
      />
    )
  );

  const style = {
    top: 0,
    left: 0,
    height:
      compositeBlockState.basicBlockSize *
      compositeBlockState.compositeBlockSize,
    width:
      compositeBlockState.basicBlockSize *
      compositeBlockState.compositeBlockSize,
  };

  return (
    <div
      className="compositeBlock"
      style={style}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {basicBlocks}
    </div>
  );
}
