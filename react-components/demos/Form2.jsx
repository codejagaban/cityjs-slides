import { useActionState } from 'react';

async function contactAction(previousState, formData) {
  await new Promise((resolve) => setTimeout(resolve, 400));
  return previousState;
}

export default function Form2() {
  const [, action, isPending] = useActionState(contactAction, null);

  return (
    <div style={cardStyle} className="css-form">
      <style>{cssValidation}</style>
      <form action={action} style={formStyle}>
        <h6>Simple validation but with custom messages</h6>
        <fieldset style={fieldsetStyle}>
          <label htmlFor="name-5" style={labelStyle}>
            Name
          </label>
          <input
            id="name-5"
            name="name"
            required
            minLength={2}
            pattern="[A-Za-z\s]+"
            style={fieldStyle}
          />
          <span aria-live="polite" style={errorStyle}>
            Name is required
          </span>
        </fieldset>

        <fieldset style={fieldsetStyle}>
          <label htmlFor="email-5" style={labelStyle}>
            Email
          </label>
          <input
            id="email-5"
            name="email"
            type="email"
            required
            style={fieldStyle}
          />
          <span aria-live="polite" style={errorStyle}>
            Valid email required
          </span>
        </fieldset>

        <fieldset style={fieldsetStyle}>
          <label htmlFor="message-5" style={labelStyle}>
            Message
          </label>
          <textarea
            id="message-5"
            name="message"
            required
            minLength={10}
            style={{
              ...fieldStyle,
              minHeight: 90,
              resize: 'vertical',
            }}
          />
          <span aria-live="polite" style={errorStyle}>
            Message is required (min 10 chars)
          </span>
        </fieldset>

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

const cssValidation = `
  .css-form [aria-live="polite"] {
    display: none;
  }

  .css-form fieldset:has(:user-invalid) [aria-live="polite"] {
    display: block;
  }

  .css-form fieldset:has(:user-invalid) input,
  .css-form fieldset:has(:user-invalid) textarea {
    border-color: #ef4444 !important;
  }

  .css-form fieldset:has(:user-valid) input,
  .css-form fieldset:has(:user-valid) textarea {
    border-color: #22c55e !important;
  }
`;

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

const fieldsetStyle = {
  border: 'none',
  padding: 0,
  margin: 0,
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
