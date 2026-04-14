import { useRef, useCallback } from 'react';

export function useErrors(formatError) {
  const errorRefs = useRef({});

  const validateField = useCallback((name) => ({
    name,
    onInvalid(e) {
      e.preventDefault();
      const field = e.target;
      field.setCustomValidity(formatError(field));
      const el = errorRefs.current[name];
      if (el) {
        el.textContent = field.validationMessage;
        el.style.display = 'block';
      }
    },
    onInput(e) {
      e.target.setCustomValidity('');
      const el = errorRefs.current[name];
      if (el) {
        el.textContent = '';
        el.style.display = 'none';
      }
    },
  }), [formatError]);

  function ErrorMessage({ name }) {
    return (
      <p
        ref={(el) => { errorRefs.current[name] = el; }}
        style={{ display: 'none', color: '#f87171', fontSize: 12, margin: 0 }}
      />
    );
  }

  return { validateField, ErrorMessage };
}
