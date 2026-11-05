import type { CSSProperties } from "react";

function scoreTone(score: number) {
  if (score >= 85) return "great";
  if (score >= 65) return "good";
  return "fair";
}

/** The 0-100 match score as a small gauge, with the number always readable as text. */
export default function ScoreRing({ score }: { score: number }) {
  return (
    <div className={`score score-${scoreTone(score)}`} style={{ "--score": score } as CSSProperties}>
      <span className="score-ring">
        <span className="score-num">{score}</span>
      </span>
      <span className="score-label">match</span>
    </div>
  );
}
