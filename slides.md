---
layout: center
highlighter: shiki
shiki:
  theme: material-theme-darker
css: unocss
colorSchema: dark
transition: fade-out
title: Replacing Form Libraries with Native Web APIs
exportFilename: CityJS 2026 - Replacing Form Libraries
lineNumbers: false
drawings:
  persist: false
mdc: true
clicks: 0
preload: false
glowSeed: 229
routerMode: hash
contextMenu: true
fonts:
  sans: Bricolage Grotesque
  mono: JetBrains Mono
---
<div>

<h1 flex flex-col leading-tight text-7xl font-extrabold>
  <span>Replacing Form Libraries</span>
    <span> with Native Web APIs</span>
</h1>

<p text-xl op-40 mt-3>Trust Jamin Okpukoro</p>

</div>

---
glowSeed: 14
---
# Agenda

<div pt-6 flex flex-col gap-5>

<div v-click flex items-center gap-4>
  <div w-10 h-10 rounded-full bg-blue-500 bg-op-20 flex items-center justify-center font-bold text-blue-400>1</div>
  <div>
    <div font-semibold text-lg>The Cost of "Convenience"</div>
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
      <div font-semibold text-lg>The Perfect Combo</div>
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
  <div w-10 h-10 rounded-full bg-cyan-500 bg-op-20 flex items-center justify-center font-bold text-cyan-400>5</div>
  <div>
    <div font-semibold text-lg>Migration Path</div>
    <div text-sm op-50>Something you can try out this weekend</div>
  </div>
</div>

</div>

---
layout: center
glowSeed: 42
title: The Cost of "Convenience"
---
<div>
<p text-sm uppercase tracking-widest op-40 mb-2>Chapter 01</p>

<h1>
  The Cost of<br>"Convenience"
</h1>

<p text-lg op-50 mt-4>Managing form state and validation logic in React is hard.</p>
</div>

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
What if we could get all the benefits of form libraries without the cost?
</div>

---
glowSeed: 100
---

#



# The 2026 Browser Baseline

<div pt-4>

| API | Chrome | Firefox | Safari | Replaces |
|---|---|---|---|---|
| Constraint Validation | ✓ | ✓ | ✓ | Yup, Zod, Joi |
| React 19 Form Actions | ✓ | ✓ | ✓ | Formik, RHF state mgmt |
| `:user-valid` / `:user-invalid` | ✓ | ✓ | ✓ | touched / dirty state |

</div>

---
layout: center
glowSeed: 88
title: The Native Duo
---
<div>
<p text-sm uppercase tracking-widest op-40 mb-2>Chapter 02</p>

<h1>
  The Native<br>Duo
</h1>

<p text-lg op-50 mt-4>Constraint Validation + React 19 Form Actions</p>
</div>

---
glowSeed: 88
---
# The Constraint Validation API

<div grid grid-cols-2 gap-8 pt-4>

<div>

```js
// ValidityState object
input.validity.patternMismatch
input.validity.rangeOverflow
input.validity.typeMismatch
input.validity.valueMissing

// Custom validation
input.setCustomValidity(
  "Passwords must match"
);
```

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
  <span font-semibold text-green-300>Runs in the browser engine, not JS</span>
</div>

</div>

</div>

---
glowSeed: 100
---
# React 19 Form Actions

<div grid grid-cols-2 gap-8 pt-2>

<div>

```jsx
function SignupForm() {
  async function signup(formData) {
    const email = formData.get("email");
    const pass = formData.get("pass");
    await createAccount(email, pass);
  }

  return (
    <form action={signup}>
      <input name="email" type="email"
             required />
      <input name="pass" type="password"
             required minLength={8} />
      <button type="submit">
        Sign Up
      </button>
    </form>
  );
}
```

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
  <span><code>useFormStatus</code> for submit button UX</span>
</div>

<div v-click flex items-center gap-2>
  <div i-ph:check-circle text-blue-400 />
  <span>No controlled inputs = fewer re-renders</span>
</div>

</div>

</div>

---
glowSeed: 110
---
# The Power Combo

<p op-50 mb-2>useActionState + Constraint Validation</p>

```jsx {all|3-4|5-11|15-16|17|all}
import { useActionState } from "react";

function ContactForm() {
  const [state, action, isPending] = useActionState(
    async (prev, formData) => {
      const res = await fetch("/api/contact", {
        method: "POST", body: formData,
      });
      if (!res.ok) return { error: "Server error" };
      return { success: true };
    }, null
  );

  return (
    <form action={action}>
      <input name="email" type="email" required />
      <input name="msg" required minLength={10} />
      <button disabled={isPending}>
        {isPending ? "Sending..." : "Send"}
      </button>
      {state?.error && <p>{state.error}</p>}
    </form>
  );
}
```

