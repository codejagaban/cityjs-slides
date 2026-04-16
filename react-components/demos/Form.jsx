import { useActionState } from 'react';

async function contactAction(previousState, formData) {
  await new Promise((resolve) => setTimeout(resolve, 400));
  return previousState;
}

export default function ContactDemoStep1Simple() {
  const [, action] = useActionState(contactAction, null);

  return (
    <div style={cardStyle}>
      <form action={action} style={formStyle}>
        <p>Simple validation</p>
        <div style={fieldGroupStyle}>
          <label htmlFor="name" style={labelStyle}>
            Name
          </label>
          <input id="name" name="name" required style={fieldStyle} />
        </div>
        <div style={fieldGroupStyle}>
          <label htmlFor="email" style={labelStyle}>
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            style={fieldStyle}
          />
        </div>
        <div style={fieldGroupStyle}>
          <label htmlFor="message" style={labelStyle}>
            Message
          </label>
          <textarea
            id="message"
            name="message"
            required
            style={{ ...fieldStyle, minHeight: 90, resize: 'vertical' }}
          />
        </div>
        <button type="submit" style={buttonStyle(false)}>
          Send
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
