# Mai Randy: 2026 Senior Architecture Portfolio

This repository houses a massive, highly-optimized, single-page application (SPA) portfolio. Rather than relying on heavy component frameworks like React or Vue, this project was engineered using a "Vanilla+" approach—combining raw DOM manipulation with industry-grade physics engines to ensure absolute maximum frame-rates (60fps+) across all devices.

---

## ⚡ The Technology Stack

Below is the definitive breakdown of every core technology used to engineer this project and exactly how it functions within the ecosystem:

### 1. Vite (The Engine)
* **What it is:** A lightning-fast frontend build tool and development server.
* **How it works here:** Vite powers the local server (`npm run dev`) and handles the complex task of minifying our HTML, CSS, and JS into a tiny, ultra-optimized bundle when we are ready to deploy. It replaces older, slower bundlers like Webpack.

### 2. Tailwind CSS v4 (The Paint)
* **What it is:** A utility-first CSS framework. We are using the bleeding-edge v4 Alpha.
* **How it works here:** Instead of writing thousands of lines of custom CSS, Tailwind allows us to style elements directly in the HTML (`class="flex items-center justify-center bg-primary rounded-full"`). We used Tailwind to engineer the complex **Bento Grid** geometries, the massive neon drop shadows (`drop-shadow-[0_0_15px_...]`), and the heavy responsive breakpoints (`md:`, `lg:`).

### 3. GSAP / GreenSock (The Choreographer)
* **What it is:** The professional industry standard for high-performance JavaScript animations. 
* **How it works here:** GSAP handles every spatial timeline in the project. 
   - It controls the `0 to 100%` cinematic loading screen.
   - It controls the precise order of elements revealing in the Hero section (`stagger` animations on `.hero-anim`).
   - It handles the JavaScript height-calculations for the FAQ accordion.

### 4. GSAP ScrollTrigger (The Spatial Listener)
* **What it is:** An extension of GSAP designed specifically to react to the physics of scrolling.
* **How it works here:** As you scroll down the page, ScrollTrigger is constantly measuring exactly where you are. When the "Precision Workflow" timeline or a new Bento Box enters the viewport, ScrollTrigger fires the `.gsap-fade-up` timeline, causing the data to float effortlessly into existence.

### 5. Lenis (The Physics Engine)
* **What it is:** A lightweight JavaScript scroll engine that hijacks the default browser scroll behavior.
* **How it works here:** Native browser scrolling is often "choppy" and disconnected. Lenis applies momentum-based physics (linear interpolation) to your mouse wheel. This is the exact technology that gives the site that famous "Cinematic Digital Agency" feeling, making everything glide like butter.

### 6. Spline 3D (The Z-Axis)
* **What it is:** A collaborative WebGL 3D design software.
* **How it works here:** The massive, dark abstract geometry interacting with your mouse in the `#hero` section is not a video. It is a live, rendering 3D scene embedded via the `<spline-viewer>` web component. It dynamically tracks cursor coordinates on Desktop, but we explicitly disabled its pointer events on Mobile to ensure touch users do not get stuck while scrolling.

### 7. CSS Infinite Marquees (The Skill Ecosystem)
* **What it is:** Pure CSS spatial looping.
* **How it works here:** Instead of using JavaScript to slowly move the massive array of Tech Stack SVGs sideways, we wrote pure CSS keyframes (`@keyframes marquee`) inside `style.css` to translate the elements infinitely across the X-axis. This leverages the GPU directly, ensuring zero frame drops.

### 8. The Custom Magnetic Cursor 
* **What it is:** A native DOM script located in `main.js`.
* **How it works here:** We globally hide the default Windows/Mac mouse pointer (`cursor: none`). We then coded two separate `div` elements (a tiny dot and a larger outline circle). We use a `mousemove` event listener to track the physical mouse, and we apply a slight "delay" to the larger outline circle. Whenever the custom cursor passes over an element with the `.hover-target` class, the outline circle aggressively expands and turns white (`mix-blend-mode: difference`), acting like a magnet.

---

## 🚀 Deployment instructions
This project is deployment-ready for **Vercel**, **Netlify**, or **Cloudflare Pages**.
1. Connect this repository to your hosting provider.
2. Build Command: `npm run build`
3. Output Directory: `dist`
