import { NS } from "typings/Bitburner";

export function main(ns: NS) {
    ns.disableLog("ALL");

    const allServers = getAllServers(ns);

    ns.tprint("All servers: " + allServers.join(", "));
}

export function getAllServers(ns: NS) {
    try {

        const serversToCheck = ["home"];
        const serversChecked: string[] = [];

        while (serversToCheck.length > 0) {
            const serverToCheck = serversToCheck.pop();
            if (!serverToCheck) continue;

            if (arrayContains(serversChecked, serverToCheck)) continue;

            //ns.print("Scanning server: ", serverToCheck);
            const results = ns.scan(serverToCheck);
            serversChecked.push(serverToCheck);

            for (const result of results) {
                if (!arrayContains(serversChecked, result)) {
                    serversToCheck.push(result);
                }
            }
        }

        return serversChecked;
    } catch (error) {
        console.log("Error in getAllServers: ", error);

        return [];
    }
}

//checks if an item already exists in an array
const arrayContains = (array, item) => {
    for (const i of array) {
        if (i === item) {
            return true;
        }
    }
    return false;
};
