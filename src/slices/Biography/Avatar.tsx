"use client";
import { ImageField } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { useEffect, useRef } from "react";
import clsx from "clsx";
import { gsap } from "gsap";

type AvatarProps = {
  image: ImageField;
  className?: string;
};
export default function Avatar({ image, className }: AvatarProps) {
  const component = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(
        ".avatar",
        { opacity: 0, scale: 1.4 },
        { scale: 1, opacity: 1, duration: 1.3, ease: "power3.inOut" }
      );
    });
  });

  return (
    <div ref={component} className={clsx("realtive h-full w-full", className)}>
      <div className="avatar aspect=square overflow-hidden rounded-3xl border-2 border-slate-700 opacity-0">
        <PrismicNextImage
          field={image}
          className="avatar-image h-full w-full object-fill"
          imgixParams={{ q: 90 }}
        />
        <div className="higlight absolute inset-0 hidden w-full scale-110 bg-gradient-to-tr from-transparent via white-transparent opacity-0 md:block"></div>
      </div>
    </div>
  );
}
