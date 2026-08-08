import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type TargetRef = { readonly current: Element | Element[] | null };
type TargetRefs = TargetRef | Element | (TargetRef | Element)[];

interface ScrollRevealOptions {
  start?: string;
  titleGap?: number;
  contentStagger?: number;
}

const toElements = (targets: TargetRefs | undefined): Element[] => {
  if (!targets) return [];
  const list = Array.isArray(targets) ? targets : [targets];
  return list.flatMap((target) => {
    if (target && typeof target === 'object' && 'current' in target) {
      const current = target.current;
      if (Array.isArray(current)) {
        return current.filter((el): el is Element => el instanceof Element);
      }
      return current instanceof Element ? [current] : [];
    }
    return target instanceof Element ? [target] : [];
  });
};

/**
 * Unified scroll-reveal sequence, fired once when the section's top crosses
 * `start` (default: 85% of the viewport = 15% of the section in view):
 * 1. Title (and any pills/badges) fades up.
 * 2. Description follows after a short delay.
 * 3. Content blocks fade up with a stagger.
 *
 * Respects `prefers-reduced-motion` by leaving everything visible instantly.
 */
export const useScrollReveal = (
  sectionRef: { readonly current: HTMLElement | null },
  groups: { title?: TargetRefs; description?: TargetRefs; content?: TargetRefs },
  options: ScrollRevealOptions = {}
) => {
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const title = toElements(groups.title);
    const description = toElements(groups.description);
    const content = toElements(groups.content);
    if (title.length + description.length + content.length === 0) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const { start = 'top 85%', titleGap = 0.12, contentStagger = 0.1 } = options;

    const ctx = gsap.context(() => {
      gsap.set(title, { opacity: 0, y: 28 });
      gsap.set(description, { opacity: 0, y: 22 });
      gsap.set(content, { opacity: 0, y: 26 });

      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        scrollTrigger: {
          trigger: section,
          start,
          once: true,
          toggleActions: 'play none none none',
        },
      });

      tl.to(title, { opacity: 1, y: 0, duration: 0.6, stagger: 0.08 }, 0);
      if (description.length) {
        tl.to(description, { opacity: 1, y: 0, duration: 0.6, stagger: 0.08 }, `+=${titleGap}`);
      }
      if (content.length) {
        tl.to(content, { opacity: 1, y: 0, duration: 0.55, stagger: contentStagger }, '+=0.1');
      }
    }, section);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionRef]);
};
