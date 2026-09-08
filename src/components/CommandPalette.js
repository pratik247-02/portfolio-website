import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { scroller } from 'react-scroll';
import { FaGithub, FaLinkedin, FaRegFilePdf, FaEnvelope } from 'react-icons/fa';
import { BiHomeAlt } from 'react-icons/bi';
import { BsBriefcase, BsCodeSlash, BsTools, BsSearch } from 'react-icons/bs';

/**
 * Cmd/Ctrl+K command palette.
 *
 * Subsequence matching rather than exact substring, so "wrtc" still finds
 * the WebRTC entry and "expr" finds Experience. Matches are ranked by how
 * tightly the typed characters cluster in the target, which keeps the
 * obvious result first without needing a scoring library.
 */

const scrollTo = (target) => () =>
  scroller.scrollTo(target, { smooth: true, duration: 500, offset: -60 });

const open = (url) => () => window.open(url, '_blank', 'noopener,noreferrer');

const COMMANDS = [
  { id: 'home', label: 'Go to Home', hint: 'Top of page', icon: BiHomeAlt, run: scrollTo('home'), group: 'Navigate' },
  { id: 'experience', label: 'Go to Experience', hint: 'Matrice AI', icon: BsBriefcase, run: scrollTo('experience'), group: 'Navigate' },
  { id: 'work', label: 'Go to Projects', hint: 'MCU Hub and more', icon: BsCodeSlash, run: scrollTo('work'), group: 'Navigate' },
  { id: 'skills', label: 'Go to Skills', hint: 'Stack and tools', icon: BsTools, run: scrollTo('about'), group: 'Navigate' },
  { id: 'contact', label: 'Go to Contact', hint: 'Get in touch', icon: FaEnvelope, run: scrollTo('contact'), group: 'Navigate' },

  {
    id: 'resume',
    label: 'Download Resume',
    hint: 'PDF',
    icon: FaRegFilePdf,
    group: 'Actions',
    run: () => {
      const a = document.createElement('a');
      a.href = '/Pratik-Resume.pdf';
      a.download = 'Pratik-Resume.pdf';
      a.click();
    },
  },
  { id: 'email', label: 'Send an Email', hint: 'rajepratik2407@gmail.com', icon: FaEnvelope, group: 'Actions', run: () => { window.location.href = 'mailto:rajepratik2407@gmail.com'; } },

  { id: 'github', label: 'Open GitHub', hint: 'pratik247-02', icon: FaGithub, run: open('https://github.com/pratik247-02'), group: 'Links' },
  { id: 'linkedin', label: 'Open LinkedIn', hint: 'pratik24702', icon: FaLinkedin, run: open('https://www.linkedin.com/in/pratik24702'), group: 'Links' },
  { id: 'mcu', label: 'Open MCU Hub', hint: 'Live demo', icon: BsCodeSlash, run: open('https://marvel-six-lake.vercel.app'), group: 'Links' },
  { id: 'mcu-src', label: 'Open MCU Hub source', hint: 'GitHub', icon: FaGithub, run: open('https://github.com/pratik247-02/Marvel'), group: 'Links' },
];

/**
 * Returns a score for how well `query` matches `text` as a subsequence,
 * or -1 when the characters do not all appear in order. Lower is better:
 * the score is the span between the first and last matched character, so
 * tightly-clustered matches rank ahead of scattered ones.
 */
const score = (text, query) => {
  if (!query) return 0;
  const haystack = text.toLowerCase();
  let first = -1;
  let cursor = 0;
  for (let i = 0; i < query.length; i++) {
    const found = haystack.indexOf(query[i], cursor);
    if (found === -1) return -1;
    if (first === -1) first = found;
    cursor = found + 1;
  }
  return cursor - first;
};

