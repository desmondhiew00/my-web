import { useLingui } from "@lingui/react/macro";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { type ContactDraft, MAX_SUBMISSIONS, MIN_ELAPSED_MS, send, validate } from "@/lib/contact";
import {
	buildCommands,
	buildSession,
	EMAIL,
	LINK_COMMANDS,
	STEPS,
	sharedPrefix,
} from "@/lib/terminal-commands";

export interface Entry {
	cmd: string;
	out: string;
	/** Contact prompts replace the shell prompt with `name>`, `email>`, ... */
	prompt?: string;
}

interface Flow {
	step: number;
	draft: ContactDraft;
	startedAt: number;
}

const EMPTY_DRAFT: ContactDraft = { name: "", email: "", message: "" };

export const useTerminal = () => {
	const { t, i18n } = useLingui();
	const locale = i18n.locale;

	const [time, setTime] = useState("");
	const [history, setHistory] = useState<Entry[]>([]);
	const [input, setInput] = useState("");
	const [cleared, setCleared] = useState(false);
	const [flow, setFlow] = useState<Flow | null>(null);
	const [sending, setSending] = useState(false);
	const sentRef = useRef(0);

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

	const replaceLastOut = useCallback(
		(out: string) =>
			setHistory((prev) => prev.map((e, i) => (i === prev.length - 1 ? { ...e, out } : e))),
		[],
	);

	const complete = () => {
		const names = [...Object.keys(commands), ...Object.keys(LINK_COMMANDS), "contact", "clear"];
		const hits = names.filter((n) => n.startsWith(input));
		if (!hits.length) return;
		const shared = sharedPrefix(hits);
		if (shared !== input) setInput(shared);
		else if (hits.length > 1) push({ cmd: input, out: hits.join("  ") });
	};

	const submit = async (draft: ContactDraft, startedAt: number) => {
		setFlow(null);
		setSending(true);
		push({ prompt: `${STEPS[2]}:`, cmd: draft.message, out: t`sending...` });
		const tooFast = Date.now() - startedAt < MIN_ELAPSED_MS;
		const ok = !tooFast && (await send(draft));
		if (ok) sentRef.current += 1;
		replaceLastOut(
			ok ? t`✓ sent — i'll reply to ${draft.email}` : t`✗ failed — mail me directly: ${EMAIL}`,
		);
		setSending(false);
	};

	/** Answer the current contact prompt: validate, then advance or send. */
	const step = (value: string) => {
		if (!flow) return;
		const field = STEPS[flow.step];
		const label = `${field}:`;
		setInput("");

		const error = validate(field, value);
		if (error) {
			push({
				prompt: label,
				cmd: value,
				out: {
					empty: t`name cannot be empty`,
					email: t`not an email`,
					short: t`message must be at least 10 characters`,
				}[error],
			});
			return;
		}

		const draft = { ...flow.draft, [field]: value.trim() };
		if (flow.step === STEPS.length - 1) {
			submit(draft, flow.startedAt);
			return;
		}
		push({ prompt: label, cmd: value, out: "" });
		setFlow({ ...flow, step: flow.step + 1, draft });
	};

	const startContact = () => {
		setInput("");
		if (sentRef.current >= MAX_SUBMISSIONS) {
			push({ cmd: "contact", out: t`✗ enough for one visit — mail me directly: ${EMAIL}` });
			return;
		}
		push({ cmd: "contact", out: t`write me a message. ctrl-c to cancel.` });
		setFlow({ step: 0, draft: EMPTY_DRAFT, startedAt: Date.now() });
	};

	const run = (raw: string) => {
		const cmd = raw.trim();
		setInput("");

		if (cmd === "contact") return startContact();

		const url = LINK_COMMANDS[cmd];
		if (url) {
			window.open(url, "_blank", "noopener");
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

	/** ctrl-c and esc both drop out of a contact prompt, as a shell does. */
	const cancelFlow = (echo: boolean) => {
		if (flow && echo) push({ prompt: `${STEPS[flow.step]}:`, cmd: `${input}^C`, out: "" });
		setFlow(null);
		setInput("");
	};

	return {
		time,
		history,
		input,
		setInput,
		cleared,
		sending,
		session,
		/** Label for the live input line: a contact field, or the shell prompt. */
		flowLabel: flow ? `${STEPS[flow.step]}:` : null,
		submitLine: (value: string) => (flow ? step(value) : run(value)),
		complete: () => !flow && complete(),
		cancelFlow,
		run,
	};
};
