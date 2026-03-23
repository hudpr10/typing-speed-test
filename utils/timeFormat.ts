export default function timeFormat(time: number) {
  const m = Math.floor(time / 60)
    .toString()
    .padStart(2, "0");
  const s = (time % 60).toString().padStart(2, "0");

  return `${m}:${s}`;
}
