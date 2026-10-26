// No "use client" needed: this is only ever rendered inside GameArea,
// which is already a client component, so it runs in the browser too.
export default function WaterFacts({ fact, points, onNewFact, cost }) {
  return (
    <section className="panel facts" aria-labelledby="facts-heading">
      <h2 id="facts-heading" className="facts-heading">
        Did you know?
      </h2>
      <blockquote className="facts-quote">
        <p id="fact">{fact}</p>
      </blockquote>
      <div className="facts-actions">
        <p className="points-pill">
          Your points <span id="cache-points">{points}</span>
        </p>
        <button className="btn-arcade btn-arcade-small" id="new-fact" type="button" onClick={onNewFact}>
          New fact ({cost} points)
        </button>
      </div>
    </section>
  );
}
