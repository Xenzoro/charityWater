import GameArea from "@/components/GameArea";

// Server component. The intro text is prerendered HTML at build time;
// only <GameArea /> needs JavaScript in the browser.
export default function Home() {
  return (
    <main>
      <header className="hero">
        <h1 id="welcomeMessage" className="hero-title">
          <span className="hero-kicker">Welcome to</span>
          <span className="hero-name">Aqua Blaster!</span>
        </h1>
        <p className="hero-text" id="splash-txt">
          You have 30 seconds to hit as many targets as you can. The closer to the center, the more points you get. And
          beware of dirty water.
        </p>
      </header>

      <GameArea />
    </main>
  );
}
