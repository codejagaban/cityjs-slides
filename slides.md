---
layout: image
image: /jamin.png
backgroundSize: cover
backgroundPosition: center
class: cover-slide
highlighter: shiki
shiki:
  theme: material-theme-darker
css: unocss
colorSchema: dark
transition: fade-out
title: Replacing Form Libraries with Native Web APIs
exportFilename: CityJS 2026 - Replacing Form Libraries
lineNumbers: true
drawings:
  persist: false
mdc: true
clicks: 0
preload: true
glowSeed: 229
routerMode: hash
contextMenu: true
comark: true
fonts:
  sans: Bricolage Grotesque
  mono: JetBrains Mono
addons:
  - slidev-addon-react
---

<!--
Hey everyone! I'm Trust Jamin, and today we're going to talk about something that might change how you think about building forms in React. We're going to look at how far native web APIs have come — and whether we still need form libraries for most of what we build.
-->

---
layout: center
glowSeed: 10
---

<img src="/uc-logo.png" w-30 absolute top-6 right-6 />

<div flex items-center gap-12>

<div flex flex-col gap-3>
  <h1 text-4xl font-extrabold>Trust Jamin Okpukoro</h1>
  <p text-lg op-60>Developer Advocate at Uploadcare</p>
  <div flex gap-3 mt-2 op-40 text-sm>
    <span>@codejagaban</span>
  </div>
</div>

</div>

<!--
Quick intro — I'm a Developer Advocate at Uploadcare, where we handle file uploading, processing, and delivery. You can find me online as @codejagaban. Now let's dive in.
-->

---
glowSeed: 14
---
# Agenda

<div pt-6 flex flex-col gap-5>

<div v-click flex items-center gap-4>
  <div w-10 h-10 rounded-full bg-blue-500 bg-op-20 flex items-center justify-center font-bold text-blue-400>1</div>
  <div>
    <div font-semibold text-lg>Managing Form in React is Hard</div>
    <div text-sm op-50>Why we use form libraries</div>
  </div>
</div>

<div v-click flex items-center gap-4>
  <div w-10 h-10 rounded-full bg-green-500 bg-op-20 flex items-center justify-center font-bold text-green-400>2</div>
  <div>
    <div font-semibold text-lg>What if we could do this with native APIs?</div>
    <div text-sm op-50>Exploring the possibilities</div>
  </div>
</div>

<div v-click flex items-center gap-4>
  <div w-10 h-10 rounded-full bg-orange-500 bg-op-20 flex items-center justify-center font-bold text-orange-400>3</div>
  <div>
    <div font-semibold text-lg>Constraints Validation API</div>
    <div text-sm op-50>Native browser API for form validation</div>
  </div>
</div>

<div v-click flex items-center gap-4>
  <div w-10 h-10 rounded-full bg-purple-500 bg-op-20 flex items-center justify-center font-bold text-purple-400>4</div>
  <div>
      <div font-semibold text-lg>The Native Combo</div>
    <div text-sm op-50>Constraint Validation API + React 19 Form Actions</div>
  </div>
</div>

<div v-click flex items-center gap-4>
  <div w-10 h-10 rounded-full bg-cyan-500 bg-op-20 flex items-center justify-center font-bold text-cyan-400>5</div>
  <div>
    <div font-semibold text-lg>Benefits / Trade-offs</div>
    <div text-sm op-50>What you gain and what you might lose</div>
  </div>
</div>

<div v-click flex items-center gap-4>
  <div w-10 h-10 rounded-full bg-cyan-500 bg-op-20 flex items-center justify-center font-bold text-zinc-400>6</div>
  <div>
    <div font-semibold text-lg>Migration Path</div>
    <div text-sm op-50>Something you can try out this weekend</div>
  </div>
</div>

</div>

<!--
Here's the roadmap for today. We'll start by understanding why forms in React are painful, then explore what native APIs can do, see live demos of the Constraint Validation API and React 19 Form Actions working together, look at real performance numbers, and finish with a practical migration path you can start this weekend.
-->

---
layout: center
glowSeed: 42
title: The Cost of "Convenience"
---
<div>
<!-- <p text-sm uppercase tracking-widest op-40 mb-2>Chapter 01</p> -->

<h1>
Managing Forms in React is Hard
</h1>

