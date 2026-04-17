import { useActionState, useRef } from 'react';

async function contactAction(previousState, formData) {
  // Replace with your real submit logic.
  return previousState;
}

function formatError(field) {
  switch (field.name) {
    case 'name':
      if (field.validity.valueMissing) return 'Name is required';
      if (field.validity.tooShort)
        return `Name must be at least ${field.minLength} characters`;
      if (field.validity.patternMismatch)
        return 'Name should only contain letters and spaces';
      return '';
    case 'email':
      if (field.validity.valueMissing) return 'Email is required';
      if (field.validity.typeMismatch)
        return 'Please enter a valid email address';
      return '';
    case 'message':
      if (field.validity.valueMissing) return 'Message is required';
      if (field.validity.tooShort)
        return `Message must be at least ${field.minLength} characters`;
      return '';
    default:
      return '';
  }
}

export default function Form5() {
  const [, action, isPending] = useActionState(contactAction, null);

  const errorRefs = useRef({});

  function setErrorRef(name) {
    return (node) => {
      errorRefs.current[name] = node;
    };
  }

  function validate(e) {
    e.preventDefault();
    const field = e.target;
    field.setCustomValidity('');
    const errorEl = errorRefs.current[field.name];
    if (!errorEl) return;

    const error = field.checkValidity() ? '' : formatError(field);
    field.setCustomValidity(error);
    errorEl.textContent = error;
  }

  return (
    <div style={cardStyle}>
      <form
        action={action}
        style={formStyle}
        onInvalid={validate}
        onBlur={validate}
      >
        <p>Custom message with ref </p>
        <div style={fieldGroupStyle}>
          <label htmlFor="name-4" style={labelStyle}>
            Name
          </label>
          <input
            id="name-4"
            name="name"
            required
            minLength={2}
            pattern="[A-Za-z\s]+"
            style={fieldStyle}
          />
          <span
            ref={setErrorRef('name')}
            style={errorStyle}
            aria-live="polite"
          />
        </div>

        <div style={fieldGroupStyle}>
          <label htmlFor="email-4" style={labelStyle}>
            Email
          </label>
          <input
            id="email-4"
            name="email"
            type="email"
            required
            style={fieldStyle}
          />
          <span
            ref={setErrorRef('email')}
            style={errorStyle}
            aria-live="polite"
          />
        </div>

        <div style={fieldGroupStyle}>
          <label htmlFor="message-4" style={labelStyle}>
            Message
          </label>
          <textarea
            id="message-4"
            name="message"
            required
            minLength={10}
            style={{
              ...fieldStyle,
              minHeight: 90,
              resize: 'vertical',
            }}
          />
          <span
            ref={setErrorRef('message')}
            style={errorStyle}
            aria-live="polite"
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          style={buttonStyle(isPending)}
        >
          {isPending ? 'Sending...' : 'Send'}
        </button>
      </form>
    </div>
  );
}

const cardStyle = {
  padding: 24,
  background: 'rgba(0,0,0,.3)',
  borderRadius: 8,
  border: '1px solid rgba(255,255,255,.12)',
};

const formStyle = {
  display: 'grid',
  gap: 12,
};

const fieldGroupStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
};

const labelStyle = {
  fontSize: 13,
  fontWeight: 500,
  color: 'rgba(255,255,255,.8)',
};

const fieldStyle = {
  width: '100%',
  padding: '10px 12px',
  borderRadius: 6,
  border: '2px solid rgba(255,255,255,.2)',
  background: 'rgba(0,0,0,.4)',
  color: '#fff',
  fontSize: 14,
  fontFamily: 'inherit',
  outline: 'none',
  transition: 'border-color 0.2s',
};

const errorStyle = {
  color: '#f87171',
  fontSize: 12,
  margin: 0,
};

const buttonStyle = (disabled) => ({
  width: '100%',
  padding: '10px 12px',
  borderRadius: 6,
  border: 0,
  color: '#fff',
  fontWeight: 600,
  background: disabled ? '#6b7280' : '#2563eb',
  cursor: disabled ? 'not-allowed' : 'pointer',
});
