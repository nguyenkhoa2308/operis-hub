# Orbital & Satellite Layout UI Design Research Report

**Date:** 2026-03-19
**Scope:** Real-world implementations of orbital/satellite/constellation layout patterns in modern web design

---

## Executive Summary

Orbital and satellite layout patterns are niche but growing design trends in modern web interfaces. The pattern involves arranging elements in circular, radial, or constellation-like formations around a central focal point. While not as widely adopted as traditional layouts, several specialized implementations exist across design frameworks, interactive websites, and design inspiration platforms.

Key finding: There is **no single dominant "orbital" pattern widely adopted by mainstream brands**. Instead, the pattern exists in three distinct contexts:
1. **Technical frameworks & tools** (Orbit CSS, Figma plugins, animation libraries)
2. **Design inspiration platforms** (Dribbble, Behance, Awwwards collections)
3. **Interactive portfolio & creative agency sites** (boutique implementations)

---

## Part 1: Technical Frameworks & Design Systems

### 1.1 Orbit CSS Framework
**URL:** https://zumerlab.github.io/orbit-docs/introduction/
**GitHub:** https://github.com/zumerlab/orbit

**Overview:**
A dedicated CSS framework specifically designed for building radial UI layouts. Eliminates JavaScript complexity by enabling orbital layouts with pure CSS.

**Key Features:**
- `.inner-orbit` and `.outer-orbit` positioning utilities
- Range controls: `range-180`, `range-270`, `range-360` for arc spans
- Support for nested orbital patterns (satellites around satellites)
- `fit-range` utility for automatic item distribution

**Use Case:** Best for custom UI component design, control panels, radial menus, and dashboard layouts.

**Status:** Active framework, community-driven

---

### 1.2 Figma Radial Design Plugins
Multiple plugins exist in Figma community for orbital/radial design:

**Basic Radial Graphics**
**URL:** https://www.figma.com/community/file/1517764599821594604/basic-radial-graphics

Simple starter file for creating radial patterns in Figma.

**Radial Generator (BETA)**
**URL:** https://www.figma.com/community/plugin/1118321937703348544/radial-generator-beta

Plugin for designing radial menus with customizable parameters:
- Segment count & size
- Sweep angles & rotation
- Thickness & gap controls

**Radial Cloner**
**URL:** https://www.figma.com/community/plugin/1224915988174409248/radial-cloner

Creates circular clones of selected objects with customizable radius and rotation.

**Radium**
**URL:** https://www.figma.com/community/plugin/838889318422718953/radium

Generates rotated copies around a center point—useful for watch UI design and satellite patterns.

---

### 1.3 Orbit Motion for Framer
**URL:** https://www.framer.com/marketplace/components/orbit-motion/

**Overview:**
Interactive Framer component for scroll-based orbital animations.

**Features:**
- Circular & random item layouts
- Scroll-reactive orbital movement
- 3D parallax depth effects
- Built-in perspective controls
- Auto-rotation support

**Implementation:** React/Framer-based, full code examples available

---

## Part 2: Design Inspiration Platforms

### 2.1 Dribbble Collections
**Radial Menu Tags:**
https://dribbble.com/tags/radial-menu
https://dribbble.com/search/radial-menu
https://dribbble.com/search/radial-menu-ui

**Notable Concept Designs:**
- "Concept Idea: Radial Menu UI (animated)" by Jared Katamani
- "Radial Menu Prototype" by Substantial Team
- "Spatial Circular Menu II" by Oleg Frolov Pro

**SpaceX StarLink UI**
**URL:** https://dribbble.com/shots/6847433-SpaceX-StarLink-Selfcare-mobile-application-User-Interface
**Designer:** Gobinthiran Kulendran

A mobile app UI concept inspired by satellite constellation design.

---

### 2.2 Behance Collections
**Search Results:**

- **Radial Menu Projects:**
  https://www.behance.net/search/projects/radial%20menu

- **Circular UI Projects:**
  https://www.behance.net/search/projects/circular%20ui

- **Wayfinder Typeface (Celestial Navigation Inspired)**
  https://www.behance.net/gallery/220853079/Wayfinder-A-Typeface-Inspired-by-Celestial-Navigation
  Uses astrolabe grid patterns and orbital reference aesthetics.

