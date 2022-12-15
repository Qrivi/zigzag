import Phaser from "phaser";
import HomeScene from "./phaser/scenes/HomeScene";
import App from "./react/App";
import { createRoot } from "react-dom/client";
import "./index.css";

new Phaser.Game({
  type: Phaser.AUTO,
  parent: "body",
  expandParent: false,
  backgroundColor: "#282c34",
  scale: {
    mode: Phaser.Scale.NONE,
    width: window.innerWidth * window.devicePixelRatio,
    height: window.innerHeight * window.devicePixelRatio,
    zoom: 1 / window.devicePixelRatio,
  },
  fps: {
    target: 144,
    forceSetTimeOut: true,
  },
  scene: [HomeScene],
});

const container = document.getElementById("app");
const root = createRoot(container!);
root.render(<App />);
