import { useEffect, useRef } from "react";
import "./PassageArea.css";

interface PassageAreaProps {
  currentPassage: string;
  hasStarted: boolean;
  startHandleClick: () => void;
  sectionRef: React.RefObject<HTMLElement | null>;
  keyPressed: string[];
  isFinished: boolean;
  inputRef: React.RefObject<HTMLInputElement | null>;
  handleInputChange: (value: string) => void;
}

const getStatusClass = (
  typedChar: string | undefined,
  expectedChar: string
) => {
  if (typedChar === undefined) return;
  if (typedChar === expectedChar) return "statusCorrect";
  return "statusWrong";
};

const getCursorClass = (
  hasStarted: boolean,
  index: number,
  cursor: number,
  isSpace = false
) => {
  if (!hasStarted || index !== cursor) return "";
  return isSpace ? "cursorSpace" : "cursorChar";
};

export const PassageArea = ({
  currentPassage,
  hasStarted,
  startHandleClick,
  sectionRef,
  keyPressed,
  isFinished,
  inputRef,
  handleInputChange,
}: PassageAreaProps) => {
  const normalize = (s: string) => s.replace(/\u00A0/g, " ").normalize("NFC");
  const normalizedPassage = normalize(currentPassage);

  const words = normalizedPassage.split(" ");
  const cursor = keyPressed.length;
  const cursorRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isFinished && hasStarted && cursorRef.current) {
      cursorRef.current.scrollIntoView({
        block: "nearest",
        inline: "nearest",
        behavior: "smooth",
      });
    }
  }, [cursor, hasStarted, isFinished]);

  if (isFinished) return null;

  return (
    <section
      className="passage-area"
      onClick={() => {
        startHandleClick();
        inputRef.current?.focus();
      }}
      ref={sectionRef}
    >
      <input
        ref={inputRef}
        type="text"
        inputMode="text"
        autoCapitalize="none"
        autoComplete="off"
        autoCorrect="off"
        value={keyPressed.join("")}
        onChange={(e) => handleInputChange(e.target.value)}
        style={{
          position: "absolute",
          opacity: 0,
          pointerEvents: "none",
          height: "100px",
          width: "40px",
          top: 0,
          left: 0,
        }}
      />

      {hasStarted ? (
        <p className="passage-text">
          {words.map((word, wordIndex) => (
            <span key={wordIndex} className="baseChar">
              {[...word].map((expectedChar, charIndex) => {
                const globalIndex =
                  words.slice(0, wordIndex).join(" ").length +
                  (wordIndex > 0 ? 1 : 0) +
                  charIndex;

                const typedChar = keyPressed[globalIndex];
                const statusClass = getStatusClass(typedChar, expectedChar);
                const cursorClass = getCursorClass(
                  hasStarted,
                  globalIndex,
                  cursor
                );

                return (
                  <span
                    key={globalIndex}
                    className={`${statusClass} ${cursorClass} baseChar`}
                    ref={globalIndex === cursor ? cursorRef : null}
                  >
                    {expectedChar}
                  </span>
                );
              })}

              {wordIndex < words.length - 1 &&
                (() => {
                  const spaceIndex = words
                    .slice(0, wordIndex + 1)
                    .join(" ").length;

                  const typedChar = keyPressed[spaceIndex];
                  const statusClass = getStatusClass(typedChar, " ");
                  const cursorClass = getCursorClass(
                    hasStarted,
                    spaceIndex,
                    cursor,
                    true
                  );

                  return (
                    <span
                      key={`space-${spaceIndex}`}
                      className={`${statusClass} ${cursorClass} baseChar`}
                      ref={spaceIndex === cursor ? cursorRef : null}
                    >
                      {"\u00A0"}
                    </span>
                  );
                })()}
            </span>
          ))}
        </p>
      ) : (
        <p className="passage-area-blurred">{currentPassage}</p>
      )}

      {!hasStarted ? (
        <div className="passage-area-overlay">
          <button
            className="start-btn"
            onClick={startHandleClick}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                startHandleClick();
              }
            }}
          >
            Start Typing Test
          </button>
          <p>Or click the text and start typing</p>
        </div>
      ) : null}
    </section>
  );
};
