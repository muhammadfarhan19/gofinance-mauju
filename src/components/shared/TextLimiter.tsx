import React from "react";

export interface TextLimiterProps {
  text: string;
  limit: number;
  key: number;
}

export function TextLimiter(props: TextLimiterProps) {
  const [showFullText, setShowFullText] = React.useState<{
    [key: number]: boolean;
  }>({});

  const { text, limit, key } = props;
  const words = text.split(/\s+/);
  const limitedWords = showFullText[key] ? words : words.slice(0, limit);

  const toggleText = (key: number) => {
    setShowFullText((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  return (
    <>
      {limitedWords.join(" ")}
      {text.split(" ").length > 5 && (
        <button
          className="text-blue-600 ml-1 text-xs"
          onClick={() => toggleText(key)}
        >
          {showFullText[key] ? " hide" : "show more"}
        </button>
      )}
    </>
  );
}
