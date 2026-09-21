import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { BsCloudDownload } from 'react-icons/bs';

/**
 * Contact, as a shell session.
 *
 * The page opens with a terminal in About, so it closes with one: the same
 * idea at both ends rather than a bespoke About and a stock contact form.
 *
 * The fields are real <input> and <textarea> elements styled to sit in the
 * session, not a fake prompt capturing keystrokes. Faking it would cost
 * autofill, password managers, the correct mobile keyboard per field, and
 * every assistive technology that expects a labelled form control — a high
 * price for an effect nobody asked for.
 */

const EASE = [0.16, 1, 0.3, 1];

const EMAIL = 'rajepratik2407@gmail.com';
const ENDPOINT = 'https://getform.io/f/04b31b58-e1ed-46ac-9d04-c1ea613fa881';

// Served inline from public/; the query busts the cache for earlier copies.
const RESUME = '/Pratik-Resume.pdf?v=2026-09';

// Costs the sender one click and tells me what a message is before I open it.
// The flag doubles as the command the session appears to be running.
const REASONS = [
  { value: 'Hiring', flag: '--hiring' },
  { value: 'Freelance', flag: '--freelance' },
  { value: 'Just saying hi', flag: '--hello' },
];

// Deliberately stricter than type="email", which accepts "a@b". Requires a
// dotted domain with a 2+ character TLD, which is what a real address has.
const EMAIL_RE = /^[^\s@]+@[^\s@.]+(\.[^\s@.]+)*\.[a-z]{2,}$/i;

const validators = {
  name: (v) => {
    if (!v.trim()) return 'name is required';
    if (v.trim().length < 2) return 'that name looks too short';
    return '';
  },
  email: (v) => {
    if (!v.trim()) return 'email is required';
    if (!EMAIL_RE.test(v.trim())) return 'that is not a valid email address';
    return '';
  },
  message: (v) => (v.trim() ? '' : 'message is required'),
};

/**
 * One labelled row of the session: a prompt on the left, the control on the
 * right, and a reserved line beneath for the error so nothing shifts when one
 * appears.
 */
const Row = ({ id, prompt, error, touched, children }) => {
  const invalid = Boolean(touched && error);
  return (
    <div>
      <div className='flex items-baseline gap-x-3'>
        <label
          htmlFor={id}
          className='shrink-0 w-[74px] text-[14px] select-none text-[#C77DFF]'
        >
          {prompt}
        </label>
        <span className='text-white/40 shrink-0 select-none'>&gt;</span>
        {children}
      </div>
      <p
        id={id + '-error'}
        role={invalid ? 'alert' : undefined}
        className={
          'text-[12.5px] mt-1.5 ml-[98px] min-h-[17px] transition-colors ' +
          (invalid ? 'text-[#ff6b8a]' : 'text-transparent')
        }
      >
        {invalid ? error : ' '}
      </p>
    </div>
  );
};

