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
  const inputRef = useRef<HTMLInputElement | null>(null);
  const cursorRef = useRef<HTMLElement | null>(null);

  const cursor = keyPressed.length;

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

  useEffect(() => {
    if (!isFinished && hasStarted && cursorRef.current) {
      cursorRef.current.scrollIntoView({
        block: "nearest",
        inline: "nearest",
        behavior: "smooth",
      });
    }
  }, [cursor, hasStarted, isFinished]);

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
    inputRef.current?.focus();
  };

  const resetHandleClick = () => {
    setRandomPassage();
    resetTypingStats();
    setHasStarted(false);
    setShouldRunEffect(false);
  };

  const normalize = (s: string) => s.replace(/\u00A0/g, " ").normalize("NFC");

  const handleInputChange = (value: string) => {
    if (isFinished) return;

    const target = normalize(currentPassage);
    const chars = [...target];

    const typed = normalize(value).slice(0, chars.length);
    const nextKeys = [...typed];

    setKeyPressed(nextKeys);
    setTotalCharsTyped(nextKeys.length);
    setTypedText(nextKeys.length);

    let corrects = 0;
    for (let i = 0; i < nextKeys.length; i++) {
      if (!chars[i]) break;
      if (nextKeys[i].toLowerCase() === chars[i].toLowerCase()) {
        corrects++;
      }
    }
    const incorrects = nextKeys.length - corrects;

    setCorrectChars(corrects);
    setIncorrectChars(incorrects);
    setShouldRunEffect(true);

    if (nextKeys.length === chars.length && mode === "passage") {
      finishTest();
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

  const getStatusClass = (
    typedChar: string | undefined,
    expectedChar: string
  ) => {
    if (typedChar === undefined) return;
    if (typedChar === expectedChar) return "statusCorrect";
    return "statusWrong";
  };

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
    inputRef,
    handleInputChange,
    typedText,
    cursor,
    cursorRef,
    getStatusClass
  };
};
