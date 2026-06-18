export function initializeSwipe(callback) {
  let startX = 0;
  let startY = 0;

  document.addEventListener('touchstart', (event) => {
    startX = event.touches[0].clientX;
    startY = event.touches[0].clientY;
  });

  document.addEventListener('touchend', (event) => {
    const endX = event.changedTouches[0].clientX;
    const endY = event.changedTouches[0].clientY;

    const diffX = endX - startX;
    const diffY = endY - startY;

    const threshold = 30;

    // Ignora toques muito pequenos
    if (
      Math.abs(diffX) < threshold &&
      Math.abs(diffY) < threshold
    ) {
      return;
    }

    // Movimento horizontal
    if (Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX > 0) {
        callback('right');
      } else {
        callback('left');
      }
    } else {
      // Movimento vertical
      if (diffY > 0) {
        callback('down');
      } else {
        callback('up');
      }
    }
  });
}