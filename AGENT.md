AGENT.md — CraveHouse Food Delivery Website

1. Source of Truth

Read this file before making any project change. Treat it as the source of truth.

Do not change the locked technology, colors, menu items, categories, asset filenames, deal contents, required features, or workflow unless the user explicitly asks.

Always follow:
Analyze → Plan → Implement → Test → Review → Fix

If parallel/sub-agents are supported, split work into UI/responsive layout, JavaScript/cart logic, and Quality Review/testing.

The final website must remain original. Modern food-delivery UX patterns may inspire usability, but do not copy another brand's layout, wording, branding, or visual identity.

2. Project Goal

Build a polished, responsive single-page food delivery website named CraveHouse.

Users must be able to browse the menu, filter by category, add items to cart, see a live cart counter, increase/decrease quantity, remove items, see the total, complete checkout, place a simulated order, and receive a mock order ID.

Static front-end only. No backend or real payment processing.

3. Strict Technology

Use only semantic HTML5, plain CSS, and vanilla JavaScript.

Allowed: Google Fonts (Poppins, Inter), local images/video, inline SVG, CSS animations, browser APIs requiring no dependencies.

Do NOT use React, Vue, Angular, Tailwind, Bootstrap, jQuery, npm, package managers, build tools, external JS libraries, databases, or backend services.

4. Required Project Structure

Food-Delivery-Website/
├── AGENT.md
├── index.html
└── assets/
    ├── css/
    │   └── styles.css
    ├── js/
    │   ├── data.js
    │   └── main.js
    └── media/
        ├── 01-biryani-meal-deal.webp
        ├── 02-bbq-platter-deal.webp
        ├── 03-zinger-combo-deal.webp
        ├── 04-rose-falooda.webp
        ├── 05-mint-mojito.webp
        ├── 06-peach-iced-tea.webp
        ├── 07-chicken-karahi.webp
        ├── 08-chicken-biryani.webp
        ├── 09-molten-chocolate-cake.webp
        ├── 10-chinese-rice.webp
        ├── 11-loaded-fries.webp
        ├── 12-chicken-tikka.webp
        ├── 13-seekh-kebab.webp
        ├── 14-alfredo-pasta.webp
        ├── 15-zinger-burger.webp
        ├── hero-food-video.mp4
        └── hero-food-poster.webp

Use relative local paths only. Do not rename the 15 supplied menu/deal image files.

The user will add the final compressed images, hero video, and hero poster to assets/media/.

If hero media is temporarily missing during development, do not download or invent replacement media. Keep hero layout stable with a tasteful CSS fallback. Once the user adds files at the exact paths above, they must work without code changes.

5. Locked Design System

Colors

Main background: Off-White #FAF7F2

Primary red: #D62828

Main black: #1A1A1A

Card/surface white: #FFFFFF

Border/light neutral: #E5E0DA

This satisfies the required Red, Black & White theme. Off-white intentionally acts as the dominant white/light surface.

Use red for CTAs, prices, active filters, cart badge, deal badges, and small emphasis details. Use black strongly in navigation, headings, footer, and high-contrast UI. Do not flood large sections with red.

Typography

Headings: Poppins SemiBold/Bold

Body/UI: Inter Regular/Medium

Visual Direction

Modern, premium, clean, appetizing, energetic. Contemporary food-delivery product feel, not rustic/dhaba style. Use strong food photography, generous whitespace, clean hierarchy, restrained shadows/borders, and subtle micro-interactions.

6. Page Structure

Build one responsive index.html containing:

Header

CraveHouse brand, section navigation, cart button/icon with live badge, responsive mobile menu.

Hero

Local looping hero video, readability overlay if needed, original CraveHouse headline, short supporting copy, CTA to menu, secondary CTA to deals/menu, and separate decorative SVG motion.

Menu / Food Catalog

Section heading, exact category filter tabs, responsive food-card grid, all 15 entries. Each card must show image, category label, name, short description, USD price using the $ symbol, and Add to Cart button.

Deals

The 3 deals must be identifiable and available through the Deals filter. A compact featured-deals presentation is allowed if useful, but do not create duplicate product/cart data.

Cart

Use a polished responsive drawer/panel or modal.

Checkout

May be inside cart flow or in a dedicated modal/section, but must be clear and fully functional.

Footer

CraveHouse brand, simple navigation, copyright, optional front-end demo note.

7. Locked Menu Data — Exactly 15 Entries

There are exactly 15 menu entries total, including 3 deals.

Starters — 3

Chicken Tikka — assets/media/12-chicken-tikka.webp

