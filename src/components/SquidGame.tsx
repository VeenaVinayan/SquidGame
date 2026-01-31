import { useState, useEffect, useRef } from "react";

export default function SquidGame() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [light, setLight] = useState<"red" | "green">("red");
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<"win" | "lose" | null>(null);

  const timeoutRef = useRef<number | null>(null);

  const startGame = () => {
    setIsPlaying(true);
    setProgress(0);
    setResult(null);
    setLight("green"); // start fair 🙂
  };

  const stopGame = (status: "win" | "lose") => {
    setIsPlaying(false);
    setResult(status);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const switchLight = () => {
    if (!isPlaying) return;

    setLight((prev) => (prev === "red" ? "green" : "red"));

    const timeout = Math.floor(500 + Math.random() * 500);
    timeoutRef.current = setTimeout(switchLight, timeout);
  };

  const handleMove = () => {
    if (!isPlaying || result) return;

    if (light === "green") {
      setProgress((prev) => Math.min(prev + 10, 100));
    } else {
      stopGame("lose");
    }
  };

  // Start / stop light switching
  useEffect(() => {
    if (isPlaying) {
      switchLight();
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [isPlaying]);

  // Win condition
  useEffect(() => {
    if (progress >= 100 && isPlaying) {
      stopGame("win");
    }
  }, [progress, isPlaying]);

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Squid Game: Red Light Green Light</h1>

      {!isPlaying && !result && (
        <button
          onClick={startGame}
          style={{ padding: "10px 20px", marginTop: "20px" }}
        >
          Play
        </button>
      )}

      {isPlaying && (
        <>
          <div
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              margin: "20px auto",
              backgroundColor: light === "red" ? "red" : "green",
            }}
          />

          <button
            onClick={handleMove}
            disabled={light === "red"}
            style={{
              padding: "10px 20px",
              margin: "10px",
              opacity: light === "red" ? 0.5 : 1,
              cursor: light === "red" ? "not-allowed" : "pointer",
            }}
          >
            Move
          </button>

          <div
            style={{
              width: "300px",
              height: "20px",
              background: "#ddd",
              borderRadius: "10px",
              margin: "20px auto",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${progress}%`,
                background: "green",
                transition: "width 0.3s",
              }}
            />
          </div>

          <p>Progress: {progress}%</p>
        </>
      )}

      {result && (
        <div>
          <p
            style={{
              fontWeight: "bold",
              fontSize: "18px",
              color: result === "win" ? "green" : "red",
            }}
          >
            {result === "win" ? "🎉 You Win!" : "💀 You Lose!"}
          </p>

          <button
            onClick={startGame}
            style={{ padding: "10px 20px", marginTop: "10px" }}
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  );
}
