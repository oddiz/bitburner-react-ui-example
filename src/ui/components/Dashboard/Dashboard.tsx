import { NS } from "typings/Bitburner";
import { Button } from "/ui/components/Button";
import { MonitorInput } from "/ui/components/Dashboard/MonitorInput";
import { ToggleSection } from "/ui/components/Dashboard/ToggleSection";

const cheatyWindow = eval("window") as Window & typeof globalThis;
const React = cheatyWindow.React;

export interface IDashboardProps {
    ns: NS;
}
export const Dashboard = ({ ns }: IDashboardProps) => {
    const killAllClicked = async () => {
        alert("Killing stuff");
    };

    const runClicked = async () => {
        alert("Running stuff");
    };
    return (
        <div
            style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                flexGrow: 1,
            }}
        >
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                }}
            >
                <Button bg="red" title="Kill All!" onButtonClick={killAllClicked} />
                <Button bg="green" title="Run!" onButtonClick={runClicked} />
            </div>
            <MonitorInput ns={ns} />
            <ToggleSection ns={ns} />
        </div>
    );
};
