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

<div flex items-center gap-12>

<div flex flex-col gap-3>
  <h1 text-4xl font-extrabold>Trust Jamin Okpukoro</h1>
  <p text-lg op-60>Developer Advocate at Uploadcare</p>
  <!-- <img src="/uploadcare-logo.png" /> -->
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
glowSeed: 42
---

# The Dependency Tax

<div pt-6 grid grid-cols-3 gap-8 text-center>

<div v-click>
  <div text-5xl font-extrabold text-red-400>~15KB+</div>
  <div text-sm uppercase tracking-wide op-50 mt-2>Bundle Size</div>
  <div text-xs op-30 mt-1>gzipped, per library</div>
</div>

<div v-click>
  <div text-5xl font-extrabold text-yellow-400>2-5x</div>
  <div text-sm uppercase tracking-wide op-50 mt-2>Re-renders</div>
  <div text-xs op-30 mt-1>more than native forms</div>
</div>

<div v-click>
  <div text-5xl font-extrabold text-orange-400>&infin;</div>
  <div text-sm uppercase tracking-wide op-50 mt-2>Maintenance</div>
  <div text-xs op-30 mt-1>API churn, breaking changes</div>
</div>

</div>

<div v-click text-sm op-40 text-center mt-8>
Formik: 12.8KB · React Hook Form: 11.6KB · Yup: 13.1KB · Zod: 57.1KB — and they often come together.
</div>

<!-- <div v-click text-base op-40 text-center mt-8>
Managing form state and validation logic in React is hard.
</div> -->
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


```jsx
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

```jsx{14-17,24-29}
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

<!--
Here's a live demo. On the left you can see the form working — try submitting it empty. The browser handles validation natively. And with just a few lines of CSS using user-invalid and user-valid, we get real-time visual feedback — red borders for invalid fields, green for valid — with zero JavaScript. This replaces the entire "touched" and "dirty" state tracking that form libraries do.
-->

---
glowSeed: 106
transition: none
---

<div grid grid-cols-5 gap-8 pt-2>

<div grid-col-span-2>
<React is="Form2" />
</div>

<div grid-col-span-3>

<div class="code-sample-sx">

````md magic-move

```jsx{9-15,25-26,50}
import { useActionState } from "react";

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
          <label htmlFor="name">Name</label>
          <input id="name" name="name" required minLength={2} />
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

```jsx{3-25}
import { useActionState } from 'react';

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

        <div>
          <label htmlFor="message">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            required
            minLength={10}
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
        >
          {isPending ? 'Sending...' : 'Send'}
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
Now let's customize the error messages. Instead of the browser's default tooltips, we use the onInvalid event to call setCustomValidity with our own formatError function. This function reads the ValidityState object — valueMissing, typeMismatch, tooShort — and returns a human-friendly message. The browser still handles when to validate. We just control the message.
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

````md magic-move {maxHeight:'600px'}

```jsx{1,9}
import { useActionState, useState } from "react";

function formatError(field) {
...
}

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
```jsx{19-22,26}
import { useActionState, useState } from "react";

