import { useOnHover } from "/ui/hooks/useOnHover";
const cheatyWindow = eval("window") as Window & typeof globalThis;
const React = cheatyWindow.React;

export const Switch = ({
    title,
    onClickHandler,
    active,
}: {
    title: string;
    onClickHandler: React.MouseEventHandler<HTMLDivElement>;
    active: boolean;
}) => {
    const buttonRef = React.useRef<HTMLDivElement>(null);

    const buttonHovered = useOnHover(buttonRef);

    return (
        <div
            ref={buttonRef}
            onClick={onClickHandler}
            style={{
                width: "100px",
                backgroundColor: active ? "green" : "transparent",
                border: "white solid 1px",
                color: "white",
                padding: "5px 5px",
                textAlign: "center",
                textDecoration: "none",
                display: "inline-block",
                fontSize: "12px",
                margin: "4px 2px",
                cursor: "pointer",
                borderRadius: "5px",
                fontFamily: "Arial Black",
                transition: "filter 0.1s ease-out",
                filter: buttonHovered ? "saturate(100%)" : "saturate(50%)",
            }}
        >
            {title}
        </div>
    );
};
