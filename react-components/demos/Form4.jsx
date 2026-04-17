import { useActionState, useState } from 'react';

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

export default function Form4() {
  // We use the first value (state) to capture server-side feedback
  const [serverState, action, isPending] = useActionState(contactAction, null);
  const [errors, setErrors] = useState({});

  return (
    <div style={cardStyle}>
      <form
        action={action}
        style={formStyle}
        noValidate
        onInvalid={event => {
        const input = event.target;

        setErrors((error) => ({
          ...error,
          [input.name]: input.validationMessage,
        }));

        event.preventDefault();
      }}
      onSubmit={event => {
        const form = event.currentTarget;

        for (const input of form.elements) {
          if (input instanceof HTMLInputElement || input instanceof HTMLTextAreaElement) {
            input.setCustomValidity(formatError(input));
          }
        }

        setErrors({});

        if (!form.reportValidity()) {
          event.preventDefault();
        }
      }}
      >
        <h6>Custom message with state management</h6>
        <div style={fieldGroupStyle}>
          <label htmlFor="name-3" style={labelStyle}>
            Name
          </label>
          <input
            id="name-3"
            name="name"
            required
            minLength={2}
            pattern="[A-Za-z\s]+"
            style={fieldStyle}
          />
          {errors.name && <p style={errorStyle}>{errors.name}</p>}
        </div>

        <div style={fieldGroupStyle}>
          <label htmlFor="email-3" style={labelStyle}>
            Email
          </label>
          <input
            id="email-3"
            name="email"
            type="email"
            required
            style={fieldStyle}
          />
          {errors.email && <p style={errorStyle}>{errors.email}</p>}
        </div>

        <div style={fieldGroupStyle}>
          <label htmlFor="message-3" style={labelStyle}>
            Message
          </label>
          <textarea
            id="message-3"
            name="message"
            required
            minLength={10}
            style={{
              ...fieldStyle,
              minHeight: 90,
              resize: 'vertical',
            }}
          />
          {errors.message && <p style={errorStyle}>{errors.message}</p>}
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