Seekh Kebab — assets/media/13-seekh-kebab.webp

Loaded Fries — assets/media/11-loaded-fries.webp

Mains — 5

Chicken Biryani — assets/media/08-chicken-biryani.webp

Zinger Burger — assets/media/15-zinger-burger.webp

Chicken Karahi — assets/media/07-chicken-karahi.webp

Chinese Rice — assets/media/10-chinese-rice.webp

Alfredo Pasta — assets/media/14-alfredo-pasta.webp

Drinks — 2

Peach Iced Tea — assets/media/06-peach-iced-tea.webp

Mint Mojito (Mocktail) — assets/media/05-mint-mojito.webp

Desserts — 2

Molten Chocolate Cake — assets/media/09-molten-chocolate-cake.webp

Rose Falooda — assets/media/04-rose-falooda.webp

Deals — 3

Zinger Combo — Zinger Burger + Fries + Peach Iced Tea — assets/media/03-zinger-combo-deal.webp

Biryani Meal — Chicken Biryani + Mint Mojito + Rose Falooda + salad + raita — assets/media/01-biryani-meal-deal.webp

BBQ Platter — Chicken Tikka + Seekh Kebab + Peach Iced Tea + Mint Mojito + salad + raita — assets/media/02-bbq-platter-deal.webp

Do not remove, replace, rename, or add menu entries.

Every entry must have unique ID, name, category, price in USD, short description, and local image path.

If final prices are not supplied, choose realistic sample USD values consistently and keep them centralized in assets/js/data.js. Do not use non-USD currency anywhere in the UI.

8. Category Filtering

Create exactly these filters:

All

Starters

Mains

Drinks

Desserts

Deals

Expected counts:

All = 15

Starters = 3

Mains = 5

Drinks = 2

Desserts = 2

Deals = 3

Filtering must work without reload, update cards instantly, show active state, update aria-pressed, remain touch-friendly, and never create horizontal overflow.

9. Cart Requirements

Add to Cart on every card

live header cart badge

badge shows total quantity of all units, not only unique products

adding an existing item increments quantity

cart shows image/name/price/quantity

increase and decrease controls

decreasing quantity from 1 removes item

automatic item subtotal and final total

empty cart state

totals use centralized prices

no floating-point display errors

10. Checkout Requirements

Required fields:

Full Name

Phone Number

Delivery Address

Payment Method

Payment is simulation only. Use simple choices such as Cash on Delivery and Card — Demo Only. Do not collect real card details.

Place Order must reject empty cart, validate required fields, show useful inline messages, generate a mock order ID, show success confirmation, clear cart after successful simulated order, and reset counter/totals. No backend request.

11. Hero Video — Locked Behavior

Use:

assets/media/hero-food-video.mp4

assets/media/hero-food-poster.webp

Video markup must use:

autoplay

muted

loop

playsinline

preload="metadata"

poster="assets/media/hero-food-poster.webp"

The final video is a 6-second premium food-commercial hero based on:

Zinger Burger

Mint Mojito

Chicken Biryani

Real motion may include close camera drift, fries moving/dropping naturally, lime entering mojito with a realistic splash, rising bubbles/condensation, mint movement, biryani steam, and garnish/fried onion falling gently.

Website code must not fake these food-video effects over the video.

If video fails or loads slowly, show local poster and preserve hero dimensions. Never show a blank media box.

The final poster should ideally be a still frame from the finished hero video and must use a 16:9 aspect ratio so it matches the hero video framing and avoids layout/cropping jumps.

12. Decorative SVG/CSS Motion — Required

Create lightweight inline SVG + CSS decorative motion separate from hero video.

Required types:

Steam curls near hero/hot-food areas

Small chili or leaf accents near selected headings/cards

Subtle bubbles/circles near drinks area

Rules:

decorative only

aria-hidden="true"

pointer-events: none

keep inside section wrappers

no external animation/icon library

premium, subtle, not cartoonish

no aggressive bouncing

no excessive continuous motion

no horizontal overflow

Use gentle float, slow sway/rotation, fade/pulse, and steam-rise motion.

Respect prefers-reduced-motion: reduce by disabling or greatly reducing non-essential animation.

Also use subtle UI micro-interactions: card hover lift on pointer devices, button hover/focus, Add to Cart feedback, smooth cart drawer/modal, and filter transition. Do not animate everything.

13. Image Handling

Use supplied local WebP assets. Cards must use consistent aspect ratio, object-fit: cover, loading="lazy", descriptive alt text, and dimensions/aspect ratio that avoid layout shift.

Do not lazy-load the hero media in a way that harms first-screen presentation.

14. Accessibility

