import { Switch } from "../Switch";
import { NS } from "typings/Bitburner";

const cheatyWindow = eval("window") as Window & typeof globalThis;
const React = cheatyWindow.React;
const { useState } = React;

export const ToggleSection = ({ ns }: { ns: NS }) => {
    const [nodeMaintActive, setNodeMaintActive] = useState(false);
    const [remoteMaintActive, setRemoteMaintActive] = useState(false);

    const [gangActive, setGangActive] = useState(false);

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
                title="Node Maint."
                onClickHandler={() => {
                    setNodeMaintActive(!nodeMaintActive);
                }}
                active={nodeMaintActive}
            />
            <Switch
                title="Remote Maint."
                onClickHandler={() => {
                    setRemoteMaintActive(!remoteMaintActive);
                }}
                active={remoteMaintActive}
            />
            <Switch
                title="Gang"
                onClickHandler={() => {
                    setGangActive(!gangActive);
                }}
                active={gangActive}
            />
        </div>
    );
};
