"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

import { useReducedMotion } from "@/hooks/use-reduced-motion";

const variants: Variants = {
  hidden: { opacity: 0, y: 32, scale: 0.97, filter: "blur(6px)" },
  visible: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" },
};

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "li";
}

export function Reveal({ children, className, delay = 0, as = "div" }: RevealProps) {
  const reduced = useReducedMotion();
  const MotionTag = as === "li" ? motion.li : motion.div;

  if (reduced) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={variants}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </MotionTag>
  );
}
