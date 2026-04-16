import { useActionState } from 'react';

async function contactAction(previousState, formData) {
  await new Promise((resolve) => setTimeout(resolve, 400));
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

export default function Form3() {
  const [, action, isPending] = useActionState(contactAction, null);

  return (
    <div style={cardStyle}>
      <form
        action={action}
        onInvalid={(e) => {
          e.target.setCustomValidity(formatError(e.target));
        }}
        onInput={(e) => {
          e.target.setCustomValidity('');
        }}
        style={formStyle}
      >
        <h6>Custom message</h6>
        <div style={fieldGroupStyle}>
          <label htmlFor="name-2" style={labelStyle}>
            Name
          </label>
          <input
            id="name-2"
            name="name"
            required
            minLength={2}
            pattern="[A-Za-z\s]+"
            style={fieldStyle}
          />
        </div>

        <div style={fieldGroupStyle}>
          <label htmlFor="email-2" style={labelStyle}>
            Email
          </label>
          <input
            id="email-2"
            name="email"
            type="email"
            required
            style={fieldStyle}
          />
        </div>

        <div style={fieldGroupStyle}>
          <label htmlFor="message-2" style={labelStyle}>
            Message
          </label>
          <textarea
            id="message-2"
            name="message"
            required
            minLength={10}
            style={{
              ...fieldStyle,
              minHeight: 90,
              resize: 'vertical',
            }}
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
