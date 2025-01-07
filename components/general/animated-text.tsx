import React, { ReactNode } from "react";
import { motion } from "framer-motion";

// Define the types for the component props
interface WrapperProps {
  children: ReactNode;
}

interface AnimatedCharactersProps {
  text: string;
  type: "paragraph" | "heading1" | "heading2"; // Restrict the type to valid tag names
}

// Word wrapper component
const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  return <span className="word-wrapper">{children}</span>;
};

// Map API "type" values to JSX tag names
const tagMap = {
  paragraph: "p",
  heading1: "h1",
  heading2: "h2",
};

// AnimatedCharacters component
const AnimatedCharacters: React.FC<AnimatedCharactersProps> = ({ text, type }) => {
  // Framer Motion variant object, for controlling animation
  const item = {
    hidden: {
      y: "200%",
      color: "#0055FF",
      transition: { ease: [0.455, 0.03, 0.515, 0.955], duration: 0.85 },
    },
    visible: {
      y: 0,
      color: "white",
      transition: { ease: [0.455, 0.03, 0.515, 0.955], duration: 0.75 },
    },
  };

  // Split each word of the text into an array
  const splitWords = text.split(" ");

  // Create storage array
  const words: string[][] = [];

  // Push each word into words array
  splitWords.forEach((word) => {
    words.push(word.split(""));
  });

  // Add a space ("\u00A0") to the end of each word
  words.forEach((word) => {
    word.push("\u00A0");
  });

  // Get the tag name from tagMap
  const Tag = tagMap[type] as keyof JSX.IntrinsicElements;

  return (
    <Tag>
      {words.map((word, wordIndex) => (
        // Wrap each word in the Wrapper component
        <Wrapper key={wordIndex}>
          {word.map((char, charIndex) => (
            <span
              style={{
                overflow: "hidden",
                display: "inline-block",
              }}
              key={charIndex}
            >
              <motion.span
                style={{ display: "inline-block" }}
                variants={item}
              >
                {char}
              </motion.span>
            </span>
          ))}
        </Wrapper>
      ))}
    </Tag>
  );
};

export default AnimatedCharacters;
