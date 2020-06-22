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

    container.style.position = 'absolute';
    container.style.bottom = '0';
    container.style.left = '0';
    container.style.width = '100%';
    container.style.display = 'flex';
    container.style.justifyContent = 'center';

    document.body.appendChild(container);
    render(<WebRingWidget />, container);
  });
}
