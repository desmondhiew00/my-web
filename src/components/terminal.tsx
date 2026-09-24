import { useLingui } from "@lingui/react/macro";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { CursorBlinker } from "@/components/ui/cursor-blinker";
import Typewriter, { plainText } from "@/components/ui/typewriter";
import { useTerminal } from "@/hooks/use-terminal";
import { PROMPT } from "@/lib/terminal-commands";
import { type Mode, TerminalRail } from "./terminal-rail";
import { FinderWindow } from "./ui/finder-window";

/** Shared Typewriter setup: history is already-typed text, so it renders instantly. */
const INSTANT = { cursor: false, speed: 0, childDelay: 0 } as const;

/** Keeps the view pinned to the bottom while the typewriter grows the content. */
const useStickToBottom = () => {
	const ref = useRef<HTMLDivElement>(null);
	useEffect(() => {
		const box = ref.current;
		if (!box) return;
		const stick = () => {
			box.scrollTop = box.scrollHeight;
		};
		// typewriter reveals letters by flipping inline display, so watch attributes too
		const mo = new MutationObserver(stick);
		mo.observe(box, {
			childList: true,
			subtree: true,
			characterData: true,
			attributes: true,
			attributeFilter: ["style"],
		});
		stick();
		return () => mo.disconnect();
	}, []);
	return ref;
};

/**
 * A block of command output. On touch there is no select-to-copy, so a tap on the block
 * copies it — without that, a phone visitor cannot lift the email address off the screen.
 */
const Output: React.FC<{
	text: string;
	delay?: number;
	onCopy?: (text: string) => void;
	copyLabel: string;
}> = ({ text, delay, onCopy, copyLabel }) => {
	const line = <Typewriter text={text} shellIndicator={false} delay={delay} {...INSTANT} />;
	if (!onCopy) return line;
	return (
		<button
			type="button"
			className="block w-full text-left"
			aria-label={copyLabel}
			onClick={() => onCopy(plainText(text))}
		>
			{line}
		</button>
	);
};

