import { ControlButton } from "../ControlButton/ControlButton.component";
import "./ControlsField.styles.scss";

export function ControlsField(props) {
  const handleOnPointerDown = (e) => {
    e.preventDefault();
    console.log("!!!");
  };
  return (
    <form>
      <div className="controlsField">
        <ControlButton
          className="controlButton"
          onpointerdown={handleOnPointerDown}
          top="-10vh"
          left="15vw"
          id="rotate"
        >
          rotate
        </ControlButton>
        <ControlButton
          className="controlButton"
          onpointerdown={handleOnPointerDown}
          top="0vh"
          left="-10vw"
          id="left"
        >
          left
        </ControlButton>
        <ControlButton
          className="controlButton"
          onpointerdown={handleOnPointerDown}
          top="0vh"
          left="10vw"
          id="right"
        >
          right
        </ControlButton>
        <ControlButton
          className="controlButton"
          onpointerdown={handleOnPointerDown}
          top="10vh"
          left="-15vw"
          id="down"
        >
          down
        </ControlButton>
      </div>
    </form>
  );
}
