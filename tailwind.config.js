module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontFamily: {
      primary: 'Orbitron',
      secondary: 'Rajdhani',
      tertiary: 'Aldrich',
      // Orbitron and Rajdhani carry no Devanagari glyphs, so नमस्कार was
      // falling back to whatever the OS supplied — Nirmala UI on Windows,
      // something else everywhere else.
      devanagari: ['Noto Sans Devanagari', 'sans-serif'],
    },
    container: {
      padding: {
        DEFAULT: '15px',
      },
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '960px',
      xl: '1200px',
    },
    extend: {
      colors: {
        primary: '#0a0a0a',
        accent: '#B809C3',
      },
      backgroundImage: {
        // Was a 556 KB / 1600x6620 JPEG that decoded to a near-flat purple
        // wash: sampled across its height it only ever moved between #1f0b3a
        // and #311b54, with a max per-pixel deviation of 35/255 from each
        // row's average. These stops are taken from that sampling, so the
        // page looks the same and the largest asset on the site is gone.
        // The radial layer reproduces the faint edge brightening the photo
        // had; the linear one is the vertical wash.
        site:
          'radial-gradient(1200px 800px at 50% 0%, #311b54 0%, rgba(49,27,84,0) 60%), ' +
          'linear-gradient(180deg, #1f0b3a 0%, #29104a 22%, #2d1f56 50%, #200f43 74%, #23144b 100%)',
      },
    },
  },
  plugins: [],
};
