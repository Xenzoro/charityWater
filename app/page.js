import GameArea from "@/components/GameArea";

// Server component. The intro text is prerendered HTML at build time;
// only <GameArea /> needs JavaScript in the browser.
export default function Home() {
  return (
    <main>
      <div className="container text-center">
        <h1 id="welcomeMessage">Welcome to Aqua Blaster!</h1>
        <p className="game-instructions mt-3 mb-1">
          <span id="splash-txt">
            You Have 30 Seconds to hit as many targets as possible!
            <br />
            the closer to center you are the more points you get
            <br /> and beware of Dirty Water
          </span>
        </p>
      </div>

      <GameArea />
    </main>
  );
}