Use semantic landmarks, logical headings, descriptive alt text, visible focus, connected form labels, real buttons for controls, filter aria-pressed, accessible cart open/close controls, suitable contrast, keyboard-operable cart/checkout, and decorative SVGs hidden from assistive tech.

15. Responsive Requirements

Test around 375px, 768px, and 1200px+.

Required: no horizontal overflow, no clipped filters, readable cards, touch-friendly quantity controls, usable mobile cart and checkout, working mobile navigation, properly cropped hero with object-fit: cover, and no text hidden behind media.

16. JavaScript Organization

assets/js/data.js: centralized product/menu data.

assets/js/main.js: menu rendering, filters, Add to Cart, cart state, counter, quantity controls, totals, cart open/close, checkout validation, mock order placement, mock order ID, mobile nav if needed, and minimal media fallback behavior.

Avoid duplicate listeners and unnecessary globals.

17. Required Testing

Actually test after implementation.

Verify exactly 15 entries render, category counts are 15/3/5/2/2/3, all cart flows work, repeated add increments quantity, +/- work, quantity 1 to decrease removes item, totals update, empty cart cannot order, required checkout fields validate, valid order produces mock ID, cart clears after success, hero poster fallback is configured, video attributes are correct, 375/768/1200+ widths have no horizontal overflow, keyboard focus is visible, reduced motion is respected, and there are no console errors.

Fix verified issues before declaring complete.

18. AI Assignment Workflow

GitHub Copilot Agent

Build and test the complete initial website from this file.

Cursor Agent

After Copilot, read this file, analyze the completed project, do not rebuild it, improve only meaningful UX/responsiveness/accessibility/maintainability or verified issues, preserve locked requirements, and test after changes.

OpenAI Codex

Final review: read this file, inspect existing implementation, do not redesign unnecessarily, find/fix verified bugs, test assignment requirements, check console/responsiveness/cart/checkout/filter edge cases, and report what was tested/fixed.

Capture screenshots of each agent's visible work/output for submission.

19. Submission Requirements

Final deliverables:

public GitHub repository link

Netlify live website link

screenshots of GitHub Copilot Agent work

screenshots of Cursor Agent work

screenshots of OpenAI CodexAGENT.md — CraveHouse Food Delivery Website

1. Source of Truth

Read this file before making any project change. Treat it as the source of truth.

Do not change the locked technology, colors, menu items, categories, asset filenames, deal contents, required features, or workflow unless the user explicitly asks.

Always follow:
Analyze → Plan → Implement → Test → Review → Fix

If parallel/sub-agents are supported, split work into UI/responsive layout, JavaScript/cart logic, and Quality Review/testing.

The final website must remain original. Modern food-delivery UX patterns may inspire usability, but do not copy another brand's layout, wording, branding, or visual identity.

2. Project Goal

Build a polished, responsive single-page food delivery website named CraveHouse.

Users must be able to browse the menu, filter by category, add items to cart, see a live cart counter, increase/decrease quantity, remove items, see the total, complete checkout, place a simulated order, and receive a mock order ID.

Static front-end only. No backend or real payment processing.

3. Strict Technology

Use only semantic HTML5, plain CSS, and vanilla JavaScript.

Allowed: Google Fonts (Poppins, Inter), local images/video, inline SVG, CSS animations, browser APIs requiring no dependencies.

Do NOT use React, Vue, Angular, Tailwind, Bootstrap, jQuery, npm, package managers, build tools, external JS libraries, databases, or backend services.

4. Required Project Structure

Food-Delivery-Website/
├── AGENT.md
├── index.html
└── assets/
    ├── css/
    │   └── styles.css
    ├── js/
    │   ├── data.js
    │   └── main.js
    └── media/
        ├── 01-biryani-meal-deal.webp
        ├── 02-bbq-platter-deal.webp
        ├── 03-zinger-combo-deal.webp
        ├── 04-rose-falooda.webp
        ├── 05-mint-mojito.webp
        ├── 06-peach-iced-tea.webp
        ├── 07-chicken-karahi.webp
        ├── 08-chicken-biryani.webp
        ├── 09-molten-chocolate-cake.webp
        ├── 10-chinese-rice.webp
        ├── 11-loaded-fries.webp
        ├── 12-chicken-tikka.webp
        ├── 13-seekh-kebab.webp
        ├── 14-alfredo-pasta.webp
        ├── 15-zinger-burger.webp
        ├── hero-food-video.mp4
        └── hero-food-poster.webp

Use relative local paths only. Do not rename the 15 supplied menu/deal image files.

