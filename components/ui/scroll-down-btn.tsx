import React from "react";
import "../../assets/styles/scroll-down-btn.css";
import { cn } from "@/lib/utils";

interface ScrollDownButtonProps {
  className?: string;
  text?: string;
  onClick?: () => void;
}

const ScrollDownButton = (props: ScrollDownButtonProps) => {
  const { text, className, onClick } = props;

  return (
    <section id="section06" className={cn(className, "demo")}>
      <a style={{display: "flex"}} className="cursor-pointer" onClick={onClick}><span></span>{text ?? ""}</a>
    </section>
  );
};

export default ScrollDownButton;