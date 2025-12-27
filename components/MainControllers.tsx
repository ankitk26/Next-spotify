import { IoRepeat, IoShuffle } from "react-icons/io5";
import {
  MdPause,
  MdPlayArrow,
  MdSkipNext,
  MdSkipPrevious,
} from "react-icons/md";
import { usePlayer } from "../context/PlayerContext";
import styles from "../styles/ProgressBar.module.css";
import { fmtMSS } from "../utils/formatDuration";

export default function MainControllers() {
  const {
    isPlaying,
    setSlider,
    setDrag,
    togglePlay,
    duration,
    currentTime,
    slider,
  } = usePlayer();

  return (
    <div className="col-span-7 flex flex-col items-center justify-center gap-3">
      {/* <pre>{JSON.stringify({ currentTime, duration }, null, 4)}</pre> */}
      <div className="flex items-center gap-5">
        <IoShuffle className="text-gray text-lg" />
        <MdSkipPrevious className="text-gray text-xl" />
        <button
          className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-2xl text-black focus:outline-none"
          onClick={togglePlay}
        >
          {/* KMDK */}
          {isPlaying ? <MdPause /> : <MdPlayArrow />}
        </button>
        <MdSkipNext className="text-gray text-xl" />
        <IoRepeat className="text-gray text-lg" />
      </div>

      <div className="flex w-full items-center justify-center gap-5">
        <span className="text-gray text-xs">
          {currentTime ? fmtMSS(currentTime * 1000) : "0:00"}
        </span>
        <input
          className={styles.player}
          onChange={(e) => {
            setSlider(Number.parseInt(e.target.value));
            setDrag(Number.parseInt(e.target.value));
          }}
          type="range"
          value={slider}
        />
        <span className="text-gray text-xs">
          {duration ? fmtMSS(duration * 1000) : "0:00"}
        </span>
      </div>
    </div>
  );
}
