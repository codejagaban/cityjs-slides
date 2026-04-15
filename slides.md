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
Hey everyone! I'm Trust Jamin, and today we're going to talk about something that might change how you think about building forms in React.

We're going to look at how far native web APIs have come — and whether we still need form libraries for most of what we build.
-->

<!-- Slide 2: About Me -->
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
Quick intro — I'm a Developer Advocate at Uploadcare, where we handle file uploading, processing, and delivery.

You can find me online as @codejagaban. Now let's dive in.
-->

<!-- Slide 3: Agenda -->
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
Here's the roadmap for today. We'll start by understanding why forms in React are painful, then explore what native APIs can do, see live demos of the Constraint Validation API and React 19 Form Actions working together,

look at real performance numbers, and finish with a practical migration path you can start this weekend.
-->

<!-- Slide 4: Managing Forms in React is Hard -->
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
Let's be real — if you've ever built a non-trivial form in React, you know the pain. Controlled inputs, validation state, error messages, touched fields, submit handling — it's a lot of boilerplate. 

That's exactly why form libraries exist. But let's look at what they actually cost us.
-->

<!-- Slide 5: The Dependency Tax -->
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
  <div text-5xl font-extrabold text-yellow-400>30+</div>
  <div text-sm uppercase tracking-wide op-50 mt-2>Re-renders</div>
  <div text-xs op-30 mt-1>per form interaction (Formik)</div>
</div>

<div v-click>
  <div text-5xl font-extrabold text-orange-400>&infin;</div>
  <div text-sm uppercase tracking-wide op-50 mt-2>Maintenance</div>
  <div text-xs op-30 mt-1>API churn, breaking changes</div>
</div>

</div>

<div v-click text-sm op-40 text-center mt-8>
Formik: 13.9KB · React Hook Form: 10.4KB — gzipped, from production builds.
</div>

<!-- <div v-click text-base op-40 text-center mt-8>
Managing form state and validation logic in React is hard.
</div> -->
<!-- Slide 6: What if we could build forms with native APIs? -->
---
glowSeed: 55
layout: center
---

 <h1 leading-loose>
  What if we could build forms <br> with <i>just</i> Web APIs + React 19?
</h1>

<div v-click text-base op-40 text-center mt-8>
What if we could build forms without a form library?
</div>

<!-- Slide 6b: Pure HTML Form — No JavaScript -->
---
glowSeed: 60
---

# The Browser Already Does This

<div grid grid-cols-2 gap-8 pt-4>

<div>

```html
<form action="/api/contact" method="POST">
  <label>Name
    <input name="name" required minlength="2" />
  </label>

  <label>Email
    <input name="email" type="email" required />
  </label>

  <label>Message
    <textarea name="message"
      required minlength="10"></textarea>
  </label>

  <button type="submit">Send</button>
</form>
```

</div>

<div flex flex-col gap-4 pt-2>

<div v-click flex items-center gap-2>
  <div i-ph:check-circle text-green-400 />
  <span>Validates on submit</span>
</div>

<div v-click flex items-center gap-2>
  <div i-ph:check-circle text-green-400 />
  <span>Shows error messages</span>
</div>

<div v-click flex items-center gap-2>
  <div i-ph:check-circle text-green-400 />
  <span>Focuses first invalid field</span>
</div>

<div v-click flex items-center gap-2>
  <div i-ph:check-circle text-green-400 />
  <span>Works with JavaScript disabled</span>
</div>

<div v-click flex items-center gap-2>
  <div i-ph:check-circle text-green-400 />
  <span font-semibold text-green-300>Zero JavaScript. Zero libraries.</span>
</div>

</div>

</div>

<!--
Before we write any React, look at this. A plain HTML form with required, type="email", and minlength attributes. The browser validates it, shows error messages, focuses the first invalid field — and it works with JavaScript completely disabled. No form library survives JS being turned off. This is the foundation everything else builds on.
-->

<!-- Slide 6c: What Year Is It? -->
---
glowSeed: 65
layout: center
---

<div text-center>

<h1 text-4xl mb-8>How long have we had this?</h1>

<div grid grid-cols-3 gap-8 text-center>

<div v-click>
  <div text-5xl font-extrabold text-blue-400>2011</div>
  <div text-sm op-50 mt-2>Chrome 10</div>
</div>

<div v-click>
  <div text-5xl font-extrabold text-orange-400>2011</div>
  <div text-sm op-50 mt-2>Firefox 4</div>
