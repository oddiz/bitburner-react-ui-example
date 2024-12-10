import { NS } from "typings/Bitburner";
import { getAllServers } from "/ui-example/utils/getAllServers";

const cheatyWindow = eval("window") as Window & typeof globalThis;
const cheatyDocument = eval("document") as Document & typeof globalThis;

const React = cheatyWindow.React;
const { useState, useMemo } = React;

// This module lets you monitor a server's details (money, security, required threads for grow,weaken,hack etc).
//It has a primitive auto - complete feature. Suggestions for server names will appear as you start typing.When there is 1 suggestion left pressing Enter will run a monitor for that server.
export const MonitorInput = ({ ns }: { ns: NS }) => {
    const allServers = useMemo(() => getAllServers(ns), []);
    const [suggestions, setSuggestions] = useState<string[]>([]);

    const onChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const query = e.target.value;
        const matchedServers: string[] = [];
        for (const server of allServers) {
            if (queryInString(query, server)) {
                matchedServers.push(server);
            }
        }

        setSuggestions(e.target.value === "" ? [] : matchedServers);
    };

    const onKeyDownHandler = async (e) => {
        if (e.key === "Enter") {
            if (suggestions.length === 1) {
                ns.run("/ui-example/utils/monitor.js", 1, suggestions[0]);
                setSuggestions([]);
                e.target.value = "";
            }
        }
    };
    const onFocusHandler = () => {
        // disable Bitburner terminal input so that we can write inside our custom widget instead of game's terminal
        const terminalInput = cheatyDocument.getElementById("terminal-input") as HTMLInputElement;
        if (terminalInput) terminalInput.disabled = true;
    };

    const onFocusOut = () => {
        // enable Bitburner terminal input again after focusing out of our widget input
        const terminalInput = cheatyDocument.getElementById("terminal-input") as HTMLInputElement;
        if (terminalInput) terminalInput.disabled = false;
    };
    const suggestionsSection = suggestions.map((server) => {
        return <div key={server}>{server}</div>;
    });
    return (
        <div
            style={{
                fontFamily: "Consolas",
                fontSize: "12px",
            }}
        >
            <input
                style={{
                    width: "100px",
                    height: "20px",
                    border: "1px solid yellow",
                    padding: "2px",
                    backgroundColor: "black",
                    color: "yellow",
                    margin: "2px",
                }}
                placeholder="Monitor"
                onChange={onChangeHandler}
                onKeyDown={onKeyDownHandler}
                onFocusCapture={onFocusHandler}
                onBlur={onFocusOut}
            />
            <div
                style={{
                    position: "relative",
                    width: "60px",
                    bottom: "0px",
                    background: "#00000092",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    zIndex: "9999",
                }}
            >
                {suggestions.length > 0 ? suggestionsSection : null}
            </div>
        </div>
    );
};

function queryInString(query: string, string: string) {
    return string.toLowerCase().includes(query.toLowerCase());
}
