import { BasicBlock } from "../BasicBlock/BasicBlock.component";
import "./CompositeBlock.styles.scss";

export function CompositeBlock(props) {
  const style = {
    top: props.blockState.top,
    left: props.blockState.left,
    height:
      props.blockState.basicBlockSize * props.blockState.compositeBlockSize,
    width:
      props.blockState.basicBlockSize * props.blockState.compositeBlockSize,
  };
  const offSet = props.blockState.basicBlockSize;
  const compositeBlockList = {
    compositeBlockRecipe: [
      { top: 0 * offSet, left: 0 * offSet },
      { top: 1 * offSet, left: 0 * offSet },
      { top: 2 * offSet, left: 0 * offSet },
      { top: 3 * offSet, left: 0 * offSet },
    ],
  };
  const basicBlocks = compositeBlockList.compositeBlockRecipe.map(
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
