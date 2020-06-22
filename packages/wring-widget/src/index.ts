import WebRingWidget from "./WebRingWidget";
import { setupWebRingWidget } from "./setup";

(globalThis as any).webring = {
  setupWebRingWidget
};

export {
  WebRingWidget,
  setupWebRingWidget
};
