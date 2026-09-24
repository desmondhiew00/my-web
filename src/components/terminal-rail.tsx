import { motion, useReducedMotion } from "framer-motion";
import { RAIL } from "@/lib/terminal-commands";
import { cn } from "@/lib/utils";

export type Mode = "type" | "tap";

interface Props {
	mode: Mode;
	onMode: (mode: Mode) => void;
	/** The verb already written on the prompt line, or null when the rail is at the verb step. */
	verb: string | null;
	onVerb: (verb: string, args?: string[]) => void;
	onArg: (arg: string) => void;
	onBack: () => void;
}

const KEY =
	"shrink-0 rounded border border-gray-200 bg-white px-2.5 py-1.5 text-sm dark:border-zinc-700 dark:bg-zinc-900";

/**
 * Tab completion you can touch. Tapping a verb that takes an argument writes it onto the
 * prompt line and swaps this row for that verb's arguments, so the command assembles in
 * the shell's own voice before it runs.
 */
export const TerminalRail: React.FC<Props> = ({ mode, onMode, verb, onVerb, onArg, onBack }) => {
	const reduce = useReducedMotion();
	const args = RAIL.find((entry) => entry.verb === verb)?.args;

	const slide = reduce
		? {}
		: { initial: { opacity: 0, x: args ? 12 : -12 }, animate: { opacity: 1, x: 0 } };

	return (
		<div className="flex items-center gap-2 border-t border-gray-200 bg-gray-50 px-3 py-2 dark:border-zinc-700 dark:bg-[#12151D]">
			<div className="min-w-0 flex-1 overflow-x-auto no-scrollbar">
				{mode === "type" ? (
					<p className="text-xs text-gray-500">
						<span className="font-semibold">⇥</span> completes ·{" "}
						<span className="font-semibold">↵</span> runs
					</p>
				) : (
					<motion.div key={verb ?? "verbs"} className="flex w-max items-center gap-2" {...slide}>
						{args ? (
							<>
								<button
									type="button"
									className={cn(KEY, "text-gray-500")}
									aria-label={`back to commands, cancel ${verb}`}
									onClick={onBack}
								>
									‹
								</button>
								{args.map((arg) => (
									<button
										type="button"
										key={arg}
										className={cn(KEY, "text-cyan-700 dark:text-cyan-400")}
										onClick={() => onArg(arg)}
									>
										{arg}
									</button>
								))}
							</>
						) : (
							RAIL.map((entry) => (
								<button
									type="button"
									key={entry.verb}
									className={KEY}
									onClick={() => onVerb(entry.verb, entry.args)}
								>
									{entry.verb}
									{entry.args && <span className="ml-1.5 text-gray-500">›</span>}
								</button>
							))
						)}
					</motion.div>
				)}
			</div>

			<div className="flex shrink-0 items-center gap-1 text-xs">
				{(["tap", "type"] as const).map((name) => (
					<button
						type="button"
						key={name}
						aria-pressed={mode === name}
						className={cn(
							"rounded px-1.5 py-1",
							mode === name ? "font-semibold text-shell-indicator" : "text-gray-500",
						)}
						onClick={() => onMode(name)}
					>
						{name}
					</button>
				))}
			</div>
		</div>
	);
};

export default TerminalRail;
