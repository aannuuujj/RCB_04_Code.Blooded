import React from "react";

type SkillTagProps = {
  text: string;
  variant: "match" | "missing" | "neutral";
};

export default function SkillTag({ text, variant }: SkillTagProps) {
  let styleClasses = "";

  if (variant === "match") {
    styleClasses = "bg-brand-black text-brand-white border border-brand-black";
  } else if (variant === "missing") {
    styleClasses = "bg-brand-white text-brand-black border border-brand-black";
  } else if (variant === "neutral") {
    styleClasses = "bg-brand-light text-brand-black border border-brand-light";
  }

  return (
    <span className={`px-4 py-1.5 text-xs font-bold tracking-wide rounded-full ${styleClasses}`}>
      {text}
    </span>
  );
}
