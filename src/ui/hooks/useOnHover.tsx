const cheatyWindow = eval("window") as Window & typeof globalThis;
const React = cheatyWindow.React;
const { useState, useEffect } = React;

// Since I couldn't manage to work a css-in-js library all styles must be added via styles property. This hook allows us to change styles based on hover without css :hover.
export const useOnHover = (ref: React.RefObject<HTMLElement>) => {
    const [hovered, setHovered] = useState(false);

    const mouseEntered = React.useCallback(() => {
        setHovered(true);
    }, [ref.current]);

    const mouseLeft = React.useCallback(() => {
        setHovered(false);
    }, [ref.current]);

    useEffect(() => {
        if (!ref.current) return;

        ref.current.addEventListener("mouseenter", mouseEntered);
        ref.current.addEventListener("mouseleave", mouseLeft);

        return () => {
            if (!ref.current) return;

            ref.current.removeEventListener("mouseenter", mouseEntered);
            ref.current.removeEventListener("mouseleave", mouseLeft);
        };
    }, [ref.current]);

    return hovered;
};
