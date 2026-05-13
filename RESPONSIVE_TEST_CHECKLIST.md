# Homepage Responsive Layout Checklist

Run after any homepage section change. Verify in the editor preview at three widths using the device toggle above the preview.

## Section order (post International Recognition removal)

1. Hero
2. CompanyPositioning
3. TechMarquee
4. StatsCounter
5. GlobalOperations
6. CoreCapabilities
7. Differentiation
8. InnovationResearch
9. ProjectsShowcase
10. ImpactResults
11. TechStack
12. ClientLogos
13. Testimonials
14. **Certifications** (new — replaces removed International Recognition)
15. ThoughtLeadership
16. FinalPositioning
17. FAQ
18. CTA
19. Footer

## 375px (mobile)

- [ ] No horizontal scroll anywhere on the page
- [ ] Hero CTA buttons stack and stay above the floating WhatsApp / AI chat buttons
- [ ] Floating buttons sit at `bottom-20` so they never overlap the footer or CTA section
- [ ] Section paddings feel tight but not cramped (`py-16` baseline)
- [ ] Tech marquee scrolls smoothly without overflowing the viewport
- [ ] Certifications grid collapses to 1 column
- [ ] Testimonials → Certifications shows clear bg shift (`secondary/30` → `muted/20`)
- [ ] Certifications → ThoughtLeadership shows clear bg shift (`muted/20` → `background`)
- [ ] Footer columns stack cleanly

## 768px (tablet)

- [ ] Navbar collapses to mobile menu, all links reachable
- [ ] Two-column grids appear on Certifications, ProjectsShowcase
- [ ] No content clipped on the right edge of any card
- [ ] Hero headline does not wrap awkwardly
- [ ] StatsCounter values stay aligned in their cells
- [ ] No double-padding gap between adjacent same-bg sections

## 1280px (desktop)

- [ ] Navbar shows full inline link list
- [ ] Hero, CompanyPositioning, and Testimonials stay within `container` max width
- [ ] Certifications shows 3-column grid, all cards equal height
- [ ] Background transitions alternate (background → muted/20 → secondary/30 → muted/30) — no two adjacent sections with identical bg + same padding
- [ ] FinalPositioning → FAQ → CTA stack reads as a clear closing sequence
- [ ] Floating buttons sit at `bottom-6`, don't overlap CTA copy

## Cross-cutting

- [ ] No broken anchor links — Navbar/Footer/CTA never reference `#international-recognition`, `#validation`, or any removed section id
- [ ] No console warnings (open DevTools → Console)
- [ ] Lighthouse mobile score ≥ 85 for Performance and Accessibility