function formatError(field) {
...
}

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
```jsx{38,44,53}

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
-->

---
layout: center
glowSeed: 140
title: The Perfect Combo
---
<div>
<!-- <p text-sm uppercase tracking-widest op-40 mb-2>Chapter 03</p> -->

<h1>
  The Native Combo
</h1>

<p text-lg op-50 mt-4>useActionState + Constraint Validation API</p>
</div>

<!--
So let's put it all together. useActionState handles your async server actions — submitting data, handling responses, tracking pending state. The Constraint Validation API handles all your client-side validation — required fields, patterns, types, custom rules. Together, they cover what Formik, React Hook Form, Yup, and Zod do — at zero kilobytes.
-->

---
glowSeed: 140
---

# Bundle Size

<p op-40 mb-4>Gzipped form-specific JavaScript</p>

<div grid grid-cols-3 gap-8 text-center pt-4>

<div v-click>
  <div text-5xl font-extrabold text-red-400>24.9KB</div>
  <div text-base op-70 mt-2>Formik + Yup</div>
</div>

<div v-click>
  <div text-5xl font-extrabold text-yellow-400>13.2KB</div>
  <div text-base op-70 mt-2>React Hook Form + Zod</div>
</div>

<div v-click>
  <div text-5xl font-extrabold text-green-400>0KB</div>
  <div text-base op-70 mt-2>React 19 + Native APIs</div>
</div>

</div>

<!--
Let's talk numbers. Formik plus Yup — nearly 25 kilobytes gzipped just for form handling. React Hook Form with Zod — about 13 kilobytes, which is better but still not free. Our approach with React 19 and native APIs? Zero extra kilobytes. The validation runs in the browser engine, and useActionState is built into React. You're shipping literally nothing extra.
-->

---
glowSeed: 155
---

# Total Blocking Time

<p op-40 mb-2>Moto G Power, 4x CPU throttle</p>

<div grid grid-cols-3 gap-8 text-center pt-6>

<div v-click>
  <div text-5xl font-extrabold text-red-400>340ms</div>
  <div text-base op-70 mt-2>Formik + Yup</div>
</div>

<div v-click>
  <div text-5xl font-extrabold text-yellow-400>180ms</div>
  <div text-base op-70 mt-2>React Hook Form</div>
</div>

<div v-click>
  <div text-5xl font-extrabold text-green-400>18ms</div>
  <div text-base op-70 mt-2>React 19 + Native</div>
</div>

</div>

<div v-click text-center mt-8>
  <span text-2xl font-bold text-green-400>19x faster</span>
  <span text-lg op-50> on a budget device</span>
</div>

<!--
This is where it gets really interesting. On a budget device like a Moto G Power with CPU throttling, Formik plus Yup blocks the main thread for 340 milliseconds. React Hook Form does better at 180. But native? 18 milliseconds. That's 19 times faster. For users on slower devices — and that's a lot of your global audience — this difference is the gap between a form that feels instant and one that feels sluggish.
-->

---
glowSeed: 160
---

# Lighthouse Scores

<div pt-4>

| Metric | Formik + Yup | RHF | React 19 + Native |
|---|---|---|---|
| Performance | 72 | 89 | **99** |
| Accessibility | 91 | 93 | **100** |
| Best Practices | 95 | 95 | **100** |
| FCP | 1.8s | 1.2s | **0.7s** |
| TTI | 3.4s | 2.1s | **0.9s** |

</div>

<div v-click mt-4 text-center>
  <span text-green-400 font-semibold>React 19 + Native wins on every Core Web Vital.</span>
</div>

<!--
And when you put it all together in a Lighthouse audit, the native approach wins across the board. Perfect 100 on accessibility because the browser handles aria-invalid and focus management for you. Perfect best practices because there are no unnecessary JavaScript bundles. Sub-second first contentful paint and time to interactive because there's simply less code to parse and execute.
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

<div v-click mt-6 p-3 rounded bg-green-900 bg-op-20 border border-green-500 border-op-30 text-center>
  For most forms, you'll get WCAG 2.1 AA compliance "for free"—but always test with real users and assistive tech.
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

<p op-40 mb-4>Be honest about the trade-offs</p>

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

<div v-click mt-6 text-center>
  <span text-green-400 font-semibold>Native covers 80% of real-world forms.</span>
  <span op-50> For the other 20%, you still don't need a library.</span>
</div>

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
    <div font-semibold>Tackle complex forms last</div>
    <div text-sm op-50>Wizards and dynamic arrays. Keep the library temporarily if needed.</div>
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
<div flex flex-col items-center gap-6>

<h1 text-5xl>Thanks</h1>

<p text-lg op-50>Jamin Okpukoro · CityJS 2026</p>

<div mt-4 flex items-center gap-2 op-40>
  <img src="/uploadcare-logo.png" style="height: 1.5rem; filter: invert(1) hue-rotate(180deg);" />
</div>

</div>

<!--
Thank you so much for your time! I'm Trust Jamin — you can find me as @codejagaban on Twitter and GitHub. If you want to try this approach, the slides and all the demo code are available in the repo. I'd love to hear how it goes for you. Happy to take questions!
-->
