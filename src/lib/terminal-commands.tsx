import { t } from "@lingui/core/macro";

export const PROMPT = "desmond@hiew ~ %";

export const EMAIL = "desmond.hiew88@gmail.com";

export const STEPS = ["name", "email", "message"] as const;

/** `open x` shells out to the browser instead of printing; `cat links.txt` lists the same urls. */
export const LINKS: Record<string, string> = {
	github: "https://github.com/desmondhiew00",
	linkedin: "https://www.linkedin.com/in/desmond-hiew-ab1a201b1",
};

export const LINK_COMMANDS: Record<string, string> = Object.fromEntries(
	Object.entries(LINKS).map(([name, url]) => [`open ${name}`, url]),
);

const LINKS_FILE = "links.txt";

/** The intro plays these back on load; the rest are there to be found. */
export const INTRO = ["help"];

/** One help row: the command in backticks, a gray argument, then a plain description. */
const helpRow = (name: string, arg: string, desc: string, column: number) =>
	`  \`${name}\`${arg && ` #${arg}#`}${" ".repeat(
		Math.max(2, column - name.length - (arg ? arg.length + 1 : 0)),
	)}${desc}`;

/** `help` output: an intro line, then the command table, descriptions aligned. */
const helpText = (intro: string, entries: [name: string, arg: string, desc: string][]) => {
	const column =
		Math.max(...entries.map(([name, arg]) => name.length + (arg ? arg.length + 1 : 0))) + 2;
	return [
		intro,
		"",
		`${t`Commands`}:`,
		...entries.map(([name, arg, desc]) => helpRow(name, arg, desc, column)),
		"",
		`${t`Variables`}:`,
		`  #$LINK#   = [${Object.keys(LINKS).join(", ")}]`,
		`  #$STACK#  = ?`,
		"",
		`${t`Try`}: \`cat about.txt\`, \`open github\``,
	].join("\n");
};

export const buildCommands = (): Record<string, string> => ({
	whoami: t`desmond hiew — full-stack developer`,
	"cat about.txt": t`I build things that work.`,
	"echo $STACK": "mac · keyboard · browser",
	"echo $LINK": Object.keys(LINKS).join(" "),
	ls: `about.txt  contact.txt  ${LINKS_FILE}`,
	"cat contact.txt": `${EMAIL}\n#${t`links`}#: \`cat ${LINKS_FILE}\`\n#${t`or type`}# \`contact\``,
	[`cat ${LINKS_FILE}`]: Object.entries(LINKS)
		.map(([name, url]) => `${name.padEnd(10)}${url}`)
		.join("\n"),
	help: helpText(t`Desmond Hiew — full-stack developer. Welcome to my shell.`, [
		["whoami", "", t`who you're talking to`],
		["cat", "$arg", t`print a file`],
		["ls", "", t`list files`],
		["open", "$LINK", t`open link in new tab`],
		["contact", "", t`send me a message`],
		["clear", "", t`clear the screen`],
	]),
});

export interface SessionLine {
	cmd: string;
	out: string;
	cmdAt: number;
	outAt: number;
}

/**
 * Intro playback schedule. Commands type out like someone at a keyboard;
 * output lands at once, as a shell does.
 */
export const buildSession = (commands: Record<string, string>) => {
	let at = 0.3;
	const lines: SessionLine[] = INTRO.map((cmd) => {
		const cmdAt = at;
		at += cmd.length * 0.05 + 0.25;
		const outAt = at;
		at += 0.35;
		return { cmd, out: commands[cmd], cmdAt, outAt };
	});
	return { lines, endAt: at };
};

/** zsh-style tab completion: the longest prefix shared by every match. */
export const sharedPrefix = (matches: string[]) => {
	let shared = matches[0] ?? "";
	for (const m of matches) while (!m.startsWith(shared)) shared = shared.slice(0, -1);
	return shared;
};
