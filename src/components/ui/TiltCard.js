import React, { useRef, useCallback } from 'react';

/**
 * A card that tilts toward the cursor and tracks it with a soft radial
 * highlight.
 *
 * Pointer position is written straight to CSS custom properties on the
 * element rather than through React state — a state update per pointermove
 * would re-render the subtree on every frame. The transform is applied in a
 * rAF so multiple moves within one frame collapse into a single write.
 */
const TiltCard = ({ children, className = '', intensity = 6, ...rest }) => {
  const ref = useRef(null);
  const frameRef = useRef(0);
  const pendingRef = useRef(null);

  const apply = useCallback(() => {
    frameRef.current = 0;
    const el = ref.current;
    const p = pendingRef.current;
    if (!el || !p) return;
    el.style.setProperty('--mx', p.mx + '%');
    el.style.setProperty('--my', p.my + '%');
    el.style.transform =
      'perspective(900px) rotateX(' + p.rx + 'deg) rotateY(' + p.ry + 'deg) translateY(-4px)';
  }, []);

  const onPointerMove = useCallback(
    (e) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      pendingRef.current = {
        mx: (px * 100).toFixed(2),
        my: (py * 100).toFixed(2),
        ry: ((px - 0.5) * intensity * 2).toFixed(2),
        rx: (-(py - 0.5) * intensity * 2).toFixed(2),
      };
      if (!frameRef.current) frameRef.current = requestAnimationFrame(apply);
    },
    [apply, intensity]
  );

  const onPointerLeave = useCallback(() => {
    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = 0;
    }
    const el = ref.current;
    if (!el) return;
    el.style.transform = '';
    el.style.setProperty('--mx', '50%');
    el.style.setProperty('--my', '50%');
  }, []);

  return (
    <div
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className={'tilt-card ' + className}
      {...rest}
    >
      {children}
    </div>
  );
};

export default TiltCard;
