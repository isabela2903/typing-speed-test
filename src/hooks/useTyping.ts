import { useEffect, useRef, useState } from "react";
import passagesData from "../data/data.json";

export const useTyping = () => {
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">(
    "easy"
  );
  const [mode, setMode] = useState<"timed" | "passage">("passage");
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const [currentPassage, setCurrentPassage] = useState("");
  const [typedText, setTypedText] = useState(0);
  const [shouldRunEffect, setShouldRunEffect] = useState<boolean>(false);
  const [keyPressed, setKeyPressed] = useState<string[]>([]);
  const [correctChars, setCorrectChars] = useState(0);
  const [incorrectChars, setIncorrectChars] = useState(0);
  const [totalCharsTyped, setTotalCharsTyped] = useState(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [personalBest, setPersonalBest] = useState(() => {
    const savedPersonalBest = localStorage.getItem("personal-best");
    return savedPersonalBest ? Number(savedPersonalBest) : 0;
  });
  const [resultMessage, setResultMessage] = useState("");

  const [difficultyOpen, setDifficultyOpen] = useState<boolean>(false);
  const [modeOpen, setModeOpen] = useState<boolean>(false);

  const sectionRef = useRef<HTMLElement | null>(null);

  const accuracy =
    totalCharsTyped === 0 ? 100 : (correctChars / totalCharsTyped) * 100;
  const wpm = timeElapsed === 0 ? 0 : totalCharsTyped / 5 / (timeElapsed / 60);

  const shouldShowConfetti =
    resultMessage === "Baseline Estabilished!" ||
    resultMessage === "High Score Smashed!";

  const resetTypingStats = () => {
    setTypedText(0);
    setTimeElapsed(0);
    setTotalCharsTyped(0);
    setCorrectChars(0);
    setIncorrectChars(0);
    setKeyPressed([]);
    setIsFinished(false);
    setResultMessage("");
  };

  const setRandomPassage = () => {
    const currentList = passagesData[difficulty];
    if (currentList.length === 0) return;

    const randomId = Math.floor(Math.random() * currentList.length);
    const currentText = currentList[randomId].text;

    setCurrentPassage(currentText);
  };

  const finishTest = () => {
    const finalWpm = wpm;
    const savedPersonalBest = localStorage.getItem("personal-best");

    if (!savedPersonalBest) {
      localStorage.setItem("personal-best", String(finalWpm));
      setPersonalBest(finalWpm);
      setResultMessage("Baseline Estabilished!");
    } else {
      const previous = Number(savedPersonalBest);

      if (finalWpm > previous) {
        localStorage.setItem("personal-best", String(finalWpm));
        setPersonalBest(finalWpm);
        setResultMessage("High Score Smashed!");
      } else {
        setResultMessage("Test Complete!");
      }
    }

    setIsFinished(true);
    setShouldRunEffect(false);
  };

  useEffect(() => {
    const currentList = passagesData[difficulty];
    if (currentList.length === 0) return;

    const randomId = Math.floor(Math.random() * currentList.length);
    const currentText = currentList[randomId].text;

    setCurrentPassage(currentText);
    resetTypingStats();
  }, [difficulty]);

  useEffect(() => {
    if (isFinished) return;
    if (!shouldRunEffect) return;

    const id = setTimeout(() => {
      setTimeElapsed((prev) => {
        const next = prev + 1;

        if (mode === "timed" && next >= 30) {
          finishTest();
          return prev;
        }

        return next;
      });
    }, 1000);

    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldRunEffect, mode, isFinished, timeElapsed]);

  const startHandleClick = () => {
    setHasStarted(true);
    resetTypingStats();
    setShouldRunEffect(false);
    sectionRef.current?.focus();
  };

  const resetHandleClick = () => {
    setRandomPassage();
    resetTypingStats();
    setHasStarted(false);
    setShouldRunEffect(false);
  };

  const countMatches = (
    keys: string[],
    chars: string[],
    predicate: (a: string, b: string) => boolean
  ) => {
    return keys.reduce((count, key, index) => {
      const expected = chars[index];
      if (!expected) return count;

      return (
        count + (predicate(key.toLowerCase(), expected.toLowerCase()) ? 1 : 0)
      );
    }, 0);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement | HTMLInputElement>) => {
    if (isFinished) return;
    const key = event.key;

    event.preventDefault();

    const isAllowed =
      key === " " || key === "Backspace" || /^[\p{L}\p{N}\p{P}]$/u.test(key);

    if (!isAllowed) {
      event.preventDefault();
      return;
    }

    let nextKeys: string[];

    if (key === "Backspace") {
      nextKeys = keyPressed.slice(0, -1);
      setTypedText((prev) => (prev > 0 ? prev - 1 : 0));
      setTotalCharsTyped((prev) => (prev > 0 ? prev - 1 : 0));
    } else {
      nextKeys = [...keyPressed, key];
      setTypedText((prev) => prev + 1);
      setTotalCharsTyped((prev) => prev + 1);
    }

    setKeyPressed(nextKeys);

    const chars = [...currentPassage];

    const corrects = countMatches(nextKeys, chars, (a, b) => a === b);
    const incorrects = countMatches(nextKeys, chars, (a, b) => a !== b);

    setShouldRunEffect(true);
    setCorrectChars(corrects);
    setIncorrectChars(incorrects);

    if (nextKeys.length === chars.length && mode === "passage") {
      finishTest();
      return typedText;
    }
  };

  useEffect(() => {
    const handleSpaceScroll = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const isTypingElement =
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable;

      if (e.code === "Space" && !isTypingElement) {
        e.preventDefault();
      }
    };

    window.addEventListener("keydown", handleSpaceScroll);
    return () => window.removeEventListener("keydown", handleSpaceScroll);
  }, []);

  return {
    difficulty,
    setDifficulty,
    currentPassage,
    mode,
    setMode,
    hasStarted,
    startHandleClick,
    timeElapsed,
    resetHandleClick,
    handleKeyDown,
    sectionRef,
    accuracy,
    wpm,
    keyPressed,
    isFinished,
    correctChars,
    incorrectChars,
    personalBest,
    resultMessage,
    shouldShowConfetti,
    difficultyOpen,
    setDifficultyOpen,
    modeOpen,
    setModeOpen,
  };
};