const Contact = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    message: '',
    reason: REASONS[0].value,
  });
  const [touched, setTouched] = useState({});
  // idle | sending | sent | error
  const [status, setStatus] = useState('idle');
  const firstFieldRef = useRef(null);

  const errors = {
    name: validators.name(values.name),
    email: validators.email(values.email),
    message: validators.message(values.message),
  };
  const hasErrors = Object.values(errors).some(Boolean);
  const activeFlag =
    (REASONS.find((r) => r.value === values.reason) || REASONS[0]).flag;

  const onChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
  };

  const onBlur = (e) => {
    const { name } = e.target;
    setTouched((t) => ({ ...t, [name]: true }));
  };

  // Submitted over fetch rather than as a native POST. A native submit
  // navigates to the form service's own confirmation page, which drops the
  // visitor onto a third-party site with no obvious way back — the worst
  // moment in the whole flow, and the one place nobody can tell whether it
  // worked. Staying here means the outcome is visible either way.
  const onSubmit = async (e) => {
    e.preventDefault();
    setTouched({ name: true, email: true, message: true });
    if (hasErrors || status === 'sending') return;

    setStatus('sending');
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error('Request failed: ' + res.status);
      setStatus('sent');
    } catch {
      // The mailto beside this form is the fallback, so a failure here is
      // recoverable rather than a dead end.
      setStatus('error');
    }
  };

  const inputClass = (field) =>
    'flex-1 min-w-0 bg-transparent border-b py-1 focus:outline-none transition-colors ' +
    'placeholder-white/45 text-white/90 text-[14px] caret-[#C77DFF] ' +
    (touched[field] && errors[field]
      ? 'border-[#ff6b8a]/60'
      : 'border-white/40 focus:border-[#C77DFF]');

  const a11y = (field) => ({
    'aria-invalid': Boolean(touched[field] && errors[field]),
    'aria-describedby': touched[field] && errors[field] ? field + '-error' : undefined,
  });

  return (
    <section className='section pb-32' id='contact'>
      <div className='container mx-auto'>
        <div className='flex flex-col lg:flex-row gap-x-16 gap-y-12'>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: EASE }}
            className='flex-1'
          >
            <div className='flex items-baseline gap-x-4 mb-4'>
              <span className='font-primary text-sm text-accent tracking-[0.3em]'>04</span>
              <span className='font-primary text-sm uppercase tracking-[0.3em] text-white/50'>
                Contact
              </span>
            </div>

            <h2 className='text-[44px] lg:text-[68px] leading-[1.05] mb-6 font-bold'>
              Let's work
              <br />
              together.
            </h2>

            <p className='text-white/60 text-[17px] leading-[1.7] max-w-md mb-8'>
              Open to SDE roles across frontend, backend and full-stack. I read
              every message and usually reply within a day.
            </p>

            <a
              href={'mailto:' + EMAIL}
              className='inline-flex items-center gap-x-3 text-[19px] text-white/85 hover:text-white group mb-10'
            >
              <FaEnvelope className='text-accent' />
              <span className='border-b border-white/25 group-hover:border-accent transition-colors pb-1'>
                {EMAIL}
              </span>
            </a>

            <div className='flex gap-x-5'>
              <a
                href='https://www.github.com/pratik247-02'
                target='_blank'
                rel='noreferrer'
                aria-label='GitHub'
                className='text-white/55 hover:text-white hover:-translate-y-1 transition-all duration-300'
              >
                <FaGithub className='text-[26px]' />
              </a>
              <a
                href='https://www.linkedin.com/in/pratik24702'
                target='_blank'
                rel='noreferrer'
                aria-label='LinkedIn'
                className='text-white/55 hover:text-white hover:-translate-y-1 transition-all duration-300'
              >
                <FaLinkedin className='text-[26px]' />
              </a>

              <span className='w-px bg-white/15 self-stretch my-1' />

              <a
                href={RESUME}
                download='Pratik-Raje-Resume.pdf'
                aria-label='Download resume as PDF'
                title='Download PDF'
                className='text-white/55 hover:text-white hover:-translate-y-1 transition-all duration-300'
              >
                <BsCloudDownload className='text-[26px]' />
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: EASE }}
            className='flex-1'
          >
            <div className='rounded-xl border border-white/15 bg-[#0d0912]/80 backdrop-blur-sm overflow-hidden font-secondary'>
              <div className='flex items-center gap-x-2 px-4 py-3 border-b border-white/10 bg-white/[0.03]'>
                <span className='h-3 w-3 rounded-full bg-[#ff5f57]' />
                <span className='h-3 w-3 rounded-full bg-[#febc2e]' />
                <span className='h-3 w-3 rounded-full bg-[#28c840]' />
                <span className='ml-3 text-[13px] text-white/40 font-primary tracking-wide'>
                  pratik@portfolio — contact
                </span>
              </div>

              {status === 'sent' ? (
                <div role='status' className='p-5 lg:p-6 min-h-[360px] text-[14px]'>
                  <div className='flex gap-x-2 mb-4'>
                    <span className='text-[#28c840]'>$</span>
                    <span className='text-white/90'>contact {activeFlag}</span>
                  </div>
                  <p className='text-[#28c840] mb-4'>
                    ✓ sent — delivered to {EMAIL}
                  </p>
                  <p className='text-white/65 leading-[1.7] mb-2 max-w-[46ch]'>
                    Thanks {values.name.trim().split(' ')[0]}. I'll reply to{' '}
                    <span className='text-white/90'>{values.email.trim()}</span>,
                    usually within a day.
                  </p>
                  <p className='text-white/40 leading-[1.7] mb-6 max-w-[46ch]'>
                    If it is urgent, email me directly — it reaches me faster than
                    this does.
                  </p>
                  <div className='flex gap-x-2'>
                    <span className='text-[#28c840]'>$</span>
                    <button
                      type='button'
                      onClick={() => {
                        setValues({
                          name: '',
                          email: '',
                          message: '',
                          reason: REASONS[0].value,
                        });
                        setTouched({});
                        setStatus('idle');
                        requestAnimationFrame(() => firstFieldRef.current?.focus());
                      }}
                      className='text-white/45 hover:text-white transition-colors'
                    >
                      contact --again
                    </button>
                  </div>
                </div>
              ) : (
                <form
                  action={ENDPOINT}
                  method='POST'
                  noValidate
                  onSubmit={onSubmit}
                  className='p-5 lg:p-6 text-[14px]'
                >
                  {/* The command line doubles as the reason selector: picking
                      a flag is the same gesture as choosing a category. */}
                  <div className='flex flex-wrap items-baseline gap-x-2 gap-y-2 mb-5'>
                    <span className='text-[#28c840]'>$</span>
                    <span className='text-white/90'>contact</span>
                    {REASONS.map((r) => {
                      const on = values.reason === r.value;
                      return (
                        <button
                          key={r.value}
                          type='button'
                          aria-pressed={on}
                          title={r.value}
                          onClick={() =>
                            setValues((v) => ({ ...v, reason: r.value }))
                          }
                          className={
                            'px-2 py-0.5 rounded transition-colors ' +
                            (on
                              ? 'bg-accent/20 text-white'
                              : 'text-white/50 hover:text-white/80')
                          }
                        >
                          {r.flag}
                        </button>
                      );
                    })}
                  </div>

                  <div className='flex flex-col gap-y-1'>
                    <Row
                      id='contact-name'
                      prompt='name'
                      error={errors.name}
                      touched={touched.name}
                    >
                      <input
                        ref={firstFieldRef}
                        id='contact-name'
                        type='text'
                        name='name'
                        placeholder='your name'
                        value={values.name}
                        onChange={onChange}
                        onBlur={onBlur}
                        autoComplete='name'
                        required
                        className={inputClass('name')}
                        {...a11y('name')}
                      />
                    </Row>

                    <Row
                      id='contact-email'
                      prompt='email'
                      error={errors.email}
                      touched={touched.email}
                    >
                      <input
                        id='contact-email'
                        type='email'
                        name='email'
                        placeholder='you@company.com'
                        value={values.email}
                        onChange={onChange}
                        onBlur={onBlur}
                        autoComplete='email'
                        required
                        className={inputClass('email')}
                        {...a11y('email')}
                      />
                    </Row>

                    <Row
                      id='contact-message'
                      prompt='message'
                      error={errors.message}
                      touched={touched.message}
                    >
                      <textarea
                        id='contact-message'
                        name='message'
                        rows='4'
                        placeholder='what is on your mind'
                        value={values.message}
                        onChange={onChange}
                        onBlur={onBlur}
                        required
                        className={inputClass('message') + ' resize-none leading-[1.7]'}
                        {...a11y('message')}
                      />
                    </Row>
                  </div>

                  <div className='flex flex-wrap items-center gap-x-4 gap-y-3 mt-4 pt-4 border-t border-white/10'>
                    <button
                      type='submit'
                      disabled={status === 'sending'}
                      className='px-4 py-1.5 rounded border border-accent/60 text-white bg-accent/15 hover:bg-accent/25 transition-colors disabled:opacity-60 disabled:cursor-wait'
                    >
                      {status === 'sending' ? 'sending…' : 'send ⏎'}
                    </button>

                    {status === 'error' ? (
                      <p role='alert' className='text-[13px] text-[#ff6b8a]'>
                        failed to send —{' '}
                        <a
                          href={'mailto:' + EMAIL}
                          className='underline hover:text-white transition-colors'
                        >
                          email me instead
                        </a>
                      </p>
                    ) : (
                      <span className='text-[12.5px] text-white/45'>
                        goes straight to my inbox
                      </span>
                    )}
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