<p text-lg op-50 mt-4>Managing form state and validation logic in React is hard.</p>
</div>

<!--
Let's be real — if you've ever built a non-trivial form in React, you know the pain. Controlled inputs, validation state, error messages, touched fields, submit handling — it's a lot of boilerplate. That's exactly why form libraries exist. But let's look at what they actually cost us.
-->

---
glowSeed: 55
layout: center
---

 <h1 leading-loose>
  What if we could build forms <br> with <i>just</i> Web native APIs?
</h1>

<div v-click text-base op-40 text-center mt-8>
What if we could build forms without using a form library?
</div>

---
glowSeed: 100
---

<!-- .slide: <speaker-note>APIs like Constraint Validation and React 19 Form Actions are shipping everywhere *soon*—but always check caniuse.com for your audience.</speaker-note> -->
# The 2026 Platform Baseline

<div pt-4>

| API | Chrome | Firefox | Safari | Replaces |
|---|---|---|---|---|
| Constraint Validation | ✓ | ✓ | ✓ | Most validation use-cases |
| React 19 Form Actions | ✓ | ✓ | ✓ | Most state management for forms |
| `:user-valid` / `:user-invalid` | ✓ | ✓ | ✓ | touched / dirty state |

</div>

<!--
Here's the good news — all three major browsers fully support these APIs in 2026. The Constraint Validation API has actually been around for years, but most React developers never use it because form libraries abstract it away. The new CSS pseudo-classes user-valid and user-invalid replace the "touched" and "dirty" tracking that libraries do in JavaScript. And React 19 Form Actions give us native async submit handling. This is the baseline we can build on.
-->

---
glowSeed: 88
---

# The Constraint Validation API

<div grid grid-cols-2 gap-8 pt-4>

<div v-click>

<div class="code-sample-sx">
```js
<input
  name="email" type="email"
  required
/>
```

```js
// ValidityState object
{
  "input.validity.badInput"
  false "input.validity.patternMismatch"
  false "input.validity.stepMismatch"
  false "input.validity.valueMissing"
  false "input.validity.typeMismatch"
  false "input.validity.valid"
  true
}
// Custom validation
input.setCustomValidity("Email address must end with @example.com");
```
</div>
</div>

<div flex flex-col gap-3 pt-2>

<div v-click flex items-center gap-2>
  <div i-ph:check-circle text-green-400 />
  <span>Pattern matching via regex</span>
</div>

<div v-click flex items-center gap-2>
  <div i-ph:check-circle text-green-400 />
  <span>Range checking (min, max, step)</span>
</div>

<div v-click flex items-center gap-2>
  <div i-ph:check-circle text-green-400 />
  <span>Custom validity messages</span>
</div>

<div v-click flex items-center gap-2>
  <div i-ph:check-circle text-green-400 />
  <span>Real-time validity state object</span>
</div>

<div v-click flex items-center gap-2>
  <div i-ph:check-circle text-green-400 />
  <span font-semibold text-green-300>Runs in the browser engine</span>
</div>

</div>

</div>

<!--
This is the Constraint Validation API. When you add attributes like required, type="email", minLength, or pattern to an input, the browser creates a ValidityState object that tells you exactly what's wrong. You can also call setCustomValidity to set your own error messages. The key thing here — and this is important — is that this validation runs in the browser engine, in C++, not in your JavaScript bundle. It's faster than any JS validation library could ever be.
-->

---
glowSeed: 100
---

# React 19 Form Actions

<div grid grid-cols-2 gap-4 pt-2>

<div class="code-sample-sx">
<div v-click  >

```jsx{1,4,7,12}
import { useActionState } from "react";

function ContactForm() {
  const [, formAction, isPending] = useActionState(contactAction, null);

  return (
    <form action={formAction}>
      <input name="name" required />
      <input name="email" type="email" required />
      <textarea name="message" required minLength={10} />
      <button type="submit" disabled={isPending}>
        {isPending ? "Sending..." : "Send"}
      </button>
    </form>
  );
}

```
</div>
</div>

<div flex flex-col gap-3 pt-2>

<div v-click flex items-center gap-2>
  <div i-ph:check-circle text-blue-400 />
  <span><code>&lt;form action={fn}&gt;</code> accepts functions</span>
</div>

