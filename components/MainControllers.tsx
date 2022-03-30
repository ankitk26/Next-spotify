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
    <div className="flex flex-col items-center justify-center col-span-7 gap-3">
      {/* <pre>{JSON.stringify({ currentTime, duration }, null, 4)}</pre> */}
      <div className="flex items-center gap-5">
        <IoShuffle className="text-lg text-gray" />
        <MdSkipPrevious className="text-xl text-gray" />
        <button
          onClick={togglePlay}
          className="flex items-center justify-center w-8 h-8 text-2xl text-black bg-white rounded-full focus:outline-none"
        >
          {/* KMDK */}
          {isPlaying ? <MdPause /> : <MdPlayArrow />}
        </button>
        <MdSkipNext className="text-xl text-gray" />
        <IoRepeat className="text-lg text-gray" />
      </div>

      <div className="flex items-center justify-center w-full gap-5">
        <span className="text-xs text-gray">
          {currentTime ? fmtMSS(currentTime * 1000) : "0:00"}
        </span>
        <input
          type="range"
          className={styles.player}
          value={slider}
          onChange={(e) => {
            setSlider(parseInt(e.target.value));
            setDrag(parseInt(e.target.value));
          }}
        />
        <span className="text-xs text-gray">
          {duration ? fmtMSS(duration * 1000) : "0:00"}
        </span>
      </div>
    </div>
  );
}
