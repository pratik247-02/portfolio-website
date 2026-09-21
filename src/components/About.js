import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import SectionHeading from './ui/SectionHeading';

/**
 * About, as a shell.
 *
 * A bio paragraph is the one thing on a portfolio nobody reads and everybody
 * writes the same way. This says the same things in a format where a two-line
 * answer is the correct length rather than a lazy one — and it is itself the
 * argument that I build interactive things.
 *
 * Behaves like a real shell where it costs nothing to: command history on
 * arrow keys, tab completion, ctrl+l to clear, unknown commands that fail the
 * way a shell fails. Clicking a suggestion runs it, so nobody has to type to
 * get the content.
 */

const PROMPT = 'pratik@portfolio';

// Rows render as [label, value] pairs; a bare string is a plain line and null
// is a blank spacer.
const OUTPUT = {
  whoami: [
    ['name', 'Pratik Raje'],
    ['role', 'SDE-1 @ Matrice AI'],
    ['since', 'May 2025'],
    ['studied', 'B.Tech IT, IIIT Bhopal (2025)'],
    ['based in', 'India'],
    ['open to', 'frontend & full-stack roles'],
  ],
  stack: [
    ['daily', 'React, Next.js, TypeScript'],
    ['at work', 'WebRTC, SSE, Canvas, RTP'],
    ['backend', 'Node, Express, MongoDB'],
    ['testing', 'Vitest, Supertest, GitHub Actions'],
    ['editor', 'VS Code, and I will not be defending this'],
  ],
  work: [
    'Multi-camera video streaming + analytics platform.',
    null,
    ['latency', '~15s → ~5s, 67% (WebSocket → WebRTC, trickle ICE)'],
    ['desync', '4–5s → none (RTP timestamp matching)'],
    ['ports', '1000+ → 16 (capped the grid at 4x4)'],
    ['canvas', 'boxes, polygons, masks, pose key-points'],
    ['contracts', '1,127 operations, 7 consumer repos'],
    null,
    'The pattern: most of these were fixed by removing something,',
    'not by adding something.',
  ],
  mcu: [
    'MCU Hub — 193 characters, 755 edges, weighted Dijkstra.',
    null,
    'I picked a Marvel dataset because I knew I would actually',
    'keep working on it at 1am. That turned out to be correct.',
    null,
    ['try', 'Ho Yinsen → Galactus, 4 hops, 0.2ms p95'],
    ['live', 'marvel-six-lake.vercel.app'],
  ],
  triage: [
    'Support Triage Agent — an AI agent over real customer',
    'service conversations, built harness first.',
    null,
    ['precision', '65.2% auto-handled, vs a 36.0% baseline'],
    ['coverage', '25.8% — three quarters still needs a human'],
    ['routing', '6 guard clauses ahead of model confidence'],
    null,
    'I wrote the evaluation before the pipeline, which is why',
    'I can tell you what it gets wrong and not just what it does.',
  ],
  mistake: [
    'I predicted a DB traversal would cost 200–350ms and that my',
    'in-memory version would win by 20–40x.',
    null,
    ['actual', '~30ms, and ~175x'],
    ['verdict', 'wrong in both directions'],
    null,
    'The bottleneck was never the algorithm — it was the network',
    'round trip. I wrote that up in the README instead of quietly',
    'fixing the numbers. Still the part I would point at first.',
  ],
  contact: [
    ['email', 'rajepratik2407@gmail.com'],
    ['github', 'github.com/pratik247-02'],
    ['linkedin', 'linkedin.com/in/pratik24702'],
    null,
    'Fastest way is email. I actually read it.',
  ],
  help: [
    ['whoami', 'the short version'],
    ['stack', 'what I work in'],
    ['work', 'what I do at Matrice AI'],
    ['mcu', 'the Marvel graph project'],
    ['triage', 'the AI support agent'],
    ['mistake', 'the time I was wrong, in writing'],
    ['facts', 'opinions, loosely held'],
    ['contact', 'how to reach me'],
    ['clear', 'clear the screen'],
  ],
};