<div v-click flex items-center gap-2>
  <div i-ph:check-circle text-blue-400 />
  <span>Auto-receives native FormData</span>
</div>

<div v-click flex items-center gap-2>
  <div i-ph:check-circle text-blue-400 />
  <span><code>useActionState</code> for pending + errors</span>
</div>

<div v-click flex items-center gap-2>
  <div i-ph:check-circle text-blue-400 />
  <span>No controlled inputs = fewer re-renders</span>
</div>

</div>

</div>

<!--
Now the other half of the combo — React 19 Form Actions. The form element can now accept a function as its action prop. When the user submits, React calls your function with native FormData — no controlled inputs, no onChange handlers, no state management. useActionState gives you a pending boolean for loading states and a way to return errors from the server. Notice how clean this code is compared to the useForm plus zodResolver plus handleSubmit pattern we're used to.
-->

---
glowSeed: 105
transition: none
---

<div grid grid-cols-5 gap-8 pt-2>

<div grid-col-span-2>
<React is="Form" />
</div>

<div grid-col-span-3>

<div class="code-sample-sx">

````md magic-move

```jsx{11,16,21}
import { useActionState } from "react";

export default function ContactForm() {
  const [state, action, isPending] = useActionState(contactAction, null);

  return (
    <div>
      <form action={action}>
        <div>
          <label htmlFor="name">Name</label>
          <input id="name" name="name" required />
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" required />
        </div>

        <div>
          <label htmlFor="message">Message</label>
          <textarea id="message" name="message" required minLength={10} />
        </div>

        <button type="submit" disabled={isPending}>
          {isPending ? "Sending..." : "Send"}
        </button>
      </form>
    </div>
  );
}
```
```css
:is(input, textarea, select):user-invalid {
  border: 1px solid #ef4444;
}

:is(input, textarea, select):user-valid {
  border: 1px solid #22c55e;
}
```
````

</div>

</div>

</div>

---
glowSeed: 105
transition: none
---

<div grid grid-cols-5 gap-8 pt-2>

<div grid-col-span-2>
<React is="Form2" />
</div>

<div grid-col-span-3>

<div class="code-sample-sx">

```html{12-14}
<fieldset>
  <label htmlFor="name">
    Name
  </label>
  <input
    id="name"
    name="name"
    required
    minLength={2}
    pattern="[A-Za-z\s]+"
  />
  <span aria-live="polite">
    Name is required
  </span>
</fieldset>
```

```css{2,7,12}
/* Error messages hidden by default */
[aria-live='polite'] { display: none; }

/* Show error when field is invalid
   after user interaction */
fieldset:has(:user-invalid) {
  [aria-live='polite'] { display: block; }
}

/* Red border on invalid fields */
fieldset:has(:user-invalid) input {
  border: 2px solid red;
}

/* Green border on valid fields */
fieldset:has(:user-valid) input {
  border: 2px solid green;
}
```

</div>

</div>

</div>

<!--
Here's something wild — we can show and hide custom error messages using only CSS. We put the error text in a span with aria-live, hide it by default, then use the :has selector combined with :user-invalid to show it only after the user interacts with the field. No JavaScript, no state, no re-renders. The :user-invalid pseudo-class is key — it only fires after user interaction, not on page load.
-->

---
glowSeed: 106
transition: none
---

<div grid grid-cols-5 gap-8 pt-2>

<div grid-col-span-2>
<React is="Form3" />
</div>

<div grid-col-span-3>

<div class="code-sample-sx">

````md magic-move

```jsx{14-16}
import { useActionState } from 'react';

async function contactAction(previousState, formData) {
  ...
}

export default function ContactForm() {
  const [state, action, isPending] = useActionState(contactAction, null);

  return (
    <div>
      <form
        action={action}
        onInvalid={(e) => {
          e.target.setCustomValidity(formatError(e.target));
        }}
      >
        <div>
          <label htmlFor="name">
            Name
          </label>
          <input
            id="name"
            name="name"
            required
            minLength={2}
            pattern="[A-Za-z\s]+"
          />
        </div>

        <div>
          <label htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
          />
        </div>
        {/* Rest part of form... */}
      </form>
    </div>
  );
}
```
```jsx
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
```
````

</div>

</div>

</div>