**Pattern:** Behance heavily features radial menus and circular navigation designs. Search their platform directly for "radial menu," "circular ui," and "orbit navigation" for current trending designs.

---

### 2.3 Awwwards Collections
**Menu Inspiration:**
https://www.awwwards.com/awwwards/collections/menu/

**Radial Menu Inspiration:**
https://www.awwwards.com/inspiration/radial-menu

**Parallax Drag Navigation:**
https://www.awwwards.com/inspiration/parallax-drag-navigation-knob-ui-menu

**Navigation Websites Category:**
https://www.awwwards.com/websites/navigation/

Awwwards curates award-winning navigation designs but does not have dedicated orbital layout showcase.

---

## Part 3: Real-World Website Implementations

### 3.1 Orbital Marketing Agency
**URL:** https://www.orbitalmarketingagency.com/

Web design agency featuring interactive portfolio work. While the agency name references "orbital," their website does not prominently feature orbital layouts—it's primarily a traditional service site with portfolio links.

### 3.2 Orbit Media Studios Portfolio
**URL:** https://www.orbitmedia.com/portfolio/

Design and development agency portfolio. Standard grid-based layout rather than orbital.

### 3.3 Webflow Circular Layout Showcase
**Collections:**
- Best Circles Websites: https://webflow.com/made-in-webflow/circles
- Best Circular Websites: https://webflow.com/made-in-webflow/circular
- Best Circle Sliders: https://webflow.com/made-in-webflow/circle-slider

**Notable Examples:**
- Trendy AF Circular Text: Uses circletype.js for text animation in circular paths
- Circular Slide Carousel: Immersive horizontal carousel with circular imagery
- Circle Agency Template: Premium template for portfolio display

These are curated showcase galleries of live Webflow projects; clicking through reveals specific implementations.

---

### 3.4 Bruno Simon 3D Portfolio
**URL:** https://bruno-simon.com/

**Awwwards Recognition:** Site of the Month November

**Tech Stack:** Three.js, Cannon.js (physics), Blender (3D modeling)

**Pattern:** Uses 3D interactive navigation with orbital camera controls (not strictly a satellite layout, but uses orbital camera mechanics). Features a 3D car driving through terrain with interactive elements.

**Relevance:** While not a pure orbital layout, demonstrates sophisticated interactive spatial UI using orbital camera principles.

---

## Part 4: Related Design Patterns & Terminology

### 4.1 Named Patterns
- **Radial Navigation/Menu:** Circular arrangement of clickable items around a center point
- **Circular Layout:** Items arranged in circular formation (static or dynamic)
- **Orbital Menu:** Navigation elements orbiting around a central focal point
- **Satellite Pattern:** Secondary elements positioned around a primary central element
- **Constellation UI:** Star-like nodes connected in meaningful patterns (more abstract/data-driven)

### 4.2 Industry Terminology
- **Radial UI:** Broader umbrella term covering all circular/orbital interface patterns
- **Orbit Controls:** Camera movement pattern (from Three.js)—camera orbits around a target point
- **Ring Menu:** Specialized radial menu variant popular in VR/AR interfaces

---

## Part 5: Pega Constellation (Enterprise Pattern)
**URL:** https://design.pega.com/

**Context:** Pega Constellation is a React-based UI pattern library for enterprise case management applications—**not** a visual orbital/satellite pattern, but a pattern-based architecture. Mentioned here for terminology clarity.

---

## Part 6: CSS & JavaScript Implementation References

### Available Code Examples
- **Three.js Orbit Controls:** https://threejs.org/examples/misc_controls_orbit.html
- **Three.js Orbit Controls Docs:** https://threejs.org/docs/pages/OrbitControls.html
- **FreeFrontend Three.js Examples:** https://freefrontend.com/three-js/ (154 examples)
- **CSS Circle Menus:** https://freefrontend.com/css-circle-menus/ (24+ pure CSS examples)

### Design Patterns Learning
- UI Patterns Reference: https://ui-patterns.com/
- Smart Interface Design Patterns: https://smart-interface-design-patterns.com/
- Patterns.dev: https://www.patterns.dev/
- Mobbin (Mobile & Web UI): https://mobbin.com/

---

## Part 7: SaaS & Product Page Patterns