const CommandPalette = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const restoreFocusRef = useRef(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return COMMANDS;
    return COMMANDS.map((cmd) => ({ cmd, s: score(cmd.label + ' ' + cmd.hint, q) }))
      .filter((r) => r.s !== -1)
      .sort((a, b) => a.s - b.s)
      .map((r) => r.cmd);
  }, [query]);

  const close = useCallback(() => {
    setIsOpen(false);
    setQuery('');
    setActive(0);
    // Hand focus back to whatever opened the palette.
    if (restoreFocusRef.current) restoreFocusRef.current.focus?.();
  }, []);

  const runCommand = useCallback(
    (cmd) => {
      if (!cmd) return;
      close();
      // Let the overlay unmount before scrolling, so the scroll lands cleanly.
      requestAnimationFrame(() => cmd.run());
    },
    [close]
  );

  // Global hotkey.
  useEffect(() => {
    const onKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        restoreFocusRef.current = document.activeElement;
        setIsOpen((v) => !v);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  // Lock the page behind the overlay while it is open.
  useEffect(() => {
    if (!isOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    inputRef.current?.focus();
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isOpen]);

  // Keep the highlighted row in view as it moves.
  useEffect(() => {
    const node = listRef.current?.querySelector('[data-active="true"]');
    node?.scrollIntoView({ block: 'nearest' });
  }, [active, results]);

  const onKeyDown = (e) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      close();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((i) => (results.length ? (i + 1) % results.length : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((i) => (results.length ? (i - 1 + results.length) % results.length : 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      runCommand(results[active]);
    }
  };

  if (!isOpen) return null;

  let lastGroup = null;

  return (
    <div
      className='fixed inset-0 z-[100] flex items-start justify-center pt-[12vh] px-4'
      role='dialog'
      aria-modal='true'
      aria-label='Command palette'
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div className='absolute inset-0 bg-black/70 backdrop-blur-sm animate-[fadeIn_150ms_ease-out]' />

      <div className='relative w-full max-w-[560px] rounded-2xl border border-white/15 bg-[#140d1f]/95 shadow-2xl overflow-hidden animate-[paletteIn_180ms_cubic-bezier(0.16,1,0.3,1)]'>
        <div className='flex items-center gap-x-3 px-4 border-b border-white/10'>
          <BsSearch className='text-white/40 shrink-0' />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(0);
            }}
            onKeyDown={onKeyDown}
            placeholder='Search sections, links and actions…'
            aria-label='Search commands'
            className='w-full bg-transparent py-4 text-base text-white placeholder-white/35 focus:outline-none font-secondary'
          />
          <kbd className='hidden sm:block text-[11px] text-white/40 border border-white/20 rounded px-1.5 py-0.5 shrink-0'>
            esc
          </kbd>
        </div>

        <div ref={listRef} className='max-h-[46vh] overflow-y-auto py-2'>
          {results.length === 0 && (
            <p className='px-4 py-6 text-center text-white/40 text-base'>No matches.</p>
          )}

          {results.map((cmd, i) => {
            const Icon = cmd.icon;
            const isActive = i === active;
            const showGroup = !query.trim() && cmd.group !== lastGroup;
            lastGroup = cmd.group;
            return (
              <React.Fragment key={cmd.id}>
                {showGroup && (
                  <div className='px-4 pt-3 pb-1 text-[11px] uppercase tracking-[0.2em] text-white/30 font-primary'>
                    {cmd.group}
                  </div>
                )}
                <button
                  type='button'
                  data-active={isActive}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => runCommand(cmd)}
                  className={
                    'w-full flex items-center gap-x-3 px-4 py-2.5 text-left transition-colors ' +
                    (isActive ? 'bg-white/10' : 'hover:bg-white/5')
                  }
                >
                  <Icon className={isActive ? 'text-accent shrink-0' : 'text-white/40 shrink-0'} />
                  <span className='text-white/90 text-base'>{cmd.label}</span>
                  <span className='ml-auto text-sm text-white/35 truncate max-w-[45%]'>
                    {cmd.hint}
                  </span>
                </button>
              </React.Fragment>
            );
          })}
        </div>

        <div className='flex items-center gap-x-4 px-4 py-2.5 border-t border-white/10 text-[11px] text-white/35'>
          <span>
            <kbd className='border border-white/20 rounded px-1'>↑</kbd>{' '}
            <kbd className='border border-white/20 rounded px-1'>↓</kbd> navigate
          </span>
          <span>
            <kbd className='border border-white/20 rounded px-1'>↵</kbd> select
          </span>
        </div>
      </div>
    </div>
  );
};

export default CommandPalette;