<!--
Now let's customize the error messages. Instead of the browser's default tooltips, we use the onInvalid event to call setCustomValidity with our own formatError function. This function reads the ValidityState object — valueMissing, typeMismatch, tooShort — and returns a human-friendly message. The browser still handles when to validate. We just control the message.
-->

---
glowSeed: 106
transition: none
---

<div grid grid-cols-5 gap-8 pt-2>
<div grid-col-span-2>
<React is="Form4" />
</div>

<div grid-col-span-3>

<div class="code-sample-sx">

````md magic-move {maxHeight:'600px'}

```jsx{1,5,12}
import { useActionState, useState } from "react";

export default function ContactForm() {
  const [state, action, isPending] = useActionState(contactAction, null);
  const [errors, setErrors] = useState({});

  return (
    <div>
      <form
        action={action}
        onInvalid={(e) => {
          e.preventDefault();
          const field = e.target;
          field.setCustomValidity(formatError(field));
        }}

      >
        <div>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            required
            minLength={2}
            pattern="[A-Za-z\s]+"
          />
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" required />
        </div>

        <div>
          <label htmlFor="message">
            Message
          </label>
          <textarea id="message" name="message" required minLength={10} />
        </div>

        <button type="submit" disabled={isPending}>
          {isPending ? "Sending..." : "Send"}
        </button>
      </form>
    </div>
  );
}
```
```jsx{15-18}
import { useActionState, useState } from "react";

export default function ContactForm() {
  const [state, action, isPending] = useActionState(contactAction, null);
  const [errors, setErrors] = useState({});

  return (
    <div>
      <form
        action={action}
        onInvalid={(e) => {
          e.preventDefault();
          const field = e.target;
          field.setCustomValidity(formatError(field));
          setErrors((prev) => ({
            ...prev,
            [field.name]: field.validationMessage,
          }));
        }}

      >
        <div>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            required
            minLength={2}
            pattern="[A-Za-z\s]+"
          />
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" required />
        </div>

        <div>
          <label htmlFor="message">
            Message
          </label>
          <textarea id="message" name="message" required minLength={10} />
        </div>

        <button type="submit" disabled={isPending}>
          {isPending ? "Sending..." : "Send"}
        </button>
      </form>
    </div>
  );
}
```
```jsx{25,31,39}

  return (
    <div>
      <form
        action={action}
        onInvalid={(e) => {
          e.preventDefault();
          const field = e.target;
          field.setCustomValidity(formatError(field));
          setErrors((prev) => ({
            ...prev,
            [field.name]: field.validationMessage,
          }));
        }}

      >
        <div>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            required
            minLength={2}
            pattern="[A-Za-z\s]+"
          />
          {errors.name && <p>{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" required />
          {errors.email && <p>{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="message">
            Message
          </label>
          <textarea id="message" name="message" required minLength={10} />
          {errors.message && <p>{errors.message}</p>}
        </div>

        <button type="submit" disabled={isPending}>
          {isPending ? "Sending..." : "Send"}
        </button>
      </form>
    </div>
  );
}
```
````

</div>

</div>

</div>

<!--
And here's the final step — rendering errors in our own UI instead of browser tooltips. We add useState for errors, and in the onInvalid handler we sync the validation message to React state. Then in the JSX, we conditionally render error paragraphs. This is one re-render per invalid field on submit — that's it. No form library, no schema library, just React and the browser working together.

For optimization, you could use a useRef hook to avoid multiple re-renders,
but the point is — you don't need a library to do this. The native APIs give you everything you need to build a fully featured form experience with just a few lines of code.
-->

<!-- “React encourages declarative UI, but it doesn’t forbid imperative code.
In this case, I’m intentionally keeping form state out of React to avoid unnecessary renders and to lean on native browser behavior.” -->

---
glowSeed: 109
---

# Validation Flows Compared

<div pt-2>
<div text-xs uppercase tracking-wide op-40 mb-4>Form 1 — Browser Default</div>

```mermaid
flowchart LR
  A[Form submitted] --> B[Browser validation]
  B -->|invalid| C[Native tooltip]
  B -->|valid| D[Submit event fired]
  style C fill:#854d0e,stroke:#ca8a04,color:#fef08a
  style D fill:#14532d,stroke:#22c55e,color:#86efac
```

</div>

