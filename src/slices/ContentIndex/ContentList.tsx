"use client";

import React, { useRef, useState, useEffect } from "react";
import { asImageSrc, isFilled, Content } from "@prismicio/client";
import * as prismicT from "@prismicio/types";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MdArrowOutward } from "react-icons/md";

gsap.registerPlugin(ScrollTrigger);

type ContentListProps = {
  items: Content.BlogPostDocument[] | Content.ProjectDocument[];
  contentType: string;
  fallbackItemImage: prismicT.ImageField;
  viewMoreText: string;
};

export default function ContentList({
  items,
  contentType,
  fallbackItemImage,
  viewMoreText = "Read More",
}: ContentListProps) {
  const component = useRef<HTMLUListElement>(null);
  const itemsRef = useRef<Array<HTMLLIElement | null>>([]);
  const revealRef = useRef<HTMLDivElement>(null);

  const [hoverState, setHoverState] = useState<{ hovering: boolean; itemIndex: number | null }>({
    hovering: false,
    itemIndex: null,
  });

  const lastMousePos = useRef({ x: 0, y: 0 });
  const urlPrefix = contentType === "Blogs" ? "/blog" : "/project";

  useEffect(() => {
    const ctx = gsap.context(() => {
      itemsRef.current.forEach((item) => {
        if (item) {
          gsap.fromTo(
            item,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 1.3,
              ease: "elastic.out(1,0.3)",
              stagger: 0.2,
              scrollTrigger: {
                trigger: item,
                start: "top bottom-=100px",
                end: "bottom center",
                toggleActions: "play none none none",
              },
            }
          );
        }
      });
    }, component);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: MouseEvent) => {
    const mousePos = { x: e.clientX, y: e.clientY + window.scrollY };
    const speed = Math.sqrt(Math.pow(mousePos.x - lastMousePos.current.x, 2));
    const maxY = window.scrollY + window.innerHeight - 350;
    const maxX = window.innerWidth - 250;

    gsap.to(revealRef.current, {
      x: gsap.utils.clamp(0, maxX, mousePos.x - 110),
      y: gsap.utils.clamp(0, maxY, mousePos.y - 160),
      rotation: speed * (mousePos.x > lastMousePos.current.x ? 1 : -1),
      opacity: hoverState.hovering ? 1 : 0,
      visibility: "visible",
      ease: "power3.out",
      duration: 1.3,
    });

    lastMousePos.current = mousePos;
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [hoverState]);

  const contentImages = items.map((item) =>
    asImageSrc(
      isFilled.image(item.data.hover_image) ? item.data.hover_image : fallbackItemImage,
      { fit: "crop", w: 220, h: 320, exp: -10 }
    )
  );

  useEffect(() => {
    contentImages.forEach((url) => {
      if (url) new Image().src = url;
    });
  }, [contentImages]);

  return (
    <ul
      ref={component}
      className="grid border-b border-b-slate-100"
      onMouseLeave={() => setHoverState({ hovering: false, itemIndex: null })}
    >
      {items.map((post, index) => (
        <li
          key={index}
          ref={(el) => {
            if (el) itemsRef.current[index] = el;
          }}
          onMouseEnter={() => setHoverState({ hovering: true, itemIndex: index })}
          className="list-item opacity-0"
        >
          <a
            href={`${urlPrefix}/${post.uid}`}
            className="flex flex-col justify-between border-t border-t-slate-100 py-10 text-slate-200 md:flex-row"
            aria-label={post.data.title || ""}
          >
            <div className="flex flex-col">
              <span className="text-3xl font-bold">{post.data.title}</span>
              <div className="flex gap-3 text-yellow-400">
                {post.tags.map((tag, idx) => (
                  <span key={idx} className="text-lg font-bold">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <span className="ml-auto flex items-center gap-2 text-xl font-medium md:ml-0">
              {viewMoreText} <MdArrowOutward />
            </span>
          </a>
        </li>
      ))}
      <div
        className="hover-reveal pointer-events-none absolute left-0 top-0 -z-10 h-[320px] w-[220px] rounded-lg bg-cover bg-center opacity-0 transition-[background] duration-300"
        style={{
          backgroundImage:
            hoverState.itemIndex !== null ? `url(${contentImages[hoverState.itemIndex]})` : "",
        }}
        ref={revealRef}
      ></div>
    </ul>
  );
}
