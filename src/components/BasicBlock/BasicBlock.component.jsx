import "./BasicBlock.styles.scss";

export function BasicBlock (props) {
    const style = {
        backgroundColor: props.backgroundColor,
    };

    return (
        <div className="basicBlock">{props.text}</div>
    );
}