<!--
Form 1 — the browser does everything. Submit triggers validation, invalid fields get native tooltips, valid forms fire the submit event. Zero code needed.
-->

---
glowSeed: 109
---

# Validation Flows Compared

<div pt-2>
<div text-xs uppercase tracking-wide op-40 mb-4>Form 2 — CSS Only</div>

```mermaid
flowchart LR
  A[User interacts] --> B[user-invalid fires]
  B --> C[has selector matches]
  C --> D[span displayed via CSS]
  style B fill:#581c87,stroke:#a855f7,color:#e9d5ff
  style D fill:#14532d,stroke:#22c55e,color:#86efac
```

<div text-sm op-50 mt-2>Zero JavaScript — CSS handles everything after user interaction.</div>
</div>

<!--
Form 2 — pure CSS. When the user interacts with a field, the :user-invalid pseudo-class fires. The :has() selector on the parent fieldset matches and shows the error span. No JavaScript, no state, no re-renders.
-->

---
glowSeed: 109
---

# Validation Flows Compared

<div pt-2>
<div text-xs uppercase tracking-wide op-40 mb-4>Form 3 — Custom Tooltip Messages</div>

```mermaid
flowchart LR
  A[Form submitted] --> B[Browser validation]
  B -->|invalid| C[onInvalid event]
  C --> D[setCustomValidity]
  D --> E[Custom tooltip shown]
  style D fill:#7c2d12,stroke:#f97316,color:#fed7aa
  style E fill:#854d0e,stroke:#ca8a04,color:#fef08a
```

</div>

<!--
Form 3 — we intercept the onInvalid event and call setCustomValidity with our own message from formatError. The browser still shows a tooltip, but with our custom text instead of the default.
-->

---
glowSeed: 109
---

# Validation Flows Compared

<div pt-2>
<div text-xs uppercase tracking-wide op-40 mb-4>Form 4 — useState Inline Errors</div>

```mermaid
flowchart LR
  A[Form submitted] --> B[onInvalid event]
  B --> C[preventDefault]
  C --> D[setErrors]
  D --> E[Re-render with error elements]
  style D fill:#1e3a5f,stroke:#3b82f6,color:#bfdbfe
  style E fill:#14532d,stroke:#22c55e,color:#86efac
```

<div text-sm op-50 mt-2>Suppresses native tooltip, syncs error to React state, renders inline.</div>
</div>

<!--
Form 4 — we suppress the native tooltip with preventDefault, store errors in React state with setErrors, and React re-renders to show error paragraphs inline beneath each field. This is the practical approach most teams will use.
-->

---
layout: center
glowSeed: 108
---

<div>

<h1 text-3xl mb-6>Are form errors even state?</h1>

<div grid grid-cols-2 gap-8 pt-2>

<div>
  <div font-semibold text-blue-400 mb-3>React’s “Thinking in React” rules:</div>
  <div flex flex-col gap-3>
    <div flex items-start gap-2>
      <div i-ph:check-circle text-green-400 mt-1 />
      <span text-sm>Does it change over time? <span op-50>Yes — errors appear and clear.</span></span>
    </div>
    <div flex items-start gap-2>
      <div i-ph:check-circle text-green-400 mt-1 />
      <span text-sm>Is it passed from a parent? <span op-50>No.</span></span>
    </div>
    <div flex items-start gap-2>
      <div i-ph:warning-circle text-yellow-400 mt-1 />
      <span text-sm>Can you compute it from existing data? <span font-semibold text-yellow-400>Yes.</span></span>
    </div>
  </div>
</div>

<div>
  <div font-semibold text-green-400 mb-3>The browser already knows:</div>

```js
// Always available on the DOM node
field.validity.valueMissing  // true/false
field.validity.typeMismatch  // true/false
field.validationMessage      // “Email is required”
```

  <div text-sm op-50 mt-3>Errors are derived from the DOM — not application state.</div>
</div>

</div>

</div>

<!--
Here’s something interesting. React’s own docs say: if you can compute it from existing data, it’s not state. With native validation, the browser always knows the error — field.validity and field.validationMessage are right there on the DOM node. So by React’s own definition, form errors aren’t state. We only store them in useState because we need to trigger a re-render to show error paragraphs. The browser is the real source of truth — we’re just syncing it into React.
  We only put errors in <code>useState</code> because we need React to re-render. The browser is the source of truth.