// Opinions, one at a time. Running `facts` repeatedly should feel like pulling
// a new one rather than re-reading a list, so this is a shuffled bag that only
// refills once every fact has been shown — pure random would repeat the same
// line twice in a row often enough to look broken.
const FACTS = [
  'A screenshot is not a demo.',
  "If you didn't measure it, it's not a performance improvement.",
  'Most "performance work" is deleting a request.',
  'The best fix reduces the number of things that exist.',
  "console.log is a debugger. I'm at peace with this.",
  'A README that hides the limitations is marketing.',
  'The Snap made narrative sense. The time travel fixed nothing.',
  'Rewatched Infinity War six times. Endgame twice. That ratio is correct.',
];

const COMMANDS = [...Object.keys(OUTPUT), 'facts'];
const SUGGESTED = ['whoami', 'stack', 'work', 'mcu', 'triage', 'facts'];

const BANNER = [
  "Type a command, or click one below. 'help' lists everything.",
];

const Line = ({ row }) => {
  if (row === null) return <div className='h-3' />;

  if (Array.isArray(row)) {
    return (
      <div className='flex flex-col sm:flex-row sm:gap-x-4'>
        <span className='text-accent shrink-0 sm:w-[104px]'>{row[0]}</span>
        <span className='text-white/80 break-words'>{row[1]}</span>
      </div>
    );
  }

  return <div className='text-white/65 break-words'>{row}</div>;
};

