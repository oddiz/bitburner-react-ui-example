import { Switch } from "/ui-example/components/Switch";
import { NS } from "typings/Bitburner";

const cheatyWindow = eval("window") as Window & typeof globalThis;
const React = cheatyWindow.React;
const { useState } = React;

export const ToggleSection = ({ ns }: { ns: NS }) => {
    const [hackActive, setHackActive] = useState(false);
    const [workActive, setWorkActive] = useState(true);
    const [sleepActive, setSleepActive] = useState(false);
    const [repeatActive, setRepeatActive] = useState(true);

    return (
        <div
            style={{
                width: "100px",
                display: "flex",
                flexDirection: "column",

                margin: "4px 0px",
                padding: "2px",
                textAlign: "center",
            }}
        >
            <h4 style={{ marginBottom: "5px" }}>Switches</h4>
            <Switch
                title="Hack"
                onClickHandler={() => {
                    setHackActive(!hackActive);
                }}
                active={hackActive}
            />
            <Switch
                title="Work"
                onClickHandler={() => {
                    setWorkActive(!workActive);
                }}
                active={workActive}
            />
            <Switch
                title="Sleep"
                onClickHandler={() => {
                    setSleepActive(!sleepActive);
                }}
                active={sleepActive}
            />
            <Switch
                title="Sleep"
                onClickHandler={() => {
                    setRepeatActive(!repeatActive);
                }}
                active={repeatActive}
            />
        </div>
    );
};