---
layout: center
glowSeed: 140
title: Performance Showdown
---
<div>
<p text-sm uppercase tracking-widest op-40 mb-2>Chapter 03</p>

<h1>
  Performance<br>Showdown
</h1>

<p text-lg op-50 mt-4>The benchmarks don't lie</p>
</div>

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

---
layout: center
glowSeed: 180
title: Before & After
---
<div>
<p text-sm uppercase tracking-widest op-40 mb-2>Chapter 04</p>

<h1>
  Before<br>& After
</h1>

<p text-lg op-50 mt-4>Side-by-side code comparison</p>
</div>

---
glowSeed: 180
---
# Before: React Hook Form + Zod

```jsx {all|1-3|5-8|11-13|18-19|22-28|}
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  email: z.string().email("Invalid email"),
  message: z.string().min(10, "Min 10 chars"),
});

function ContactForm() {
  const { register, handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (data) => {
    const res = await fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) throw new Error("Server error");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("email")} />
      {errors.email && <span>{errors.email.message}</span>}
      <textarea {...register("message")} />
      {errors.message && <span>{errors.message.message}</span>}
      <button disabled={isSubmitting}>
        {isSubmitting ? "Sending..." : "Send"}
      </button>
    </form>
  );
}
```

---
glowSeed: 195
---
# After: React 19 + Constraint Validation

```jsx
import { useActionState } from "react";

function ContactForm() {
  const [state, action, isPending] = useActionState(
    async (prev, formData) => {
      const res = await fetch("/api/contact", {
        method: "POST", body: formData,
      });
      if (!res.ok) return { error: "Server error" };
      return { success: true };
    }, null
  );

  return (
    <form action={action}>
      <input name="email" type="email" required />
      <textarea name="message" required minLength={10} />
      <button disabled={isPending}>
        {isPending ? "Sending..." : "Send"}
      </button>
      {state?.error && <p>{state.error}</p>}
    </form>
  );
}
```

<div v-click text-center mt-4>
  <span text-3xl font-bold text-green-400>35% less code</span>
  <span text-lg op-50 ml-2>· zero extra kilobytes</span>
</div>

---
layout: center
glowSeed: 210
title: Real-World Patterns
---
<div>
<p text-sm uppercase tracking-widest op-40 mb-2>Chapter 05</p>

<h1>
  Real-World<br>Patterns
</h1>

<p text-lg op-50 mt-4>Accessibility, migration, TypeScript, and edge cases</p>
</div>

---
glowSeed: 210
---
# Accessible by Default

<div pt-4 grid grid-cols-2 gap-6>

<div v-click flex items-start gap-3>
  <div i-ph:speaker-high text-2xl text-blue-400 mt-1 />
  <div>
    <div font-semibold>Screen readers announce errors automatically</div>
    <div text-sm op-50>No custom aria wrappers needed</div>
  </div>
</div>

<div v-click flex items-start gap-3>
  <div i-ph:code text-2xl text-blue-400 mt-1 />
  <div>
    <div font-semibold><code>aria-invalid</code> set by the browser</div>
    <div text-sm op-50>No JS needed</div>
  </div>
</div>

<div v-click flex items-start gap-3>
  <div i-ph:cursor-click text-2xl text-blue-400 mt-1 />
  <div>
    <div font-semibold>Focus moves to first invalid field</div>
    <div text-sm op-50>On submit, automatically</div>
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
  WCAG 2.1 AA compliance for free.
</div>

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

---
glowSeed: 240
---
# Migration Path

<p op-40 mb-4>You don't have to rewrite everything at once</p>

<div flex flex-col gap-5 pt-2>

<div v-click flex items-start gap-4>
  <div w-8 h-8 rounded-full bg-blue-500 bg-op-20 flex items-center justify-center font-bold text-blue-400 shrink-0>1</div>
  <div>
    <div font-semibold>New forms go native</div>
    <div text-sm op-50>All new forms use useActionState + Constraint Validation. No new library imports.</div>
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
    <div font-semibold>Extract shared patterns</div>
    <div text-sm op-50>Build a small useFormAction hook. 30 lines replaces the library API.</div>
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

---
layout: center
glowSeed: 260
title: Less Code, Fewer Bugs
---
<div>
<p text-sm uppercase tracking-widest op-40 mb-2>Chapter 06</p>

<h1>
  Less Code,<br>Fewer Bugs
</h1>

<p text-lg op-50 mt-4>The best code is the code you don't ship</p>
</div>

---
layout: center
glowSeed: 300
title: Thanks
---
<div flex flex-col items-center gap-6>

<h1 text-5xl>Thanks</h1>

<p text-lg op-50>Jamin Okpukoro · CityJS 2026</p>

</div>
