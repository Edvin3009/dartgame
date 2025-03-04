import React, { useState, useEffect } from "react";
import "./App.css";
import { startGame, updateScore } from "./services/apiService";

function App() {
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const [startingScore, setStartingScore] = useState(501);
  const [score1, setScore1] = useState(startingScore);
  const [score2, setScore2] = useState(startingScore);
  const [throws, setThrows] = useState(["", "", ""]);
  const [turn, setTurn] = useState(0);

  const handleThrowChange = (index, value) => {
    const newThrows = [...throws];
    newThrows[index] = value;
    setThrows(newThrows); 
  };

  async function handleScoreUpdate(scores) {
    const player = turn === 1 ? player1 : player2;
    const updatedScore = await updateScore(
        player,
        scores[0], scores[1], scores[2]
    );

    if (turn === 1) {
        setScore1(prevScore => {
            console.log(`Updating Score1: ${prevScore} → ${updatedScore}`);
            return updatedScore;
        });
    } else {
        setScore2(prevScore => {
            console.log(`Updating Score2: ${prevScore} → ${updatedScore}`);
            return updatedScore;
        });
    }
}

const submitThrows = async () => {
    const scores = throws.map(t => parseInt(t, 10) || 0);
    console.log(scores, turn);

    await handleScoreUpdate(scores);

    setThrows(["", "", ""]);
    setTurn(turn === 1 ? 2 : 1);
};

useEffect(() => {
    console.log("Updated Scores:", score1, score2);

    if (score1 === 0) {
        alert(`${player1} has won the game!`);
        setTurn(0);
    } else if (score2 === 0) {
        alert(`${player2} has won the game!`);
        setTurn(0);
    }
}, [score1, score2]);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>

      {turn === 0 ? (
        <form
        onSubmit={(e) => {
          e.preventDefault();
          startGame(player1, player2, startingScore);
          setTurn(1);
        }}
      >
        <h1>Enter Player Details</h1>
        <input
          type="text"
          placeholder="Player 1 Name"
          value={player1}
          onChange={(e) => setPlayer1(e.target.value)}
        />
        <input
          type="text"
          placeholder="Player 2 Name"
          value={player2}
          onChange={(e) => setPlayer2(e.target.value)}
        />
        <input
          type="number"
          placeholder="Starting Score"
          value={startingScore}
          onChange={(e) => {
            const value = parseInt(e.target.value);
            setStartingScore(value);
            setScore1(value);
            setScore2(value);
          }}
        />
        <button type="submit">Start Game</button>
      </form>
      ) : (
        <form
        onSubmit={(e) =>  {
          e.preventDefault();
          submitThrows();
        }}
        >
          <h1>{turn === 1 ? player1 : player2}'s Turn</h1>
          <h2>To go: {turn === 1 ? score1 : score2}</h2>

          {throws.map((t, index) => (
            <input
              key={index}
              type="number"
              placeholder={`Throw ${index + 1}`}
              value={t}
              onChange={(e) => handleThrowChange(index, e.target.value)}
            />
          ))}

          <button type="submit">Submit Throws</button>
          </form>
      )}
    </div>
  );
}

export default App;