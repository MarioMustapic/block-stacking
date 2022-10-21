import { ControlButton } from "../ControlButton/ControlButton.component";
import "./ControlsField.styles.scss";

export function ControlsField(props) {
  return (
    <form>
      <div
        className="controlsField"
        style={{
          height: `${props.defBlockState.basicBlockSize * 8}px`,
          width: `${props.defBlockState.basicBlockSize * 13}px`,
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
