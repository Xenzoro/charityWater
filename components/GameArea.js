// Temporary static version; the playable game replaces this in the next commit.
export default function GameArea() {
  return (
    <div id="gameBox" className="container align-items-center">
      <div className="container text-center mt-1 col-9">
        <div id="stats" className="row align-items-center justify-content-center align-content-center">
          <div className="stats-column col"><p className="h5">Score: <span id="score">0</span></p></div>
          <div className="stats-column col"><p className="h5">Time: <span id="time">30s</span></p></div>
          <div className="stats-column col"><p className="h5">Lives: <span id="lives">💧💧💧</span></p></div>
        </div>
      </div>
      <div className="game-grid">
        {Array.from({ length: 12 }, (_, i) => <div key={i} className="grid-cell" />)}
      </div>
    </div>
  );
}
