import { useEffect } from "react";
import { BasicBlock } from "../BasicBlock/BasicBlock.component";
import "./CompositeBlock.styles.scss";

export function CompositeBlock(props) {
  useEffect(() => {
    return () => (props.blockState.blockType = Math.floor(Math.random() * 7));
  }, [props.blockState]);

  const style = {
    top: props.blockState.top,
    left: props.blockState.left,
    height:
      props.blockState.basicBlockSize * props.blockState.compositeBlockSize,
    width:
      props.blockState.basicBlockSize * props.blockState.compositeBlockSize,
  };
  const size = props.blockState.basicBlockSize;
  const compositeBlockList = [
    [[1, 1, 1, 1], [0, 1, 2, 3], "I-block"],
    [[1, 2, 1, 2], [0, 0, 1, 1], "O-block"],
    [[1, 1, 1, 2], [0, 1, 2, 2], "L-Block"],
    [[2, 2, 2, 1], [0, 1, 2, 2], "J-block"],
    [[1, 0, 1, 2], [0, 1, 1, 1], "T-block"],
    [[0, 1, 1, 2], [0, 0, 1, 1], "Z-block"],
    [[2, 1, 1, 0], [0, 0, 1, 1], "S-block"],
  ];
  const offSetX = compositeBlockList[props.blockState.blockType][0];
  const offSetY = compositeBlockList[props.blockState.blockType][1];
  const compositeBlockRecipe = {
    recipe: [
      { top: size * offSetY[0], left: size * offSetX[0] },
      { top: size * offSetY[1], left: size * offSetX[1] },
      { top: size * offSetY[2], left: size * offSetX[2] },
      { top: size * offSetY[3], left: size * offSetX[3] },
    ],
  };
  const basicBlocks = compositeBlockRecipe.recipe.map(
    (compositeBlock, index) => (
      <BasicBlock
        key={index}
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
        onClick={props.onClick}
        onKeyDown={props.onKeyDown}
      >
        {basicBlocks}
      </div>
    </div>
  );
}
