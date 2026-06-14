export interface BasketState {
  x: number; // center x, px
  y: number; // fixed y, px (near bottom of canvas)
  width: number;
  height: number;
  targetX: number;
}

export function createBasket(canvasWidth: number, canvasHeight: number): BasketState {
  const width = 90;
  const height = 64;
  return {
    x: canvasWidth / 2,
    y: canvasHeight - height / 2 - 16,
    width,
    height,
    targetX: canvasWidth / 2,
  };
}

/**
 * Smoothly interpolates the basket toward the target (cursor) x position.
 * Horizontal-only movement — y is fixed. `smoothing` in [0,1], higher = snappier.
 */
export function updateBasket(basket: BasketState, dt: number, smoothing = 8) {
  const t = 1 - Math.exp(-smoothing * dt); // frame-rate independent lerp
  basket.x += (basket.targetX - basket.x) * t;
}

/** Returns the basket's "catch zone" bounding box (slightly narrower than visual width). */
export function getBasketCatchBox(basket: BasketState) {
  const catchWidth = basket.width * 0.8;
  return {
    left: basket.x - catchWidth / 2,
    right: basket.x + catchWidth / 2,
    top: basket.y - basket.height * 0.35,
    bottom: basket.y + basket.height * 0.5,
  };
}