const About = () => {
  // Seeded with whoami already run: an empty terminal asks the visitor to do
  // work before it says anything, and most of them will just scroll past.
  const [history, setHistory] = useState([
    { type: 'banner', rows: BANNER },
    { type: 'input', value: 'whoami' },
    { type: 'output', rows: OUTPUT.whoami },
  ]);
  const [input, setInput] = useState('');
  const [past, setPast] = useState([]);
  const [pastIndex, setPastIndex] = useState(-1);

  const inputRef = useRef(null);
  const scrollRef = useRef(null);
  // Indices not yet drawn in the current cycle.
  const factBagRef = useRef([]);

  // Keep the newest output in view without pulling the page around it: only
  // the inner pane scrolls.
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [history]);

  const run = useCallback((raw) => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;

    setPast((p) => [cmd, ...p]);
    setPastIndex(-1);

    if (cmd === 'clear') {
      setHistory([]);
      return;
    }

    if (cmd === 'facts') {
      if (factBagRef.current.length === 0) {
        factBagRef.current = FACTS.map((_, i) => i);
      }
      const bag = factBagRef.current;
      const pick = bag.splice((Math.random() * bag.length) | 0, 1)[0];
      setHistory((h) => [
        ...h,
        { type: 'input', value: cmd },
        { type: 'fact', rows: [FACTS[pick]], remaining: bag.length },
      ]);
      return;
    }

    const rows = OUTPUT[cmd];
    setHistory((h) => [
      ...h,
      { type: 'input', value: cmd },
      rows
        ? { type: 'output', rows }
        : {
            type: 'error',
            rows: [
              `command not found: ${cmd}`,
              `try: ${COMMANDS.join(', ')}`,
            ],
          },
    ]);
  }, []);

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      run(input);
      setInput('');
      return;
    }

    // Tab completes against the unique prefix match, like a shell would.
    if (e.key === 'Tab') {
      e.preventDefault();
      const partial = input.trim().toLowerCase();
      if (!partial) return;
      const matches = COMMANDS.filter((c) => c.startsWith(partial));
      if (matches.length === 1) setInput(matches[0]);
      return;
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (!past.length) return;
      const next = Math.min(pastIndex + 1, past.length - 1);
      setPastIndex(next);
      setInput(past[next]);
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = pastIndex - 1;
      if (next < 0) {
        setPastIndex(-1);
        setInput('');
      } else {
        setPastIndex(next);
        setInput(past[next]);
      }
      return;
    }

    if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault();
      setHistory([]);
    }
  };

  return (
    <section className='section' id='about-me'>
      <div className='container mx-auto'>
        <SectionHeading index='00' title='About' />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className='max-w-[820px] mx-auto'
        >
          <div
            className='rounded-xl border border-white/15 bg-[#0d0912]/80 backdrop-blur-sm overflow-hidden cursor-text'
            onClick={() => inputRef.current?.focus()}
          >
            {/* Title bar */}
            <div className='flex items-center gap-x-2 px-4 py-3 border-b border-white/10 bg-white/[0.03]'>
              <span className='h-3 w-3 rounded-full bg-[#ff5f57]' />
              <span className='h-3 w-3 rounded-full bg-[#febc2e]' />
              <span className='h-3 w-3 rounded-full bg-[#28c840]' />
              <span className='ml-3 text-[13px] text-white/40 font-primary tracking-wide'>
                {PROMPT} — about
              </span>
            </div>

            <div
              ref={scrollRef}
              className='p-4 lg:p-5 h-[380px] overflow-y-auto font-secondary text-[15px] leading-[1.6]'
            >
              {history.map((entry, i) => {
                if (entry.type === 'input') {
                  return (
                    <div key={i} className='flex gap-x-2 mt-4 first:mt-0'>
                      <span className='text-[#28c840] shrink-0'>$</span>
                      <span className='text-white/90'>{entry.value}</span>
                    </div>
                  );
                }

                if (entry.type === 'fact') {
                  return (
                    <div key={i} className='mt-2 mb-1'>
                      <div className='border-l-2 border-accent pl-3 text-white/85 text-[16px] leading-[1.55]'>
                        {entry.rows[0]}
                      </div>
                      <div className='text-white/25 text-[12px] mt-1.5 pl-3'>
                        {entry.remaining > 0
                          ? `run facts again — ${entry.remaining} more`
                          : "that's all of them. run it again to reshuffle."}
                      </div>
                    </div>
                  );
                }

                if (entry.type === 'error') {
                  return (
                    <div key={i} className='mt-1 flex flex-col gap-y-0.5'>
                      <div className='text-[#ff6b8a]'>{entry.rows[0]}</div>
                      <div className='text-white/40 text-[14px]'>{entry.rows[1]}</div>
                    </div>
                  );
                }

                return (
                  <div
                    key={i}
                    className={
                      'flex flex-col gap-y-0.5 ' +
                      (entry.type === 'banner' ? 'text-white/40' : 'mt-1')
                    }
                  >
                    {entry.rows.map((row, j) => (
                      <Line key={j} row={row} />
                    ))}
                  </div>
                );
              })}

              {/* Live prompt */}
              <div className='flex gap-x-2 mt-4 items-baseline'>
                <span className='text-[#28c840] shrink-0'>$</span>
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onKeyDown}
                  spellCheck='false'
                  autoComplete='off'
                  autoCapitalize='off'
                  aria-label='Type a command: whoami, stack, work, mcu, mistake, facts, contact'
                  className='flex-1 bg-transparent text-white/90 focus:outline-none font-secondary caret-accent min-w-0'
                />
              </div>
            </div>

            {/* Clickable commands, so this works without typing a thing. */}
            <div className='flex flex-wrap gap-2 px-4 py-3 border-t border-white/10 bg-white/[0.02]'>
              {SUGGESTED.map((c) => (
                <button
                  key={c}
                  type='button'
                  onClick={() => {
                    run(c);
                    setInput('');
                    inputRef.current?.focus();
                  }}
                  className='text-[13px] px-2.5 py-1 rounded-md border border-white/15 text-white/55 hover:border-accent hover:text-white transition-colors font-secondary'
                >
                  {c}
                </button>
              ))}
              <span className='text-[13px] px-1 py-1 text-white/25 hidden sm:inline'>
                ↑ history · tab completes
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