-->

---
layout: iframe
url: https://forms-comparison.vercel.app/
---
<!--
Let me show you this live. This is a side-by-side comparison app — Formik, React Hook Form, and our Web API approach. Watch the re-render counters as I type in each form. Notice how Formik’s counter climbs on every keystroke, while the native form stays at zero until I submit with invalid fields.
-->

---
glowSeed: 210
---

# Accessible by Default

<div pt-4 grid grid-cols-2 gap-6>

<div v-click flex items-start gap-3>
  <div i-ph:speaker-high text-2xl text-blue-400 mt-1 />
  <div>
    <div font-semibold>Screen readers announce most errors automatically</div>
    <div text-sm op-50>No custom aria wrappers needed for basic cases</div>
  </div>
</div>

<div v-click flex items-start gap-3>
  <div i-ph:code text-2xl text-blue-400 mt-1 />
  <div>
    <div font-semibold><code>aria-invalid</code> can be set by the browser</div>
    <div text-sm op-50>For most basic validation, no JS needed</div>
  </div>
</div>

<div v-click flex items-start gap-3>
  <div i-ph:cursor-click text-2xl text-blue-400 mt-1 />
  <div>
    <div font-semibold>Focus moves to first invalid field</div>
    <div text-sm op-50>On submit, automatically (in most browsers)</div>
  </div>
</div>

<div v-click flex items-start gap-3>
  <div i-logos:react text-2xl mt-1 />
  <div>
    <div font-semibold>React 19 preserves native semantics</div>
    <div text-sm op-50>Form actions don't break a11y</div>
  </div>
</div>

</div>

<!--
One thing I love about the native approach is that accessibility comes built in. Screen readers automatically announce validation errors from the Constraint Validation API. The browser sets aria-invalid on invalid fields. Focus automatically moves to the first invalid field on submit. And React 19's form actions preserve all of this native behavior — they don't break the semantics. For most forms, you get WCAG 2.1 AA compliance without writing a single aria attribute.
-->

---
glowSeed: 220
---

# Styling Native Validation

<div grid grid-cols-2 gap-8 pt-2>

<div>

```css
/* Only fires AFTER user interacts */
input:user-invalid {
  border-color: #e74c3c;
  background: #fdecec;
}

input:user-valid {
  border-color: #10b981;
  background: #ecfdf5;
}
```

</div>

<div flex flex-col gap-4 pt-2>

<div v-click>
  <div font-semibold text-red-400><code>:user-invalid</code></div>
  <div text-sm op-60>Only fires after user interaction. No flash of red on page load. Replaces library "dirty" state.</div>
</div>

<div v-click>
  <div font-semibold text-green-400><code>:user-valid</code></div>
  <div text-sm op-60>Confirms valid input in real time. Replaces library "touched" state. Zero JavaScript.</div>
</div>

</div>

</div>

<!--
Here's a CSS feature many people don't know about — user-invalid and user-valid pseudo-classes. Unlike the old invalid pseudo-class which fires immediately on page load, user-invalid only fires AFTER the user has interacted with the field. No more flash of red errors on a fresh form. And user-valid gives real-time positive feedback as the user types. This completely replaces the dirty and touched state tracking that form libraries provide — with zero JavaScript.
-->

---
glowSeed: 230
---

# When Native Falls Short

<p op-40 mb-4>What are the trade-offs</p>

<div grid grid-cols-2 gap-6>

<div v-click flex items-start gap-3>
  <div i-ph:warning-circle text-xl text-yellow-400 mt-1 />
  <div>
    <div font-semibold>Dynamic field arrays</div>
    <div text-sm op-50>Add/remove inputs at runtime still needs manual state</div>
  </div>
</div>

<div v-click flex items-start gap-3>
  <div i-ph:warning-circle text-xl text-yellow-400 mt-1 />
  <div>
    <div font-semibold>Multi-step wizards</div>
    <div text-sm op-50>Cross-step validation needs your own state management</div>
  </div>
</div>

<div v-click flex items-start gap-3>
  <div i-ph:warning-circle text-xl text-yellow-400 mt-1 />
  <div>
    <div font-semibold>Async validation</div>
    <div text-sm op-50>"Is this username taken?" needs custom JS</div>
  </div>
