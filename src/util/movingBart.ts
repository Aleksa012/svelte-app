const angle = (
  mouseX: number,
  mouseY: number,
  anchorX: number,
  anchorY: number
): number => {
  const dy = anchorY - mouseY;
  const dx = anchorX - mouseX;

  const rad = Math.atan2(dy, dx);
  const deg = (rad * 180) / Math.PI;

  return deg;
};

export const movingBart = (
  e: MouseEvent & {
    currentTarget: EventTarget & HTMLDivElement;
  }
) => {
  const mouseX = e.clientX;
  const mouseY = e.clientY;

  const anchor = document.getElementById("bart");
  const rekt = anchor?.getBoundingClientRect();
  if (!rekt) return;
  const anchorX = rekt.left + rekt.width / 2;
  const anchorY = rekt.top + rekt.height / 3;

  const angleDeg = angle(mouseX, mouseY, anchorX, anchorY);

  const eye1 = document.getElementById("eye1");
  const eye2 = document.getElementById("eye2");

  if (!eye1 || !eye2) return;
  eye1.style.transform = `rotate(${100 + angleDeg}deg)`;
  eye2.style.transform = `rotate(${160 + angleDeg}deg)`;
};
