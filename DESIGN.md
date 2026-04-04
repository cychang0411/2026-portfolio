# Design System: Vicky Chang Portfolio

## 1. Visual Theme & Atmosphere
A restrained, gallery-airy portfolio with a keynote-like sense of precision. The interface feels calm, expensive, and human: large quiet surfaces, asymmetrical Bento compositions, and a subtle sense of motion that never turns theatrical. Density sits at a balanced middle, variance is confidently high, and every block should feel like part of one composed poster rather than a pile of cards.

## 2. Color Palette & Roles
- **Porcelain Canvas** (`#f3f0ea`) - Main page background with a warm, paper-like neutrality.
- **Cloud Surface** (`#fcfbf8`) - Primary tile fill and elevated content surfaces.
- **Studio Ink** (`#191919`) - Main heading and high-contrast text color.
- **Slate Copy** (`#5b5f66`) - Body copy, supporting labels, metadata.
- **Mist Line** (`rgba(32, 36, 42, 0.08)`) - Structural borders and dividers.
- **Soft Shadow** (`rgba(34, 39, 45, 0.08)`) - Diffused elevation for Bento tiles.
- **Amber Signal** (`#af7b42`) - Single accent for CTA, focus ring, active language state.

## 3. Typography Rules
- **Display:** `Geist` - tight tracking, compact leading, hierarchy through scale and restraint rather than exaggerated size.
- **Body:** `Geist` - relaxed line-height with measured line length.
- **Mono:** `Geist Mono` - metadata, city coordinates, compact labels.
- **Banned:** `Inter`, default system serif stacks, neon gradient text, oversized all-caps UI shouting.

## 4. Component Stylings
- **Tiles:** Large radius (`2rem` to `2.5rem`), warm-white fill, whisper border, diffused long shadow.
- **Buttons:** Compact, sculpted, tactile press state with slight translate or scale.
- **Links:** Understated by default, stronger on hover through contrast and spacing rather than glow.
- **Carousel:** Soft masked edges, visible controls, no abrupt motion.
- **Contact UI:** Inputs are not needed in v1; email uses a direct `mailto:` CTA with prefilled content.

## 5. Layout Principles
- Use a 12-column desktop grid with irregular spans.
- Never fall back to three equal feature cards.
- Treat the first viewport like a composed editorial poster.
- Mobile collapses to a clean single-column flow without horizontal overflow.
- Leave breathing room between sections; asymmetry should feel intentional, not random.

## 6. Motion & Interaction
- Entrance motion should be subtle and layered: opacity + translate only.
- Hover interactions are crisp and short, never bouncy.
- Carousel can auto-advance slowly, but must pause on interaction.
- Respect `prefers-reduced-motion` by disabling autoplay and reducing transform effects.

## 7. Anti-Patterns (Banned)
- No purple-blue AI gradients.
- No pure black or pure white.
- No generic SaaS dashboard tiles.
- No fake metrics or invented performance numbers.
- No filler copy like "scroll to explore."
- No visual overlap between core text and imagery.
- No exaggerated glassmorphism, glow halos, or gimmick cursors.
