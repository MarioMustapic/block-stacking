import { ControlButton } from "../ControlButton/ControlButton.component";
import "./ControlsField.styles.scss";

export function ControlsField(props) {
  return (
    <form>
      <div className="controlsField">
        <div>
          <ControlButton
            className="controlButton"
            id="left"
            handleOnPointerDown={props.handleOnPointerDown}
          >
            left
          </ControlButton>
        </div>
        <div className="leftandright">
          <ControlButton
            className="controlButton"
            id="rotate"
            handleOnPointerDown={props.handleOnPointerDown}
          >
            rotate
          </ControlButton>
          <div className="center"></div>
          <ControlButton
            className="controlButton"
            id="down"
            handleOnPointerDown={props.handleOnPointerDown}
          >
            down
          </ControlButton>
        </div>
        <div>
          <ControlButton
            className="controlButton"
            id="right"
            handleOnPointerDown={props.handleOnPointerDown}
          >
            right
          </ControlButton>
        </div>
      </div>
    </form>
  );
}
