import { useLingui } from "@lingui/react/macro";
import { useCallback, useEffect, useMemo, useState } from "react";
import { buildCommands, buildSession, LINK_COMMANDS, sharedPrefix } from "@/lib/terminal-commands";

export interface Entry {
	cmd: string;
	out: string;
}

export const useTerminal = () => {
	const { i18n } = useLingui();
	const locale = i18n.locale;

	const [time, setTime] = useState("");
	const [history, setHistory] = useState<Entry[]>([]);
	const [input, setInput] = useState("");
	const [cleared, setCleared] = useState(false);

	// biome-ignore lint/correctness/useExhaustiveDependencies: buildCommands reads the global i18n, so locale is the real input
	const commands = useMemo(() => buildCommands(), [locale]);
	const session = useMemo(() => buildSession(commands), [commands]);

	useEffect(() => {
		const now = new Date();
		const weekday = new Intl.DateTimeFormat(locale, { weekday: "long" }).format(now);
		const date = new Intl.DateTimeFormat(locale, { month: "short", day: "numeric" }).format(now);
		// Clock stays 24h in every locale, matching the terminal look.
		const clock = new Intl.DateTimeFormat("en-GB", {
			hour: "2-digit",
			minute: "2-digit",
			second: "2-digit",
			hour12: false,
		}).format(now);
		setTime(`(${weekday}) ${date} ${clock}`);
	}, [locale]);

	const push = useCallback((entry: Entry) => setHistory((prev) => [...prev, entry]), []);

	const complete = () => {
		const names = [...Object.keys(commands), ...Object.keys(LINK_COMMANDS), "clear"];
		const hits = names.filter((n) => n.startsWith(input));
		if (!hits.length) return;
		const shared = sharedPrefix(hits);
		if (shared !== input) setInput(shared);
		else if (hits.length > 1) push({ cmd: input, out: hits.join("  ") });
	};

	const run = (raw: string) => {
		const cmd = raw.trim();
		setInput("");

		const url = LINK_COMMANDS[cmd];
		if (url) {
			// mailto hands off to the mail client; a new tab would just blink and close
			if (url.startsWith("mailto:")) window.location.href = url;
			else window.open(url, "_blank", "noopener");
			push({ cmd, out: `opening ${url}` });
			return;
		}

		if (cmd === "clear") {
			setHistory([]);
			setCleared(true);
			return;
		}

		// echo isn't in help, but a shell that can't echo feels broken
		if (cmd.startsWith("echo ") && !(cmd in commands)) {
			push({ cmd, out: cmd.slice(5).replace(/^['"]|['"]$/g, "") });
			return;
		}

		// zsh names only the binary it failed to find, not the whole line
		const out =
			cmd in commands ? commands[cmd] : cmd && `zsh: command not found: ${cmd.split(/\s+/)[0]}`;
		push({ cmd, out: out || "" });
	};

	return {
		time,
		history,
		input,
		setInput,
		cleared,
		session,
		submitLine: run,
		complete,
		run,
	};
};
