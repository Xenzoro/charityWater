// No "use client" needed: this is only ever rendered inside GameArea,
// which is already a client component, so it runs in the browser too.
export default function WaterFacts({ fact, points, onNewFact, cost }) {
  return (
    <div className="container text-center">
      <h2 className="water-facts-header mt-5 mb-3" style={{ color: "#FFC907" }}>
        Did You Know?
      </h2>
      <p className="water-facts mb-5">
        <span id="fact">{fact}</span>
      </p>
      <p className="h5 h5Points">
        Your Points: <span id="cache-points">{points}</span>
      </p>
      <button className="button btn btn-primary col-5 mb-5" id="new-fact" type="button" onClick={onNewFact}>
        New Fact ({cost} Points)
      </button>
    </div>
  );
}
