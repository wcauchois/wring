import { h, render } from "preact";

import WebRingWidget from "./WebRingWidget";

function onLoad(fn: () => void) {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => fn);
  } else {
    fn();
  }
}

export function setupWebRingWidget() {
  onLoad(() => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    render(<WebRingWidget />, container);
  });
}
