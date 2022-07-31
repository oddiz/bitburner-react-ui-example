import { Dashboard } from "/ui-example/components/Dashboard/Dashboard";
import { NS } from "../typings/Bitburner";

// accessing global window or document in bitburner costs 25GB each normally. this saves RAM for early UI convenience, sorry devs pls don't fix.
const cheatyWindow = eval("window") as Window & typeof globalThis;
const cheatyDocument = eval("document") as Document & typeof globalThis;

//  bitburner devs included React and ReactDOM in global window object!
const React = cheatyWindow.React;
const ReactDOM = cheatyWindow.ReactDOM;

export async function main(ns: NS) {
    ns.disableLog("asleep");
    ReactDOM.render(
        <React.StrictMode>
            <Dashboard ns={ns} />
        </React.StrictMode>,
        cheatyDocument.getElementById("overview-extra-hook-0") // there are 3 empty elements provided for players to include their own ui under overview window.
    );
    while (ns.scriptRunning("/ui-example/ui.js", "home")) {
        await ns.asleep(1000); // script must be running in bitburner for ns methods to function
    }
}
