import type { LetterEntityState } from "./entities/Letter";
import { getBasketCatchBox, type BasketState } from "./entities/Basket";

/** AABB check between a falling letter's bounding box and the basket's catch zone. */
export function checkLetterBasketCollision(
  letter: LetterEntityState,
  basket: BasketState
): boolean {
  const box = getBasketCatchBox(basket);
  const half = letter.size / 2;

  const letterLeft = letter.x - half;
  const letterRight = letter.x + half;
  const letterTop = letter.y - half;
  const letterBottom = letter.y + half;

  return (
    letterRight > box.left &&
    letterLeft < box.right &&
    letterBottom > box.top &&
    letterTop < box.bottom
  );
}
