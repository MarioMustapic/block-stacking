import { ControlButton } from "../ControlButton/ControlButton.component";
import "./ControlsField.styles.scss";

export function ControlsField(props) {
  return (
    <form>
      <div
        className="controlsField"
        style={{
          top: `${props.defBlockState.basicBlockSize * 20}px`,
          height: `${props.defBlockState.basicBlockSize * 12}px`,
          width: `${props.defBlockState.basicBlockSize * 16}px`,
        }}
      >
        <div>
          <ControlButton
            className="controlButton"
            backgroundColor="blue"
            id="left"
            defBlockState={props.defBlockState}
            handleOnPointerDown={props.handleOnPointerDown}
          >
            left
          </ControlButton>
        </div>
        <div className="leftandright">
          <ControlButton
            className="controlButton"
            id="rotate"
            backgroundColor="blue"
            defBlockState={props.defBlockState}
            handleOnPointerDown={props.handleOnPointerDown}
          >
            rotate
          </ControlButton>
          <div className="center">
            <ControlButton
              className="controlButton"
              backgroundColor="none"
              defBlockState={props.defBlockState}
            ></ControlButton>
          </div>
          <ControlButton
            className="controlButton"
            backgroundColor="blue"
            id="down"
            defBlockState={props.defBlockState}
            handleOnPointerDown={props.handleOnPointerDown}
          >
            down
          </ControlButton>
        </div>
        <div>
          <ControlButton
            className="controlButton"
            backgroundColor="blue"
            id="right"
            defBlockState={props.defBlockState}
            handleOnPointerDown={props.handleOnPointerDown}
          >
            right
          </ControlButton>
        </div>
      </div>
    </form>
  );
}
