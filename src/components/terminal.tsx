import { useLingui } from "@lingui/react/macro";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import Typewriter from "@/components/ui/typewriter";
import { useTerminal } from "@/hooks/use-terminal";
import { PROMPT } from "@/lib/terminal-commands";
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

export const Terminal = () => {
	const { t } = useLingui();
	const {
		time,
		history,
		input,
		setInput,
		cleared,
		sending,
		session,
		flowLabel,
		submitLine,
		complete,
		cancelFlow,
		run,
	} = useTerminal();

	const scrollRef = useStickToBottom();
	const inputRef = useRef<HTMLInputElement>(null);
	const [toast, setToast] = useState("");

	// Land in typing mode on load, but not on touch, where it would throw up the keyboard.
	useEffect(() => {
		if (window.matchMedia("(pointer: fine)").matches) inputRef.current?.focus();
	}, []);

	useEffect(() => {
		if (!toast) return;
		const id = setTimeout(() => setToast(""), 1500);
		return () => clearTimeout(id);
	}, [toast]);

	// Selecting copies, then hands the shell straight back: clear the selection and refocus.
	const handleMouseUp = () => {
		const selection = window.getSelection();
		const selected = selection?.toString().trim();
		if (selected) {
			navigator.clipboard?.writeText(selected).then(
				() => setToast(t`copied`),
				() => {},
			);
			selection?.removeAllRanges();
		}
		inputRef.current?.focus();
	};

	const promptClass = (isFlow: boolean) =>
		isFlow ? "text-gray-500" : "font-semibold text-shell-indicator";

	return (
		<div className="w-full max-w-3xl relative z-10">
			<FinderWindow title="desmond@hiew — zsh">
				{/* biome-ignore lint/a11y/noStaticElementInteractions: mouseup only refocuses the input or copies a selection */}
				<div
					ref={scrollRef}
					className="p-3 min-h-[300px] max-h-[70vh] overflow-auto w-full text-sm sm:text-base cursor-text"
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
								<Typewriter text={out} shellIndicator={false} delay={outAt} {...INSTANT} />
							</div>
						))}

					{history.map(({ cmd, out, prompt }, i) => (
						// contact prompts are one continuous block, so no gap between them
						<div key={`${cmd}-${i}`} className={prompt && !out ? "" : "mb-4"}>
							<Typewriter
								text={cmd}
								shellIndicator={prompt || PROMPT}
								indicatorClassName={promptClass(Boolean(prompt))}
								{...INSTANT}
							/>
							{out && <Typewriter text={out} shellIndicator={false} {...INSTANT} />}
						</div>
					))}

					<motion.div
						className="flex items-center"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: session.endAt }}
					>
						<span className={`shrink-0 ${promptClass(Boolean(flowLabel))}`}>
							{flowLabel ?? PROMPT}&nbsp;
						</span>
						<input
							ref={inputRef}
							aria-label="terminal input"
							className="flex-1 bg-transparent outline-none caret-slate-900 dark:caret-white disabled:opacity-50"
							disabled={sending}
							value={input}
							spellCheck={false}
							autoComplete="off"
							autoCapitalize="off"
							onChange={(e) => setInput(e.target.value)}
							onKeyDown={(e) => {
								// IME: enter/tab pick a candidate word, they aren't shell keys yet
								if (e.nativeEvent.isComposing) return;
								if (flowLabel && (e.key === "Escape" || (e.ctrlKey && e.key === "c"))) {
									e.preventDefault();
									cancelFlow(e.key === "c");
									return;
								}
								if (e.key === "Enter") submitLine(input);
								// keep focus in the shell like a real terminal
								if (e.key === "Tab") {
									e.preventDefault();
									complete();
								}
							}}
						/>
					</motion.div>
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

			{/* shortcut for people who won't type: runs the same command */}
			{!flowLabel && !sending && (
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