</div>

<div v-click>
  <div text-5xl font-extrabold text-purple-400>2012</div>
  <div text-sm op-50 mt-2>Safari 5</div>
</div>

</div>

<div v-click mt-8 text-lg op-60>
The Constraint Validation API is <span font-bold text-yellow-400>14+ years old.</span>
</div>

<div v-click mt-2 text-base op-40>
We've been importing libraries to replace what HTML already does.
</div>

</div>

<!--
Here's the thing that blew my mind when I first dug into this. The Constraint Validation API has been supported since Chrome 10 and Firefox 4 — that's 2011. Safari followed in 2012. This API is over 14 years old. We've been importing tens of kilobytes of JavaScript to replace something that HTML has done natively for over a decade.
-->

<!-- Slide 6d: What Libraries Reimplement -->
---
glowSeed: 70
---

# What Libraries Reimplement

<div pt-4>

| Library feature | Web API equivalent |
|---|---|
| Required validation | `required` attribute |
| Touched / dirty state | `:user-valid` / `:user-invalid` |
| String / email / URL schema | `type="email"`, `type="url"` |
| Min/max length rules | `minLength` / `maxLength` attributes |
| Pattern matching | `pattern` attribute |
| Error messages | `validationMessage` + `ValidityState` |
| Form values on submit | `new FormData(form)` |
| Reset form | `form.reset()` |
| Focus first error | Browser does this natively |

</div>

<!--
This is the slide I want you to really sit with. Every row in this table is something you've probably imported a library to do. Required validation — it's an HTML attribute. Touched and dirty state — CSS pseudo-classes handle it. Email validation — the browser has had type="email" forever. Pattern matching, min/max length, error messages, getting form values, resetting the form, focusing the first error — all built in. We've been reimplementing the web platform in JavaScript.
-->

<!-- Slide 6e: The FormData API -->
---
glowSeed: 75
---

# The FormData API

<p op-40 mb-4>Get all form values without a single useState</p>

<div grid grid-cols-2 gap-8 pt-2>

<div>

```jsx
function handleSubmit(formData) {
  const data = Object.fromEntries(formData);
  // {
  //   name: "Jane",
  //   email: "jane@example.com",
  //   message: "Hello there..."
  // }
}

<form action={handleSubmit}>
  <input name="name" required />
  <input name="email" type="email" required />
  <textarea name="message" required />
  <button type="submit">Send</button>
</form>
```

</div>

<div flex flex-col gap-4 pt-2>

<div v-click flex items-center gap-2>
  <div i-ph:check-circle text-green-400 />
  <span>Replaces Formik's <code>values</code> object</span>
</div>

<div v-click flex items-center gap-2>
  <div i-ph:check-circle text-green-400 />
  <span>Replaces RHF's <code>getValues()</code></span>
</div>

<div v-click flex items-center gap-2>
  <div i-ph:check-circle text-green-400 />
  <span>No controlled inputs needed</span>
</div>

<div v-click flex items-center gap-2>
  <div i-ph:check-circle text-green-400 />
  <span font-semibold text-green-300>Zero state management</span>
</div>

</div>

</div>

<!--
Here's another API most React developers overlook — FormData. One line: Object.fromEntries of new FormData gives you every form value as a plain object. No useState, no controlled inputs, no getValues. React 19 Form Actions receive FormData automatically, so you don't even need to construct it yourself. This replaces the entire values and state management layer of form libraries.
-->

<!-- Slide 7: Two-Layer Architecture -->
---
glowSeed: 100
---

# Two Layers, Zero Libraries

<div pt-6 grid grid-cols-2 gap-8>

<div v-click>
  <div p-4 rounded bg-green-900 bg-op-20 border border-green-500 border-op-30>
    <div font-semibold text-green-400 mb-2>Layer 1: Web APIs (any framework)</div>
    <div text-sm op-70 flex flex-col gap-1>
      <span>Constraint Validation API</span>
      <span>FormData API</span>
      <span><code>:user-valid</code> / <code>:user-invalid</code></span>
      <span><code>validationMessage</code> + <code>ValidityState</code></span>
    </div>
  </div>
</div>

<div v-click>
  <div p-4 rounded bg-blue-900 bg-op-20 border border-blue-500 border-op-30>
    <div font-semibold text-blue-400 mb-2>Layer 2: React 19 (the glue)</div>
    <div text-sm op-70 flex flex-col gap-1>
      <span><code>useActionState</code> — async submit + pending</span>
      <span><code>useFormStatus</code> — submit button UX</span>
      <span><code>&lt;form action={fn}&gt;</code> — receives FormData</span>
    </div>
  </div>