</div>

<div v-click flex items-start gap-3>
  <div i-ph:warning-circle text-xl text-yellow-400 mt-1 />
  <div>
    <div font-semibold>Complex cross-field rules</div>
    <div text-sm op-50>"Confirm password" needs explicit JS</div>
  </div>
</div>

</div>

<!-- <div v-click mt-6 text-center>
  <span text-green-400>Native covers most forms usecases.</span>
  <span op-50> For the other 20%, you still don't need a library.</span>
</div> -->

<!--
I want to be honest about the limitations. Dynamic field arrays — like adding multiple addresses — still need manual state management. Multi-step wizard forms with cross-step validation need your own logic. Async validation like checking if a username is taken requires custom JavaScript. And complex cross-field rules like confirm password need explicit code. But here's the thing — native APIs cover about 80 percent of real-world forms. And for the other 20 percent, you can write a small custom hook. You still don't need a full form library.
-->

---
glowSeed: 240
---

# Start Small, Migrate Gradually

<p op-40 mb-4>You don't have to rewrite everything at once</p>

<div flex flex-col gap-5 pt-2>

<div v-click flex items-start gap-4>
  <div w-8 h-8 rounded-full bg-blue-500 bg-op-20 flex items-center justify-center font-bold text-blue-400 shrink-0>1</div>
  <div>
    <div font-semibold>Try native APIs first</div>
    <div text-sm op-50>Use useActionState + Constraint Validation API for new forms.</div>
  </div>
</div>

<div v-click flex items-start gap-4>
  <div w-8 h-8 rounded-full bg-green-500 bg-op-20 flex items-center justify-center font-bold text-green-400 shrink-0>2</div>
  <div>
    <div font-semibold>Convert simple forms first</div>
    <div text-sm op-50>Login, contact, newsletter. Low risk, high visibility.</div>
  </div>
</div>

<div v-click flex items-start gap-4>
  <div w-8 h-8 rounded-full bg-orange-500 bg-op-20 flex items-center justify-center font-bold text-orange-400 shrink-0>3</div>
  <div>
    <div font-semibold>Create a shared hook</div>
    <div text-sm op-50>Build a small `useFormAction` hook. that uses web APIs</div>
  </div>
</div>

<div v-click flex items-start gap-4>
  <div w-8 h-8 rounded-full bg-purple-500 bg-op-20 flex items-center justify-center font-bold text-purple-400 shrink-0>4</div>
  <div>
    <div font-semibold>Use an AI agent to assist</div>
    <div text-sm op-50>AI can help you write and optimize your native form code.</div>
  </div>
</div>

</div>

<!--
If you're convinced, here's how to start. Step one — use native APIs for all new forms going forward. No new library imports. Step two — convert your simple forms first. Login, contact, newsletter — low risk, high visibility wins. Step three — as patterns emerge, extract a shared useFormAction hook. About 30 lines of code can replace the library's API surface. Step four — tackle the complex forms last. Wizards and dynamic arrays. Keep the library temporarily if you need to — there's no shame in a gradual migration.
-->

---
layout: center
glowSeed: 260
title: It's Still the Web
---
<div>
<img src="/uc-logo.png" w-40 absolute top-6 right-6 />
<h1>
  It's Still the Web
</h1>

<p text-lg op-50 mt-4>The platform already has what you need.<br>Web APIs should be your default.</p>
</div>

<!--
I want to leave you with this thought. We sometimes forget that React is just a library running on top of the web platform. The platform has had powerful form APIs for years — we just stopped using them when form libraries became popular. Web APIs should be your default. Reach for a library when you've outgrown what the platform offers, not before.
-->

---
layout: center
glowSeed: 300
title: Thanks
---

<img src="/uc-logo.png" w-40 absolute top-6 right-6 />
<div flex flex-col items-center gap-6>

<h1 text-5xl>Thanks</h1>

<p text-lg op-50>Trust Jamin Okpukoro · CityJS 2026</p>

</div>

<!--
Thank you so much for your time! I'm Trust Jamin — you can find me as @codejagaban on Twitter and GitHub. If you want to try this approach, the slides and all the demo code are available in the repo. I'd love to hear how it goes for you. Happy to take questions!
-->