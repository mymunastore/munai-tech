# MunAiTech — Responsive Layout Test Checklist

Run through each breakpoint to confirm all sections align correctly.

---

## Breakpoints

| Alias    | Width   | Device example         |
| -------- | ------- | ---------------------- |
| Mobile   | 375 px  | iPhone 12 / 13 / 14   |
| Tablet   | 768 px  | iPad Mini / Air        |
| Desktop  | 1280 px | Standard laptop / 13″  |

---

## Per-breakpoint checks

### 1. Navbar
- [ ] **375**: Hamburger menu visible; nav links hidden; logo visible.
- [ ] **768**: Hamburger or full nav depending on design; no text overflow.
- [ ] **1280**: Full horizontal nav bar; all links visible; theme toggle accessible.

### 2. Hero Section
- [ ] **375**: Heading stacks vertically; CTA buttons stack; badge fits single line or wraps gracefully; no horizontal scroll.
- [ ] **768**: Heading fits; CTA buttons may sit side-by-side; trust indicators wrap neatly.
- [ ] **1280**: Full hero layout; orb animations visible; generous spacing around text.

### 3. Company Positioning (3 pillars)
- [ ] **375**: Cards stack to single column; text readable without overflow.
- [ ] **768**: 2-column or 3-column grid; cards equal height.
- [ ] **1280**: 3-column grid; hover states work.

### 4. Tech Marquee
- [ ] **375**: Marquee scrolls; gradient masks visible on edges; no cut-off text.
- [ ] **768 & 1280**: Same smooth scroll; no layout shift.

### 5. Stats Counter
- [ ] **375**: 2-column grid; numbers don't overflow their cards.
- [ ] **768**: 2 or 4-column grid.
- [ ] **1280**: 4-column grid; count-up animation plays on scroll.

### 6. Global Operations
- [ ] **375**: Cards stack vertically; icon + text centered.
- [ ] **768 & 1280**: 3-column grid.

### 7. Government Engagements
- [ ] **375**: Cards stack; images scale; tag badges wrap.
- [ ] **768**: May be 1 or 2 columns.
- [ ] **1280**: 2-column grid; images and text balanced.

### 8. Core Capabilities
- [ ] **375**: Grid stacks to 1 column; all 9 service cards accessible via scroll.
- [ ] **768**: 2-column grid.
- [ ] **1280**: 3-column grid.

### 9. Differentiation
- [ ] **375**: Single column; text readable.
- [ ] **768 & 1280**: 3-column grid.

### 10. Innovation & Research
- [ ] **375**: Cards stack; metric numbers readable.
- [ ] **768 & 1280**: Grid layout; hover effects work.

### 11. Projects Showcase
- [ ] **375**: Project cards stack; images responsive; tags wrap.
- [ ] **768**: 2-column.
- [ ] **1280**: 3-column.

### 12. Impact Results
- [ ] **375**: Metric cards stack; large numbers fit.
- [ ] **768 & 1280**: Grid layout.

### 13. Tech Stack
- [ ] **375**: Category tabs/cards stack or scroll.
- [ ] **768 & 1280**: Multi-column grid.

### 14. International Recognition
- [ ] **375**: Single column.
- [ ] **768 & 1280**: Grid.

### 15. Client Logos
- [ ] **375**: Carousel visible; logos not cut off.
- [ ] **768 & 1280**: Multiple logos visible per row.

### 16. Testimonials
- [ ] **375**: Review cards stack; star ratings visible; "Working With MunAiTech" heading visible.
- [ ] **768 & 1280**: Multi-column or carousel.

### 17. Thought Leadership
- [ ] **375**: Cards stack.
- [ ] **768 & 1280**: 3-column grid.

### 18. Final Positioning
- [ ] **375**: Text wraps; CTA button full-width or centered.
- [ ] **768 & 1280**: Centered; proper spacing.

### 19. FAQ
- [ ] **375**: Accordion items full-width; text readable.
- [ ] **768 & 1280**: Max-width container centered.

### 20. CTA Section
- [ ] **375**: Heading wraps; email button full-width or centered; trust badges stack.
- [ ] **768 & 1280**: Badges in a row; button centered.

### 21. Footer
- [ ] **375**: Columns stack; social icons wrap; verification badges wrap; adequate bottom padding above floating buttons.
- [ ] **768 & 1280**: 3-column grid; all links visible.

---

## Floating Elements (all breakpoints)

- [ ] **WhatsApp button** (bottom-left): Does NOT overlap footer content or CTA buttons.
- [ ] **AI Chat button** (bottom-right): Does NOT overlap footer content or CTA buttons.
- [ ] On **mobile (375)**: Both buttons raised above the fold (`bottom-20`), smaller size (`h-12 w-12`).
- [ ] On **desktop (1280)**: Buttons at `bottom-6`, full size (`h-14 w-14`).
- [ ] Chat panel on mobile: Shorter height (`h-[60vh]`), raised from bottom (`bottom-20`).

---

## Cross-cutting checks

- [ ] No horizontal scroll on any breakpoint.
- [ ] All section transitions smooth — no jarring background color jumps.
- [ ] Dark mode: All sections use semantic tokens (no hardcoded `text-white`, `bg-black`, `text-gray-*`).
- [ ] Console: Zero React warnings (no `fetchPriority`, no unknown props).
- [ ] All personal pronouns ("I", "me", "my") replaced with company language ("we", "us", "our", "MunAiTech").