</div>

</div>

<div v-click mt-6 text-center text-sm op-40>
Layer 1 works in Vue, Svelte, Angular, or vanilla JS. Layer 2 is the React-specific glue.
</div>

<!--
Here's how to think about it. Layer one is pure Web APIs — Constraint Validation, FormData, CSS pseudo-classes. This works in any framework or no framework at all. If you're a Vue or Svelte developer, everything in layer one applies to you too. Layer two is React 19 specific — useActionState for async submits and pending state, useFormStatus for button UX. This is the glue that makes the Web APIs feel like a React form library. Two layers, zero dependencies.
-->

<!-- Slide 8: The Constraint Validation API -->
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
This is the Constraint Validation API. When you add attributes like required, type="email", minLength, or pattern to an input, the browser creates a ValidityState object that tells you exactly what's wrong.
You can also call setCustomValidity to set your own error messages. The key thing here — and this is important — is that this validation runs in the browser engine, in C++, not in your JavaScript bundle. 

It's faster than any JS validation library could ever be.
-->

<!-- Slide 9: React 19 Form Actions -->
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
Now the other half of the combo — React 19 Form Actions. The form element can now accept a function as its action prop.

When the user submits, React calls your function with native FormData — no controlled inputs, no onChange handlers, no state management. 

useActionState gives you a pending boolean for loading states and a way to return errors from the server. Notice how clean this code is compared to the useForm plus zodResolver plus handleSubmit pattern we're used to.
-->

<!-- Slide 10: Demo - Form 1 (Basic Form Action) -->
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

</div>

</div>

</div>

<!--
Here's a live demo. On the left you can see the form working — try submitting it empty. The browser handles validation natively.
-->

<!-- Slide 10b: Demo - Form 1 (CSS user-valid/user-invalid) -->
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

```css
:is(input, textarea, select):user-invalid {
  border: 1px solid #ef4444;
}

:is(input, textarea, select):user-valid {
  border: 1px solid #22c55e;
}
```

</div>

</div>

</div>

<!--
And with just a few lines of CSS using user-invalid and user-valid, we get real-time visual feedback — red borders for invalid fields, green for valid — with zero JavaScript. This replaces the entire "touched" and "dirty" state tracking that form libraries do.
-->

<!-- Slide 11: Demo - Form 2 (onInvalid + setCustomValidity) -->
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

```jsx{9-11}
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

</div>

</div>

</div>

<!--
Now let's customize the error messages. Instead of the browser's default tooltips, we use the onInvalid event to call setCustomValidity with our own formatError function.
-->

<!-- Slide 11b: Demo - Form 2 (formatError function) -->
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
```

</div>

</div>

</div>

<!--
This formatError function reads the ValidityState object — valueMissing, typeMismatch, tooShort — and returns a human-friendly message. The browser still handles when to validate. We just control the message.
-->

<!-- Slide 12: Demo - Form 3 (useState + preventDefault) -->
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
        ...
      </form>
    </div>
  );
}
```

</div>

</div>

</div>

<!--
Now we want to render errors in our own UI instead of browser tooltips. First, we add useState for errors and call e.preventDefault() in onInvalid to suppress the native tooltip.
-->

<!-- Slide 12b: Demo - Form 3 (setErrors in onInvalid) -->
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

```jsx{8-11}
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
```

</div>

</div>

</div>

<!--
In the onInvalid handler, after setting the custom validity, we sync the validation message into React state. This is the bridge between the browser's validation and React's render cycle.
-->

<!-- Slide 12c: Demo - Form 3 (rendering inline errors) -->
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

```jsx{6,12,19}
<div>
  <label htmlFor="name">Name</label>
  <input id="name" name="name"
    required minLength={2}
    pattern="[A-Za-z\s]+" />
  {errors.name && <p>{errors.name}</p>}
</div>

<div>
  <label htmlFor="email">Email</label>
  <input id="email" name="email" type="email" required />
  {errors.email && <p>{errors.email}</p>}
</div>

<div>
  <label htmlFor="message">Message</label>
  <textarea id="message" name="message"
    required minLength={10} />
  {errors.message && <p>{errors.message}</p>}
