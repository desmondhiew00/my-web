import Typewriter from "@/components/ui/typewriter";
import { useLingui } from "@lingui/react/macro";
import dayjs from "dayjs";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FinderWindow } from "./ui/finder-window";

import "dayjs/locale/en";
import "dayjs/locale/ja";
import "dayjs/locale/zh-cn";

const PROMPT = "desmond@hiew ~ %";

interface Entry {
  cmd: string;
  out: string;
}

export const Terminal = () => {
  const { t, i18n } = useLingui();
  const locale = i18n.locale;
  const [time, setTime] = useState("");
  const [history, setHistory] = useState<Entry[]>([]);
  const [input, setInput] = useState("");
  const [cleared, setCleared] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dayjs.locale(locale.toLowerCase());
    const format = locale === "en" ? "(dddd) MMM D HH:mm:ss" : "(dddd) MMMD日 HH:mm:ss";
    setTime(dayjs().format(format));
  }, [locale]);

  const commands: Record<string, string> = {
    whoami: t`desmond hiew — \`full-stack developer\``,
    "cat about.txt": t`I build things that work.`,
    "echo $STACK": "`mac` · `keyboard` · `browser`",
    ls: "about.txt",
    help: "available: `whoami`, `cat about.txt`, `echo $STACK`, `ls`, `clear`",
  };

  // The intro plays back the first three on load; the rest are there to be found.
  const intro = ["whoami", "cat about.txt", "echo $STACK"];

  // Commands type out like someone at a keyboard; output lands at once, as a shell does.
  let at = 0.4;
  const session = intro.map((cmd) => {
    const cmdAt = at;
    at += cmd.length * 0.05 + 0.4;
    const outAt = at;
    at += 0.6;
    return { cmd, out: commands[cmd], cmdAt, outAt };
  });
  const endAt = at;

  const run = (raw: string) => {
    const cmd = raw.trim();
    setInput("");
    if (cmd === "clear") {
      setHistory([]);
      setCleared(true);
      return;
    }
    // zsh names only the binary it failed to find, not the whole line
    const out = cmd in commands ? commands[cmd] : cmd && `zsh: command not found: ${cmd.split(/\s+/)[0]}`;
    setHistory((prev) => [...prev, { cmd, out: out || "" }]);
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ block: "nearest" });
  }, [history]);

  return (
    <FinderWindow className="max-w-3xl" title="desmond@hiew — zsh">
      {/* biome-ignore lint/a11y/useKeyWithClickEvents: the input inside is the real control */}
      <div
        className="p-3 min-h-[300px] max-h-[70vh] overflow-auto w-full text-sm sm:text-base cursor-text"
        onClick={() => inputRef.current?.focus()}
      >
        {time && !cleared && (
          <p className="mb-3 text-[10px] sm:text-xs text-gray-500">
            {t`Last login`}: {time} on ttys001
          </p>
        )}

        {!cleared &&
          session.map(({ cmd, out, cmdAt, outAt }) => (
            <div key={cmd} className="mb-4">
              <Typewriter
                text={cmd}
                shellIndicator={PROMPT}
                cursor={false}
                speed={0.05}
                delay={cmdAt}
                childDelay={0}
              />
              <Typewriter text={out} shellIndicator={false} cursor={false} speed={0} delay={outAt} childDelay={0} />
            </div>
          ))}

        {history.map(({ cmd, out }, i) => (
          <div key={`${cmd}-${i}`} className="mb-4">
            <Typewriter text={cmd} shellIndicator={PROMPT} cursor={false} speed={0} childDelay={0} />
            {out && <Typewriter text={out} shellIndicator={false} cursor={false} speed={0} childDelay={0} />}
          </div>
        ))}

        <motion.div
          className="flex items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: endAt }}
        >
          <span className="font-semibold text-shell-indicator shrink-0">{PROMPT}&nbsp;</span>
          <input
            ref={inputRef}
            aria-label="terminal input"
            className="flex-1 bg-transparent outline-none caret-slate-900 dark:caret-white"
            value={input}
            spellCheck={false}
            autoComplete="off"
            autoCapitalize="off"
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && run(input)}
          />
        </motion.div>
        <div ref={bottomRef} />
      </div>
    </FinderWindow>
  );
};

export default Terminal;