The user will add the final compressed images, hero video, and hero poster to assets/media/.

If hero media is temporarily missing during development, do not download or invent replacement media. Keep hero layout stable with a tasteful CSS fallback. Once the user adds files at the exact paths above, they must work without code changes.

5. Locked Design System

Colors

Main background: Off-White #FAF7F2

Primary red: #D62828

Main black: #1A1A1A

Card/surface white: #FFFFFF

Border/light neutral: #E5E0DA

This satisfies the required Red, Black & White theme. Off-white intentionally acts as the dominant white/light surface.

Use red for CTAs, prices, active filters, cart badge, deal badges, and small emphasis details. Use black strongly in navigation, headings, footer, and high-contrast UI. Do not flood large sections with red.

Typography

Headings: Poppins SemiBold/Bold

Body/UI: Inter Regular/Medium

Visual Direction

Modern, premium, clean, appetizing, energetic. Contemporary food-delivery product feel, not rustic/dhaba style. Use strong food photography, generous whitespace, clean hierarchy, restrained shadows/borders, and subtle micro-interactions.

6. Page Structure

Build one responsive index.html containing:

Header

CraveHouse brand, section navigation, cart button/icon with live badge, responsive mobile menu.

Hero

Local looping hero video, readability overlay if needed, original CraveHouse headline, short supporting copy, CTA to menu, secondary CTA to deals/menu, and separate decorative SVG motion.

Menu / Food Catalog

Section heading, exact category filter tabs, responsive food-card grid, all 15 entries. Each card must show image, category label, name, short description, USD price using the $ symbol, and Add to Cart button.

Deals

The 3 deals must be identifiable and available through the Deals filter. A compact featured-deals presentation is allowed if useful, but do not create duplicate product/cart data.

Cart

Use a polished responsive drawer/panel or modal.

Checkout

May be inside cart flow or in a dedicated modal/section, but must be clear and fully functional.

Footer

CraveHouse brand, simple navigation, copyright, optional front-end demo note.

7. Locked Menu Data — Exactly 15 Entries

There are exactly 15 menu entries total, including 3 deals.

Starters — 3

Chicken Tikka — assets/media/12-chicken-tikka.webp

Seekh Kebab — assets/media/13-seekh-kebab.webp

Loaded Fries — assets/media/11-loaded-fries.webp

Mains — 5

Chicken Biryani — assets/media/08-chicken-biryani.webp

Zinger Burger — assets/media/15-zinger-burger.webp

Chicken Karahi — assets/media/07-chicken-karahi.webp

Chinese Rice — assets/media/10-chinese-rice.webp

Alfredo Pasta — assets/media/14-alfredo-pasta.webp

Drinks — 2

Peach Iced Tea — assets/media/06-peach-iced-tea.webp

Mint Mojito (Mocktail) — assets/media/05-mint-mojito.webp

Desserts — 2

Molten Chocolate Cake — assets/media/09-molten-chocolate-cake.webp

Rose Falooda — assets/media/04-rose-falooda.webp

Deals — 3

Zinger Combo — Zinger Burger + Fries + Peach Iced Tea — assets/media/03-zinger-combo-deal.webp

Biryani Meal — Chicken Biryani + Mint Mojito + Rose Falooda + salad + raita — assets/media/01-biryani-meal-deal.webp

BBQ Platter — Chicken Tikka + Seekh Kebab + Peach Iced Tea + Mint Mojito + salad + raita — assets/media/02-bbq-platter-deal.webp

Do not remove, replace, rename, or add menu entries.

Every entry must have unique ID, name, category, price in USD, short description, and local image path.

If final prices are not supplied, choose realistic sample USD values consistently (for example $8.99, $12.99) and keep them centralized in assets/js/data.js. Do not use non-USD currency anywhere in the UI.

8. Category Filtering

Create exactly these filters:

All

Starters

Mains

Drinks

Desserts

Deals

Expected counts:

All = 15

Starters = 3

Mains = 5

Drinks = 2

Desserts = 2

Deals = 3

Filtering must work without reload, update cards instantly, show active state, update aria-pressed, remain touch-friendly, and never create horizontal overflow.

9. Cart Requirements

Add to Cart on every card

live header cart badge

badge shows total quantity of all units, not only unique products

adding an existing item increments quantity

cart shows image/name/price/quantity

increase and decrease controls

decreasing quantity from 1 removes item

automatic item subtotal and final total

empty cart state

totals use centralized prices

no floating-point display errors

10. Checkout Requirements

Required fields:

Full Name

Phone Number

Delivery Address

Payment Method

Payment is simulation only. Use simple choices such as Cash on Delivery and Card — Demo Only. Do not collect real card details.