</div>
```

</div>

</div>

</div>

<!--
Then in the JSX, we conditionally render error paragraphs beneath each field. One re-render per invalid field on submit — that's it. No form library, no schema library, just React and the browser working together.
-->

<!-- Slide 13: The Native Combo -->
---
layout: center
glowSeed: 140
title: The Native Combo
---
<div>
<!-- <p text-sm uppercase tracking-widest op-40 mb-2>Chapter 03</p> -->

<h1>
  The Native Combo
</h1>

<p text-lg op-50 mt-4>useActionState + Constraint Validation API</p>
</div>

<!--
So let's put it all together. useActionState handles your async server actions — submitting data, handling responses, tracking pending state. The Constraint Validation API handles all your client-side validation — required fields, patterns, types, custom rules. Together, they cover what Formik and React Hook Form do — with zero extra dependencies.
-->

<!-- Slide 14: Bundle Size -->
---
glowSeed: 140
---

# Bundle Size

<p op-40 mb-4>Gzipped form-specific JavaScript</p>

<div grid grid-cols-3 gap-8 text-center pt-4>

<div v-click>
  <div text-5xl font-extrabold text-red-400>13.9KB</div>
  <div text-base op-70 mt-2>Formik</div>
</div>

<div v-click>
  <div text-5xl font-extrabold text-yellow-400>10.4KB</div>
  <div text-base op-70 mt-2>React Hook Form</div>
</div>

<div v-click>
  <div text-5xl font-extrabold text-green-400>1.1KB</div>
  <div text-base op-70 mt-2>Web APIs</div>
</div>

</div>

<!--
Let's talk bundle size from actual production builds — no schema libraries included, just the form library itself. Formik adds nearly 14 kilobytes gzipped. React Hook Form is about 10 kilobytes. Our approach? Just 1.1 kilobyte — and that's mostly React's own useActionState. The validation runs in the browser engine at zero cost.
-->

<!-- Slide 15: Interaction Performance (INP) -->
---
glowSeed: 155
---

# Interaction Performance

<p op-40 mb-2>What happens when a user types one keystroke</p>

<div pt-6 flex flex-col gap-6>

<div v-click flex items-start gap-4>
  <div w-8 h-8 rounded-full bg-red-500 bg-op-20 flex items-center justify-center font-bold text-red-400 shrink-0>F</div>
  <div>
    <div font-semibold>Formik (controlled)</div>
    <div text-sm op-50>keystroke → update state → run validation → re-render entire form → paint</div>
  </div>
</div>

<div v-click flex items-start gap-4>
  <div w-8 h-8 rounded-full bg-green-500 bg-op-20 flex items-center justify-center font-bold text-green-400 shrink-0>U</div>
  <div>
    <div font-semibold>RHF & Native (uncontrolled)</div>
    <div text-sm op-50>keystroke → browser updates input → ready for next keystroke (no React work)</div>
  </div>
</div>

</div>

<div v-click mt-6 p-3 rounded bg-green-900 bg-op-20 border border-green-500 border-op-30 text-center>
  RHF and native both use uncontrolled inputs — typing performance is the same.<br>
  <span op-60>The difference is native needs no library to get there.</span>
</div>

<!--
Interaction performance is how responsive the form feels while you're using it. Formik uses controlled inputs — every keystroke triggers a state update, validation, and re-render. Both React Hook Form and our native approach use uncontrolled inputs, so typing performance is identical — the browser handles the keystroke directly, no React work. The real win with native isn't typing speed over RHF — it's getting the same performance with zero library code.
-->

<!-- Slide 16: Runtime Re-renders -->
---
glowSeed: 160
---

# Runtime Re-renders

<p op-40 mb-2>Re-renders while typing in every field + submitting</p>

<div grid grid-cols-3 gap-8 text-center pt-6>

<div v-click>
  <div text-5xl font-extrabold text-red-400>30+</div>
  <div text-base op-70 mt-2>Formik</div>
  <div text-xs op-30 mt-1>every keystroke triggers re-render</div>
</div>

<div v-click>
  <div text-5xl font-extrabold text-yellow-400>3-5</div>
  <div text-base op-70 mt-2>React Hook Form</div>
  <div text-xs op-30 mt-1>uncontrolled, re-renders on submit/error</div>
</div>

<div v-click>
  <div text-5xl font-extrabold text-green-400>1-3</div>
  <div text-base op-70 mt-2>Web APIs + React 19</div>
  <div text-xs op-30 mt-1>one setState per invalid field on submit</div>
</div>

</div>

<!--
Here's the re-render story. Formik re-renders the entire form on every single keystroke because it uses controlled inputs — that adds up fast. React Hook Form is smarter with uncontrolled inputs, so it mostly re-renders on submit and error display. Our native approach is similar — one setState call per invalid field on submit. During typing, neither RHF nor native triggers React re-renders. The big gap is between controlled (Formik) and uncontrolled (everything else).
-->

<!-- Slide 17: Accessible by Default -->
---
glowSeed: 210
---

# Accessibility Considerations

<div pt-4 grid grid-cols-2 gap-6>

<div v-click flex items-start gap-3>
  <div i-ph:check-circle text-2xl text-green-400 mt-1 />
  <div>
    <div font-semibold>Native tooltips are announced by screen readers</div>
    <div text-sm op-50>But only when you don't call <code>e.preventDefault()</code></div>
  </div>
</div>

<div v-click flex items-start gap-3>
  <div i-ph:check-circle text-2xl text-green-400 mt-1 />
  <div>
    <div font-semibold><code>:user-invalid</code> sets <code>aria-invalid</code></div>
    <div text-sm op-50>Browser handles this automatically via CSS pseudo-class</div>
  </div>
</div>

<div v-click flex items-start gap-3>
  <div i-ph:warning-circle text-2xl text-yellow-400 mt-1 />
  <div>
    <div font-semibold>Custom error elements need <code>aria-live="polite"</code></div>
    <div text-sm op-50>Required for screen readers to announce your custom errors</div>
  </div>
</div>

<div v-click flex items-start gap-3>
  <div i-ph:warning-circle text-2xl text-yellow-400 mt-1 />
  <div>
    <div font-semibold>Focus management needs manual code</div>
    <div text-sm op-50>When suppressing native tooltips, you handle focus yourself</div>
  </div>
</div>

</div>

<div v-click mt-6 p-3 rounded bg-yellow-900 bg-op-20 border border-yellow-500 border-op-30 text-center>
  Native gives you a head start on a11y — but custom error UI still needs work. Always test with real assistive tech.
</div>

<!--
Let's talk accessibility honestly. If you use the browser's native validation tooltips — no preventDefault — screen readers announce errors automatically and focus moves to the first invalid field. That's free. But once you suppress native tooltips to render your own error UI — which we did — you need to add aria-live to your error elements so screen readers pick them up, and you need to manage focus yourself. Native gives you a head start, but custom UI always requires a11y work. Always test with real assistive tech.
-->

<!-- Slide 18: Styling Native Validation -->
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

<!-- Slide 19: When Native Falls Short -->
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
    <div font-semibold>Dependent field logic</div>
    <div text-sm op-50>"Show shipping fields only if delivery is selected" needs JS state</div>
  </div>
</div>

</div>

<div v-click mt-6 text-center>
  <span text-green-400 font-semibold>Native covers most real-world forms.</span>
</div>

<!--
I want to be honest about the limitations. Dynamic field arrays — like adding multiple addresses — still need manual state management. Multi-step wizard forms with cross-step validation need your own logic. Async validation like checking if a username is taken requires custom JavaScript. And dependent field logic needs JS state. But here's the thing — native APIs cover most real-world forms.
-->

<!-- Slide 20: Start Small, Migrate Gradually -->
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

<!-- Slide 21: It's Still the Web -->
---
layout: center
glowSeed: 260
title: It's Still the Web
---
<img src="/uc-logo.png" w-40 absolute top-6 right-6 />

<div>

<h1>
  It's Still the Web
</h1>

<p text-lg op-50 mt-4>The platform already has what you need.<br>Web APIs + React 19 should be your default.</p>
</div>

<!--
I want to leave you with this thought. We sometimes forget that React is just a library running on top of the web platform. The platform has had powerful form APIs for years — we just stopped using them when form libraries became popular. Web APIs should be your default. Reach for a library when you've outgrown what the platform offers, not before.
-->

<!-- Slide 22: Thanks -->
---
layout: center
glowSeed: 300
title: Thanks
---
<img src="/uc-logo.png" w-40 absolute top-6 right-6 />

<div flex flex-col items-center gap-6>

<h1 text-5xl>Thanks</h1>

<p text-lg op-50>Jamin Okpukoro · CityJS 2026</p>

</div>

<!--
Thank you so much for your time! I'm Trust Jamin — you can find me as @codejagaban on Twitter and GitHub. If you want to try this approach, the slides and all the demo code are available in the repo. I'd love to hear how it goes for you. Happy to take questions!
-->
