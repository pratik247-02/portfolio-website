import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const EASE = [0.16, 1, 0.3, 1];

// Deliberately stricter than type="email", which accepts "a@b". Requires a
// dotted domain with a 2+ character TLD, which is what a real address has.
const EMAIL_RE = /^[^\s@]+@[^\s@.]+(\.[^\s@.]+)*\.[a-z]{2,}$/i;

const validators = {
  name: (v) => {
    if (!v.trim()) return 'Please enter your name.';
    if (v.trim().length < 2) return 'That name looks too short.';
    return '';
  },
  email: (v) => {
    if (!v.trim()) return 'Please enter your email.';
    if (!EMAIL_RE.test(v.trim())) return 'That does not look like a valid email address.';
    return '';
  },
  message: (v) => (v.trim() ? '' : 'Please write a message.'),
};

const Field = ({ id, label, error, touched, children }) => {
  const invalid = Boolean(touched && error);
  return (
    <div>
      <label className='sr-only' htmlFor={id}>
        {label}
      </label>
      {children}
      {/* Reserve the row so the form does not jump as errors appear. */}
      <p
        id={id + '-error'}
        role={invalid ? 'alert' : undefined}
        className={
          'text-[13px] mt-2 min-h-[18px] transition-colors ' +
          (invalid ? 'text-[#ff6b8a]' : 'text-transparent')
        }
      >
        {invalid ? error : ' '}
      </p>
    </div>
  );
};

const Contact = () => {
  const [values, setValues] = useState({ name: '', email: '', message: '' });
  const [touched, setTouched] = useState({});

  const errors = {
    name: validators.name(values.name),
    email: validators.email(values.email),
    message: validators.message(values.message),
  };
  const hasErrors = Object.values(errors).some(Boolean);

  const onChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
  };

  const onBlur = (e) => {
    const { name } = e.target;
    setTouched((t) => ({ ...t, [name]: true }));
  };

  const onSubmit = (e) => {
    // Mark everything touched so every outstanding error becomes visible,
    // then let the browser navigate to getform only when the form is clean.
    setTouched({ name: true, email: true, message: true });
    if (hasErrors) e.preventDefault();
  };

  const fieldClass = (field) => {
    const invalid = touched[field] && errors[field];
    return (
      'w-full bg-transparent border-b py-3 px-1 focus:outline-none transition-colors placeholder-white/35 text-white ' +
      (invalid
        ? 'border-[#ff6b8a] focus:border-[#ff6b8a]'
        : 'border-white/20 focus:border-accent')
    );
  };

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
              Open to SDE roles across frontend, backend and full-stack. The fastest
              way to reach me is email.
            </p>

            <a
              href='mailto:rajepratik2407@gmail.com'
              className='inline-flex items-center gap-x-3 text-[19px] text-white/85 hover:text-white group mb-10'
            >
              <FaEnvelope className='text-accent' />
              <span className='border-b border-white/25 group-hover:border-accent transition-colors pb-1'>
                rajepratik2407@gmail.com
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
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: EASE }}
            className='flex-1 border border-white/15 rounded-2xl bg-white/[0.02] backdrop-blur-sm flex flex-col gap-y-3 p-7 lg:p-9'
            action='https://getform.io/f/04b31b58-e1ed-46ac-9d04-c1ea613fa881'
            method='POST'
            noValidate
            onSubmit={onSubmit}
          >
            <Field id='contact-name' label='Your name' error={errors.name} touched={touched.name}>
              <input
                id='contact-name'
                type='text'
                name='name'
                placeholder='Your name'
                value={values.name}
                onChange={onChange}
                onBlur={onBlur}
                required
                className={fieldClass('name')}
                {...a11y('name')}
              />
            </Field>

            <Field id='contact-email' label='Your email' error={errors.email} touched={touched.email}>
              <input
                id='contact-email'
                type='email'
                name='email'
                placeholder='Your email'
                value={values.email}
                onChange={onChange}
                onBlur={onBlur}
                required
                autoComplete='email'
                className={fieldClass('email')}
                {...a11y('email')}
              />
            </Field>

            <Field
              id='contact-message'
              label='Your message'
              error={errors.message}
              touched={touched.message}
            >
              <textarea
                id='contact-message'
                name='message'
                rows='4'
                placeholder='Your message'
                value={values.message}
                onChange={onChange}
                onBlur={onBlur}
                required
                className={fieldClass('message') + ' resize-none'}
                {...a11y('message')}
              />
            </Field>

            <button type='submit' className='btn btn-lg self-start mt-2'>
              Send Message
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
