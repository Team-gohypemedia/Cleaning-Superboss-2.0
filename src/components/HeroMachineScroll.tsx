"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const TOTAL_FRAMES = 240;
const FRAME_PATH = (index: number) =>
  `/cleaner_home_frames_webp/frame_${String(index).padStart(5, "0")}.webp`;

const PHRASES = [
  {
    id: 1,
    text: "YOUR SPACE. OUR STANDARD.",
    startPct: 0.02,
    endPct: 0.3,
  },
  {
    id: 2,
    text: "Premium cleaning services for Australian homes and businesses.",
    startPct: 0.35,
    endPct: 0.63,
  },
  {
    id: 3,
    text: "Professional • Insured • Reliable • Easy to Book",
    startPct: 0.68,
    endPct: 0.95,
  },
];

export default function HeroMachineScroll() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameObj = useRef({ frame: 0 });

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const loadedImages: HTMLImageElement[] = [];

    // Full screen object-cover Canvas drawing function
    const drawFrame = (index: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const img = imagesRef.current[index];
      if (!img || !img.complete) return;

      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();

      if (canvas.width !== rect.width * dpr || canvas.height !== rect.height * dpr) {
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
      }

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, rect.width, rect.height);

      const imgAspect = img.width / img.height;
      const canvasAspect = rect.width / rect.height;

      let renderWidth = rect.width;
      let renderHeight = rect.height;
      let offsetX = 0;
      let offsetY = 0;

      // Full Cover math: Fill full canvas screen edge-to-edge
      if (canvasAspect > imgAspect) {
        renderWidth = rect.width;
        renderHeight = rect.width / imgAspect;
        offsetY = (rect.height - renderHeight) / 2;
      } else {
        renderHeight = rect.height;
        renderWidth = rect.height * imgAspect;
        offsetX = (rect.width - renderWidth) / 2;
      }

      ctx.drawImage(img, offsetX, offsetY, renderWidth, renderHeight);
      ctx.restore();
    };

    // Preload all 192 frames silently in the background
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = FRAME_PATH(i);
      if (i === 1) {
        img.onload = () => drawFrame(0);
        if (img.complete) {
          drawFrame(0);
        }
      }
      loadedImages.push(img);
    }
    imagesRef.current = loadedImages;

    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Pin hero section and scrub frame sequence + 3 centered phrases until end
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=500%",
          pin: true,
          scrub: 0.5,
          onLeave: () => {
            window.dispatchEvent(new CustomEvent("heroScrollState", { detail: { pastHero: true } }));
          },
          onEnterBack: () => {
            window.dispatchEvent(new CustomEvent("heroScrollState", { detail: { pastHero: false } }));
          },
          onUpdate: (self) => {
            const progress = self.progress;

            // Update 3D Frame Index
            const frameIndex = Math.min(
              TOTAL_FRAMES - 1,
              Math.floor(progress * (TOTAL_FRAMES - 1))
            );
            currentFrameObj.current.frame = frameIndex;
            drawFrame(frameIndex);

            // Update 3 Centered Text Phrases & Character Fills
            PHRASES.forEach((phrase, pIdx) => {
              const phraseElem = section.querySelector(`.phrase-container-${pIdx}`);
              if (!phraseElem) return;

              // Determine phrase opacity
              let phraseOpacity = 0;
              const fadeBuffer = 0.04;

              if (progress >= phrase.startPct && progress <= phrase.endPct) {
                if (progress < phrase.startPct + fadeBuffer) {
                  phraseOpacity = (progress - phrase.startPct) / fadeBuffer;
                } else if (progress > phrase.endPct - fadeBuffer) {
                  phraseOpacity = (phrase.endPct - progress) / fadeBuffer;
                } else {
                  phraseOpacity = 1;
                }
              } else {
                phraseOpacity = 0;
              }

              (phraseElem as HTMLElement).style.opacity = String(phraseOpacity);
              (phraseElem as HTMLElement).style.pointerEvents =
                phraseOpacity > 0.5 ? "auto" : "none";

              // Update Character Fill inside phrase
              if (phraseOpacity > 0) {
                const charSpans = phraseElem.querySelectorAll(".char-span");
                const phraseProg = Math.max(
                  0,
                  Math.min(
                    1,
                    (progress - phrase.startPct) / (phrase.endPct - phrase.startPct)
                  )
                );
                const activeCharIdx = Math.floor(phraseProg * charSpans.length);

                charSpans.forEach((span, cIdx) => {
                  const el = span as HTMLElement;
                  if (cIdx < activeCharIdx) {
                    el.style.color = "#ffffff";
                    el.style.opacity = "1";
                    el.style.textShadow = "none";
                  } else if (cIdx === activeCharIdx) {
                    el.style.color = "#2196f3"; // Vibrant Sky Blue (#2196f3)
                    el.style.opacity = "1";
                    el.style.textShadow = "0 0 24px rgba(33, 150, 243, 0.95)";
                  } else {
                    // Hide upcoming unread characters completely until scroll reaches them
                    el.style.color = "transparent";
                    el.style.opacity = "0";
                    el.style.textShadow = "none";
                  }
                });
              }
            });
          },
        },
      });

      // Cursor follower quickSetter positioning
      const follower = followerRef.current;
      if (follower) {
        gsap.set(follower, { xPercent: -50, yPercent: -50, scale: 0, opacity: 0 });

        const xSetter = gsap.quickSetter(follower, "x", "px");
        const ySetter = gsap.quickSetter(follower, "y", "px");

        const onMouseMove = (e: MouseEvent) => {
          xSetter(e.clientX);
          ySetter(e.clientY);
        };

        const onMouseEnter = () => {
          gsap.to(follower, { scale: 1, opacity: 1, duration: 0.3, ease: "power2.out" });
        };

        const onMouseLeave = () => {
          gsap.to(follower, { scale: 0, opacity: 0, duration: 0.3, ease: "power2.out" });
        };

        section.addEventListener("mousemove", onMouseMove);
        section.addEventListener("mouseenter", onMouseEnter);
        section.addEventListener("mouseleave", onMouseLeave);

        // Fade out cursor follower when scrolling down hero
        ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: "+=15%",
          scrub: true,
          onUpdate: (self) => {
            gsap.set(follower, { opacity: Math.max(0, 1 - self.progress * 4) });
          }
        });
      }
    }, section);

    const handleResize = () => {
      drawFrame(currentFrameObj.current.frame);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      ctx.revert();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const followerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={sectionRef}
      id="hero-section"
      className="relative h-screen h-[100dvh] w-full bg-zinc-950 overflow-hidden flex items-center justify-center select-none lg:cursor-none"
    >
      {/* Self-contained CSS styles for the metallic shiny text effect */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes shineSweep {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
        .shiny-text-effect {
          background: linear-gradient(110deg, rgba(255,255,255,0.45) 35%, rgba(255,255,255,1) 50%, rgba(255,255,255,0.45) 65%);
          background-size: 200% auto;
          color: transparent;
          -webkit-background-clip: text;
          background-clip: text;
          animation: shineSweep 2.5s linear infinite;
        }
      `}} />

      {/* Custom Mouse Follower Container */}
      <div
        ref={followerRef}
        className="hidden lg:block fixed top-0 left-0 pointer-events-none z-50"
        style={{ willChange: "transform" }}
      >
        <span className="shiny-text-effect font-sans text-[14px] tracking-[0.32em] font-black uppercase whitespace-nowrap drop-shadow-xl">
          Scroll to Explore
        </span>
      </div>

      {/* 3D Frame Sequence Full Screen Canvas - 100% Clear with NO Overlay Shadow */}
      <div className="absolute inset-0 z-0 w-full h-full">
        <canvas
          ref={canvasRef}
          className="w-full h-full pointer-events-none"
        />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 max-w-[1920px] mx-auto px-3 sm:px-6 md:px-10 lg:px-14 xl:px-16 w-full h-full flex flex-col justify-between pt-20 sm:pt-28 pb-6 sm:pb-10 pointer-events-none">
        {/* Spacer */}
        <div />

        {/* Lower Positioned Display Text Container */}
        <div className="relative w-full max-w-7xl mx-auto flex items-center justify-center mb-6 sm:mb-10 md:mb-12 py-4 sm:py-6 text-center min-h-[140px] sm:min-h-[180px] md:min-h-[220px]">
          {PHRASES.map((phrase, pIdx) => (
            <div
              key={phrase.id}
              className={`phrase-container-${pIdx} absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-200 pointer-events-none`}
            >
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold tracking-tight leading-snug text-center max-w-4xl mx-auto drop-shadow-md">
                {phrase.text.split("").map((char, cIdx) => (
                  <span
                    key={cIdx}
                    className="char-span transition-all duration-100"
                    style={{ color: "transparent", opacity: 0 }}
                  >
                    {char}
                  </span>
                ))}
              </h1>
            </div>
          ))}
        </div>

        {/* Bottom Bar: Action Buttons + Trust Strip */}
        <div className="w-full flex flex-col items-center gap-2.5 sm:gap-3.5 pointer-events-auto pb-2">
          {/* Action CTAs (Side by side on mobile and desktop) */}
          <div className="flex flex-row items-center justify-center gap-2 sm:gap-3.5 w-full max-w-md mx-auto px-2">
            <a
              href="#contact"
              className="flex-1 sm:flex-initial px-3.5 sm:px-7 py-2.5 sm:py-3 rounded-full bg-[#0d47a1] text-white text-[11px] sm:text-xs md:text-sm font-extrabold uppercase tracking-wider hover:bg-[#2196f3] transition-all shadow-xl shadow-[#0d47a1]/40 active:scale-95 text-center whitespace-nowrap border border-[#2196f3]/40"
            >
              GET INSTANT QUOTE
            </a>
            <a
              href="/book"
              className="flex-1 sm:flex-initial px-3.5 sm:px-7 py-2.5 sm:py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/25 text-white text-[11px] sm:text-xs md:text-sm font-extrabold uppercase tracking-wider hover:bg-white/20 transition-all shadow-xl active:scale-95 text-center whitespace-nowrap"
            >
              BOOK A CLEAN
            </a>
          </div>

          {/* Trust Strip (Strictly 1 line on mobile) */}
          <div className="flex flex-row items-center justify-center gap-x-1.5 sm:gap-x-2.5 text-[9px] xs:text-[10.5px] sm:text-xs text-white/90 font-semibold tracking-tight sm:tracking-wide text-center px-2 whitespace-nowrap">
            <span>Professional</span>
            <span className="text-white/40">•</span>
            <span>Insured</span>
            <span className="text-white/40">•</span>
            <span>Reliable</span>
            <span className="text-white/40">•</span>
            <span>Easy to Book</span>
          </div>
        </div>
      </div>
    </section>
  );
}
