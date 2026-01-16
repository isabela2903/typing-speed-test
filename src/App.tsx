import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { PassageArea } from "./components/PassageArea";
import { Results } from "./components/Results";
import { StatusBar } from "./components/StatusBar";
import { useTyping } from "./hooks/useTyping";

function App() {
  const {
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
    inputRef,
    handleInputChange,
    handleInputKeyDown
  } = useTyping();

  return (
    <>
      <Header personalBest={personalBest} />

      <StatusBar
        difficulty={difficulty}
        setDifficulty={setDifficulty}
        mode={mode}
        setMode={setMode}
        timeElapsed={timeElapsed}
        accuracy={accuracy}
        wpm={wpm}
        isFinished={isFinished}
        hasStarted={hasStarted}
        difficultyOpen={difficultyOpen}
        setDifficultyOpen={setDifficultyOpen}
        modeOpen={modeOpen}
        setModeOpen={setModeOpen}
      />

      <PassageArea
        currentPassage={currentPassage}
        hasStarted={hasStarted}
        startHandleClick={startHandleClick}
        handleKeyDown={handleKeyDown}
        sectionRef={sectionRef}
        keyPressed={keyPressed}
        isFinished={isFinished}
        inputRef={inputRef}
        handleInputChange={handleInputChange}
        handleInputKeyDown={handleInputKeyDown}
      />

      <Footer
        hasStarted={hasStarted}
        resetHandleClick={resetHandleClick}
        isFinished={isFinished}
      />

      <Results
        accuracy={accuracy}
        wpm={wpm}
        correctChars={correctChars}
        incorrectChars={incorrectChars}
        isFinished={isFinished}
        resetHandleClick={resetHandleClick}
        resultMessage={resultMessage}
        shouldShowConfetti={shouldShowConfetti}
      />
    </>
  );
}

export default App;