export const Terminal = () => {
	const { t } = useLingui();
	const { time, history, input, setInput, cleared, session, submitLine, complete, run } =
		useTerminal();

	const scrollRef = useStickToBottom();
	const inputRef = useRef<HTMLInputElement>(null);
	const [toast, setToast] = useState("");
	const [mode, setMode] = useState<Mode>("type");
	const [verb, setVerb] = useState<string | null>(null);

	// Pointer type, not screen width: a narrow laptop window still has a keyboard.
	useEffect(() => {
		if (window.matchMedia("(pointer: fine)").matches) inputRef.current?.focus();
		else setMode("tap");
	}, []);

	useEffect(() => {
		if (!toast) return;
		const id = setTimeout(() => setToast(""), 1500);
		return () => clearTimeout(id);
	}, [toast]);

	const copy = (text: string) => {
		if (!text) return;
		navigator.clipboard?.writeText(text).then(
			() => setToast(t`copied`),
			() => {},
		);
	};

	// Selecting copies, then hands the shell straight back: clear the selection and refocus.
	const handleMouseUp = () => {
		if (mode === "tap") return;
		const selection = window.getSelection();
		const selected = selection?.toString().trim();
		if (selected) {
			copy(selected);
			selection?.removeAllRanges();
		}
		inputRef.current?.focus();
	};

	const switchMode = (next: Mode) => {
		setMode(next);
		setVerb(null);
		setInput("");
		// Choosing `type` is the request for the keyboard, so raise it.
		if (next === "type") requestAnimationFrame(() => inputRef.current?.focus());
	};

	const tapVerb = (name: string, args?: string[]) => {
		if (!args) {
			setVerb(null);
			run(name);
			return;
		}
		setVerb(name);
		setInput(`${name} `);
	};

	const tapArg = (arg: string) => {
		run(`${verb} ${arg}`);
		setVerb(null);
	};

	const promptClass = "font-semibold text-shell-indicator";
	const copyLabel = t`copy output`;
	const copyOut = mode === "tap" ? copy : undefined;

	return (
		<div className="w-full max-w-3xl relative z-10">
			<FinderWindow title="desmond@hiew — zsh">
				<div className="flex w-full flex-col">
					{/* biome-ignore lint/a11y/noStaticElementInteractions: mouseup only refocuses the input or copies a selection */}
					<div
						ref={scrollRef}
						className="p-3 min-h-[300px] max-h-[70dvh] overflow-auto w-full text-sm sm:text-base cursor-text"
						onMouseUp={handleMouseUp}
					>
						{time && !cleared && (
							<p className="mb-3 text-[10px] sm:text-xs text-gray-500">
								{t`Last login`}: {time} on ttys001
							</p>
						)}

						{!cleared &&
							session.lines.map(({ cmd, out, cmdAt, outAt }) => (
								<div key={cmd} className="mb-4">
									<Typewriter
										text={cmd}
										shellIndicator={PROMPT}
										cursor={false}
										speed={0.05}
										delay={cmdAt}
										childDelay={0}
									/>
									<Output text={out} delay={outAt} onCopy={copyOut} copyLabel={copyLabel} />
								</div>
							))}

						{history.map(({ cmd, out }, i) => (
							<div key={`${cmd}-${i}`} className="mb-4">
								<Typewriter
									text={cmd}
									shellIndicator={PROMPT}
									indicatorClassName={promptClass}
									{...INSTANT}
								/>
								{out && <Output text={out} onCopy={copyOut} copyLabel={copyLabel} />}
							</div>
						))}

						<motion.div
							className="flex items-center"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: session.endAt }}
						>
							<span className={`shrink-0 ${promptClass}`}>{PROMPT}&nbsp;</span>
							{mode === "tap" ? (
								// A read-only line, so tapping the shell never raises the OS keyboard.
								<p className="flex-1 whitespace-pre">
									{input}
									<CursorBlinker className="ml-[2px]" type="lodash" />
								</p>
							) : (
								<input
									ref={inputRef}
									aria-label="terminal input"
									className="flex-1 bg-transparent outline-none caret-slate-900 dark:caret-white disabled:opacity-50"
									value={input}
									spellCheck={false}
									autoComplete="off"
									autoCapitalize="off"
									onChange={(e) => setInput(e.target.value)}
									onKeyDown={(e) => {
										// IME: enter/tab pick a candidate word, they aren't shell keys yet
										if (e.nativeEvent.isComposing) return;
										if (e.key === "Enter") submitLine(input);
										// keep focus in the shell like a real terminal
										if (e.key === "Tab") {
											e.preventDefault();
											complete();
										}
									}}
								/>
							)}
						</motion.div>
					</div>

					<TerminalRail
						mode={mode}
						onMode={switchMode}
						verb={verb}
						onVerb={tapVerb}
						onArg={tapArg}
						onBack={() => {
							setVerb(null);
							setInput("");
						}}
					/>
				</div>
			</FinderWindow>

			{toast && (
				<motion.div
					className="fixed bottom-20 right-5 z-50 rounded-md bg-zinc-900/90 dark:bg-zinc-100/90 px-3 py-1.5 text-sm text-white dark:text-zinc-900 shadow-sm"
					initial={{ opacity: 0, y: 4 }}
					animate={{ opacity: 1, y: 0 }}
					role="status"
				>
					{toast}
				</motion.div>
			)}

			{/* shortcut for people who won't type; in tap mode `contact` is already a key on the rail */}
			{mode === "type" && (
				<div className="fixed bottom-5 right-5 z-50">
					<Button
						className="rounded-full border border-gray-300 dark:border-zinc-700 bg-white/90 dark:bg-zinc-900/90 px-4 py-2 text-sm shadow-sm"
						onClick={() => {
							inputRef.current?.focus();
							run("contact");
							requestAnimationFrame(() =>
								inputRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }),
							);
						}}
					>
						contact
					</Button>
				</div>
			)}
		</div>
	);
};

export default Terminal;