### Landing Page Resources
- **SaaS Landing Page:** https://saaslandingpage.com/
- **Landingfolio:** https://www.landingfolio.com/inspiration/landing-page/saas
- **Lapa Ninja SaaS:** https://www.lapa.ninja/category/saas/
- **Saaspo:** https://saaspo.com/

**Finding:** While many SaaS sites use circular elements and modern layouts, **none prominently feature orbital/satellite layouts as a primary navigation or content structure**. Most use hero sections, feature grids, and linear scrolling patterns.

---

## Key Findings & Analysis

### What Works
1. **Radial menus** in creative/design tools (already proven UX)
2. **3D orbital camera controls** for interactive experiences (Bruno Simon model)
3. **Scroll-reactive orbital animations** for hero sections (Framer Motion)
4. **Portfolio websites** for creative expression (design agency prestige)
5. **Data visualization** using radial/circular charts (Infogram, PowerPoint)

### What Doesn't
1. **Mainstream SaaS adoption:** No major SaaS companies use orbital layouts for primary navigation
2. **Mobile-first design:** Orbital layouts are awkward on small screens
3. **Information hierarchy:** Orbital patterns don't scale well for complex content
4. **Accessibility:** Radial navigation harder to navigate with keyboard/assistive tech

### Usage Context
- **Best for:** Portfolios, creative agencies, premium/boutique brands, control centers, scientific visualization
- **Avoid for:** Traditional SaaS, content-heavy sites, mobile-primary products, e-commerce

---

## Unresolved Questions

1. **Specific production websites:** Despite searching, no major brand websites prominently showcase orbital/satellite layouts as a primary design pattern. Most references are in design portfolios, frameworks, or inspiration galleries.

2. **Naming convention:** Industry lacks standardized naming—terms used interchangeably: "radial," "orbital," "circular," "satellite," "constellation." No clear taxonomy.

3. **Mobile adaptation:** How do orbital layouts adapt responsively? Most examples shown are desktop-focused.

4. **Performance impact:** Animation-heavy orbital layouts may have performance implications on lower-end devices—not extensively documented.

5. **Accessibility compliance:** WCAG compliance for orbital navigation patterns not widely documented or standardized.

---

## Recommendations for Further Research

1. **Direct platform browsing:**
   - Browse Dribbble by "radial-menu" and "orbital" tags directly
   - Filter Behance for interaction/motion design with radial patterns
   - Check Webflow's circular design showcase for live examples

2. **GitHub exploration:**
   - Search for "radial ui," "orbital layout," "circular navigation"
   - Review Orbit CSS real-world usage (GitHub stars/forks)

3. **Design tool communities:**
   - Figma Slack/Discord communities for orbital pattern discussions
   - Webflow community forums for circular layout implementations

4. **Contact designers directly:**
   - DM Dribbble designers with prominent radial menu work
   - Reach out to Awwwards award-winners with navigation focus

---

## Summary of Most Actionable Resources

| Resource | Type | URL | Quality |
|----------|------|-----|---------|
| Orbit CSS | Framework | https://zumerlab.github.io/orbit-docs | ⭐⭐⭐⭐⭐ Production-ready |
| Figma Plugins | Tools | https://www.figma.com/community (search: radial) | ⭐⭐⭐⭐ Designer-friendly |
| Dribbble | Inspiration | https://dribbble.com/search/radial-menu | ⭐⭐⭐⭐ Curated designs |
| Webflow Showcase | Examples | https://webflow.com/made-in-webflow/circular | ⭐⭐⭐⭐ Live implementations |
| Three.js Orbit | 3D Pattern | https://threejs.org/examples/misc_controls_orbit.html | ⭐⭐⭐⭐⭐ Technical reference |
| Bruno Simon | Portfolio | https://bruno-simon.com | ⭐⭐⭐⭐⭐ Premium example |

---

## Conclusion

Orbital and satellite UI layouts exist primarily in three ecosystems:
1. **Niche technical frameworks** (Orbit CSS, Figma plugins)
2. **Design inspiration galleries** (Dribbble, Behance, Awwwards)
3. **Premium creative portfolios** (boutique implementations)

**No mainstream adoption** by major brands exists. The pattern remains a **creative/premium design choice** rather than a standard UI solution. Best suited for creative expression, data visualization, and high-end interactive experiences rather than functional product interfaces.

For **production implementation**, Orbit CSS framework + Framer Motion provide most robust, performant solutions.
