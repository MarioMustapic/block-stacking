import { useCallback, useState } from "react";
import { useEffect } from "react";
import { BasicBlock } from "../BasicBlock/BasicBlock.component";
import { ControlsField } from "../ControlsField/ControlsField.component";
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
    setCompositeBlockState((state) => ({
      ...state,
      left: compositeBlockState.left + 1,
    }));
  };
  const moveLeft = () => {
    setCompositeBlockState((state) => ({
      ...state,
      left: compositeBlockState.left - 1,
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
      setCompositeBlockState((state) => ({
        ...state,
        toAppend: true,
      }));
      return;
    }
    setCompositeBlockState((state) => ({
      ...state,
      top: compositeBlockState.top + 1,
    }));
  }, [compositeBlockState.top, compositeBlockState.isInColision.down]);
  useEffect(() => {
    if (props.gravityTick !== 0) {
      let abc = document.querySelector(".compositeBlock");
      abc.dispatchEvent(new Event("dropDown"));
    }
  }, [props.gravityTick]);
  useEffect(() => {
    const compositeBlock = document.querySelector(".compositeBlock");
    compositeBlock.addEventListener("dropDown", () => {
      moveDown();
    });
  });
  const rotate = () => {
    setCompositeBlockState((state) => ({
      ...state,
      rotation: compositeBlockState.rotation + 1,
    }));
  };
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
    const collisionRotation = compositeBlockState.isInColision.rotation;
    let isCollisionRotationTrue = false;
    isCollisionRotationTrue =
      collisionRotation[0] === true || //cheking if any block is in rotation colision
      collisionRotation[1] === true ||
      collisionRotation[2] === true ||
      collisionRotation[3] === true;
    if (isCollisionRotationTrue === true)
      setCompositeBlockState((state) => ({
        ...state,
        toRotate: false,
      }));
    else if (isCollisionRotationTrue === false)
      setCompositeBlockState((state) => ({
        ...state,
        toRotate: true,
      }));
    if (e.code === "ArrowDown") moveDown();
    if (e.code === "ArrowRight" && isCollisionRightTrue === false) moveRight();
    if (e.code === "ArrowLeft" && isCollisionLeftTrue === false) moveLeft();
    if (e.code === "ArrowUp" && isCollisionRotationTrue === false) {
      rotate();
    }
  };

  const handleOnPointerDown = (e) => {
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
    const collisionRotation = compositeBlockState.isInColision.rotation;
    let isCollisionRotationTrue = false;
    isCollisionRotationTrue =
      collisionRotation[0] === true || //cheking if any block is in rotation colision
      collisionRotation[1] === true ||
      collisionRotation[2] === true ||
      collisionRotation[3] === true;
    if (isCollisionRotationTrue === true)
      setCompositeBlockState((state) => ({
        ...state,
        toRotate: false,
      }));
    else if (isCollisionRotationTrue === false)
      setCompositeBlockState((state) => ({
        ...state,
        toRotate: true,
      }));
    if (e.target.id === "down") return moveDown();
    else if (e.target.id === "right" && isCollisionRightTrue === false)
      return moveRight();
    else if (e.target.id === "left" && isCollisionLeftTrue === false)
      return moveLeft();
    else if (e.target.id === "rotate" && isCollisionRotationTrue === false) {
      return rotate();
    }
  };

  useEffect(() => {
    const toAppend = compositeBlockState.toAppend;
    if (toAppend === false) return;
    setCompositeBlockState((state) => ({
      ...state,
      toAppend: false,
    }));
    compositeBlockState.toAppend = false;
    props.setDefBlockState((state) => ({
      ...state,
      toRenderCompositeBlock: false,
    })); /// destroy old, now empty, composite block
  }, [compositeBlockState, props]);

  const compositeBlockList = [
    [[1, 1, 1, 1], [0, 1, 2, 3], "red", "evenLength", "I-block"],
    [[1, 2, 1, 2], [0, 0, 1, 1], "yellow", "evenLength", "O-block"],
    [[1, 1, 1, 2], [1, 0, 2, 2], "blue", "unEvenLength", "L-Block"],
    [[1, 1, 1, 0], [1, 0, 2, 2], "orange", "unEvenLength", "J-block"],
    [[1, 0, 1, 2], [1, 1, 0, 1], "green", "unEvenLength", "T-block"],
    [[1, 1, 0, 2], [1, 0, 0, 1], "teal", "unEvenLength", "Z-block"],
    [[1, 1, 2, 0], [1, 0, 0, 1], "pink", "unEvenLength", "S-block"],
  ];
  const offsetX = compositeBlockList[props.defBlockState.blockType.current][0];
  const offsetY = compositeBlockList[props.defBlockState.blockType.current][1];
  const blockColor =
    compositeBlockList[props.defBlockState.blockType.current][2];
  const length = compositeBlockList[props.defBlockState.blockType.current][3];
  const name = compositeBlockList[props.defBlockState.blockType.current][4];
  const compositeBlockRecipe = {
    recipe: [
      {
        y: offsetY[0],
        x: offsetX[0],
        blockColor,
        length,
        name,
      },
      {
        y: offsetY[1],
        x: offsetX[1],
        blockColor,
        length,
        name,
      },
      {
        y: offsetY[2],
        x: offsetX[2],
        blockColor,
        length,
        name,
      },
      {
        y: offsetY[3],
        x: offsetX[3],
        blockColor,
        length,
        name,
      },
    ],
  };
  const basicBlocks = compositeBlockRecipe.recipe.map(
    (compositeBlock, index) => (
      <BasicBlock
        key={index}
        indexkey={index}
        defBlockState={props.defBlockState}
        setDefBlockState={props.setDefBlockState}
        compositeBlock={compositeBlock}
        compositeBlockState={compositeBlockState}
        setCompositeBlockState={setCompositeBlockState}
        playingFieldBlocksCords={props.playingFieldBlocksCords}
        updatePlayingFieldBlocksCords={props.updatePlayingFieldBlocksCords}
        rowsToCheck={props.rowsToCheck}
        setRowsToCheck={props.setRowsToCheck}
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
    <div className="wrapper">
      {" "}
      <div
        className="compositeBlock"
        style={style}
        onKeyDown={handleKeyDown}
        tabIndex={0}
      >
        {basicBlocks}
        {props.defBlockState.mode !== "desktop" && (
          <ControlsField
            handleOnPointerDown={handleOnPointerDown}
            defBlockState={props.defBlockState}
          />
        )}
      </div>
    </div>
  );
}
