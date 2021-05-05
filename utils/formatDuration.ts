export const formatDuration = (duration: number) => {
  const temp = Math.floor(duration / 1000);
  const minutes = Math.floor(temp / 60);
  const seconds = temp - minutes * 60;
  return `${minutes}:${seconds >= 10 ? seconds : `0${seconds}`}`;
};