Place Order must reject empty cart, validate required fields, show useful inline messages, generate a mock order ID, show success confirmation, clear cart after successful simulated order, and reset counter/totals. No backend request.

11. Hero Video — Locked Behavior

Use:

assets/media/hero-food-video.mp4

assets/media/hero-food-poster.webp

Video markup must use:

autoplay

muted

loop

playsinline

preload="metadata"

poster="assets/media/hero-food-poster.webp"

The final video is a 6-second premium food-commercial hero based on:

Zinger Burger

Mint Mojito

Chicken Biryani

Real motion may include close camera drift, fries moving/dropping naturally, lime entering mojito with a realistic splash, rising bubbles/condensation, mint movement, biryani steam, and garnish/fried onion falling gently.

Website code must not fake these food-video effects over the video.

If video fails or loads slowly, show local poster and preserve hero dimensions. Never show a blank media box.

The final poster should ideally be a still frame from the finished hero video and must use a 16:9 aspect ratio so it matches the hero video framing and avoids layout/cropping jumps.

12. Decorative SVG/CSS Motion — Required

Create lightweight inline SVG + CSS decorative motion separate from hero video.

Required types:

Steam curls near hero/hot-food areas

Small chili or leaf accents near selected headings/cards

Subtle bubbles/circles near drinks area

Rules:

decorative only

aria-hidden="true"

pointer-events: none

keep inside section wrappers

no external animation/icon library

premium, subtle, not cartoonish

no aggressive bouncing

no excessive continuous motion

no horizontal overflow

Use gentle float, slow sway/rotation, fade/pulse, and steam-rise motion.

Respect prefers-reduced-motion: reduce by disabling or greatly reducing non-essential animation.

Also use subtle UI micro-interactions: card hover lift on pointer devices, button hover/focus, Add to Cart feedback, smooth cart drawer/modal, and filter transition. Do not animate everything.

13. Image Handling

Use supplied local WebP assets. Cards must use consistent aspect ratio, object-fit: cover, loading="lazy", descriptive alt text, and dimensions/aspect ratio that avoid layout shift.

Do not lazy-load the hero media in a way that harms first-screen presentation.

14. Accessibility

Use semantic landmarks, logical headings, descriptive alt text, visible focus, connected form labels, real buttons for controls, filter aria-pressed, accessible cart open/close controls, suitable contrast, keyboard-operable cart/checkout, and decorative SVGs hidden from assistive tech.

15. Responsive Requirements

Test around 375px, 768px, and 1200px+.

Required: no horizontal overflow, no clipped filters, readable cards, touch-friendly quantity controls, usable mobile cart and checkout, working mobile navigation, properly cropped hero with object-fit: cover, and no text hidden behind media.

16. JavaScript Organization

assets/js/data.js: centralized product/menu data.

assets/js/main.js: menu rendering, filters, Add to Cart, cart state, counter, quantity controls, totals, cart open/close, checkout validation, mock order placement, mock order ID, mobile nav if needed, and minimal media fallback behavior.

Avoid duplicate listeners and unnecessary globals.

17. Required Testing

Actually test after implementation.

Verify exactly 15 entries render, category counts are 15/3/5/2/2/3, all cart flows work, repeated add increments quantity, +/- work, quantity 1 to decrease removes item, totals update, empty cart cannot order, required checkout fields validate, valid order produces mock ID, cart clears after success, hero poster fallback is configured, video attributes are correct, 375/768/1200+ widths have no horizontal overflow, keyboard focus is visible, reduced motion is respected, and there are no console errors.

Fix verified issues before declaring complete.

18. AI Assignment Workflow

GitHub Copilot Agent

Build and test the complete initial website from this file.

Cursor Agent

After Copilot, read this file, analyze the completed project, do not rebuild it, improve only meaningful UX/responsiveness/accessibility/maintainability or verified issues, preserve locked requirements, and test after changes.

OpenAI Codex

Final review: read this file, inspect existing implementation, do not redesign unnecessarily, find/fix verified bugs, test assignment requirements, check console/responsiveness/cart/checkout/filter edge cases, and report what was tested/fixed.

Capture screenshots of each agent's visible work/output for submission.

19. Submission Requirements

Final deliverables:

public GitHub repository link

Netlify live website link

screenshots of GitHub Copilot Agent work

screenshots of Cursor Agent work

screenshots of OpenAI Codex work

fully working responsive final website

Before submission, perform one final manual browser check of the live Netlify deployment. work

fully working responsive final website

Before submission, perform one final manual browser check of the live Netlify deployment.