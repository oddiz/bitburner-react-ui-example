// slightly modified version of
// https://github.com/bitburner-official/bitburner-scripts/blob/master/monitor.js

import { NS } from "typings/Bitburner";

const MONITORJS_REFRESH_INTERVAL = 1000 / 10; // 10 updates / s

export async function main(ns: NS) {
    const flags = ns.flags([["help", false]]);
    if (flags._.length === 0 || flags.help) {
        ns.tprint("This script helps visualize the money and security of a server.");
        ns.tprint(`USAGE: run ${ns.getScriptName()} SERVER_NAME`);
        ns.tprint("Example:");
        ns.tprint(`> run ${ns.getScriptName()} n00dles`);
        return;
    }

    ns.tail();
    ns.disableLog("ALL");

    while (ns.scriptRunning("/ui-example/utils/monitor.js", "home")) {
        const server = flags._[0];
        ns.clearLog();

        logServerDetails(ns, server);

        await ns.sleep(MONITORJS_REFRESH_INTERVAL);
    }
}
export function autocomplete(data) {
    return data.servers;
}

export function logServerDetails(ns: NS, server: string) {
    let money = ns.getServerMoneyAvailable(server);
    if (money === 0) money = 1;
    const maxMoney = ns.getServerMaxMoney(server);
    const minSec = ns.getServerMinSecurityLevel(server);
    const sec = ns.getServerSecurityLevel(server);

    const hackTime = ns.getHackTime(server);
    const growTime = ns.getGrowTime(server);
    const weakenTime = ns.getWeakenTime(server);

    let printString = `${server}:\n`;
    printString += `Money: ${ns.nFormat(money, "$0.000a")} / ${ns.nFormat(maxMoney, "$0.000a")} (${(
        (money / maxMoney) *
        100
    ).toFixed(2)}%)\n`;

    printString += `security: +${(sec - minSec).toFixed(2)}\n\n`;

    const curMoneyHackingThreadsAmount = Math.ceil(ns.hackAnalyzeThreads(server, money));
    const hackAnalyzeResult = ns.hackAnalyze(server);
    const moneyPerHack = Math.floor(money * hackAnalyzeResult);

    printString += `hack____: ${ns.tFormat(
        hackTime
    )} (t=${curMoneyHackingThreadsAmount}),\nSec increase: ${ns.hackAnalyzeSecurity(
        curMoneyHackingThreadsAmount,
        server
    )}\n\n`;

    const growthThreadsAmount = Math.ceil(ns.growthAnalyze(server, maxMoney / money));
    const maxGrowthSecIncrease = ns.growthAnalyzeSecurity(growthThreadsAmount, server, 1);

    printString += `grow____: ${ns.tFormat(
        growTime
    )} (t=${growthThreadsAmount}),\nSec increase: ${maxGrowthSecIncrease}\n\n`;

    printString += `weaken__: ${ns.tFormat(weakenTime)} (t=${Math.ceil(
        (sec - minSec) * 20
    )}) (tAfterGrowWeaken=${Math.ceil((sec + maxGrowthSecIncrease - minSec) * 20)})\n\n`;

    printString += `Analytics:\n$ per thread: ${moneyPerHack} $\n$ per sec(Hack only) per thread: ${(
        moneyPerHack /
        (ns.getHackTime(server) / 1000)
    ).toFixed(2)}$\n$ per sec per thread(full cycle): ${(
        moneyPerHack /
        (Math.max(weakenTime, hackTime, growTime) / 1000)
    ).toFixed(2)}$\n`;

    ns.print(printString);
}
