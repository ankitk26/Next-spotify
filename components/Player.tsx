import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { formatDuration } from "../utils/formatDuration";

export default function Player() {
  const router = useRouter();

  const [currentPlayback, setCurrentPlayback] = useState(null);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchPlayback = async () => {
      try {
        const res = await axios.get("/api/playback", {
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = res.data;
        data?.success ? setIsError(false) : setIsError(true);
        console.log(res.data);
        setCurrentPlayback(res.data.playback);
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchPlayback();
  }, []);

  const handlePlayback = () => {
    currentPlayback?.is_playing ? pausePlayback() : playPlayback();
  };

  const pausePlayback = () => {
    if (!isError && currentPlayback) {
      axios.put("/api/playback/pause").then(() => console.log("paused"));
    }
  };

  const playPlayback = () => {
    if (!isError && currentPlayback) {
      axios.put("/api/playback/play").then(() => console.log("played"));
    }
  };

  return (
    <footer
      className={`sticky bottom-0 flex items-center justify-between px-5 py-3 border-t border-gray bg-player ${
        router.pathname === "/login" ? "hidden" : "block"
      }`}
    >
      {!isError && currentPlayback ? (
        <>
          {/* {JSON.stringify(currentPlayback.item?.album.name)} */}
          <div className="flex items-center gap-3">
            <img
              src={currentPlayback.item?.album.images[0].url}
              alt={currentPlayback.item?.name}
              className="w-14 h-14"
            />
            <div>
              <h4 className="text-sm">{currentPlayback.item?.name}</h4>
              <h5 className="text-xs text-gray">
                {currentPlayback.item?.artists[0].name}
              </h5>
            </div>
            <span className="ml-5 text-xl material-icons text-primary">
              favorite
            </span>
          </div>

          <div className="flex flex-col items-center justify-center w-1/3 gap-3">
            <div className="flex items-center gap-5">
              <span
                className={`text-lg material-icons ${
                  currentPlayback.shuffle_state ? "text-primary" : "text-gray"
                }`}
              >
                shuffle
              </span>
              <span className="text-lg text-gray material-icons">
                skip_previous
              </span>
              <button
                className="flex items-center justify-center"
                onClick={handlePlayback}
              >
                <span className="flex items-center justify-center w-8 h-8 text-lg text-black bg-white rounded-full material-icons">
                  {currentPlayback.is_playing ? "pause" : "play_arrow"}
                </span>
              </button>
              <span className="text-lg text-gray material-icons">
                skip_next
              </span>
              <span
                className={`text-lg material-icons ${
                  currentPlayback.repeat_state === "off"
                    ? "text-gray"
                    : "text-primary"
                }`}
              >
                repeat
              </span>
            </div>

            <div className="flex items-center w-full gap-5">
              <span className="text-xs text-gray">
                {formatDuration(currentPlayback.progress_ms)}
              </span>
              <div className="w-full mt-4">
                <div className="flex h-1 mb-4 overflow-hidden text-xs bg-[#535353] rounded">
                  <div
                    className="flex flex-col justify-center text-center text-white shadow-none bg-gray whitespace-nowrap"
                    style={{
                      width:
                        (currentPlayback.progress_ms /
                          currentPlayback.item?.duration_ms) *
                        100,
                    }}
                  ></div>
                </div>
              </div>
              <span className="text-xs text-gray">
                {formatDuration(currentPlayback.item?.duration_ms)}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-lg text-gray material-icons">
              mic_external_on
            </span>
            <span className="text-lg text-gray material-icons">
              queue_music
            </span>

            <span className="text-lg text-gray material-icons">volume_up</span>

            <div className="w-20 mt-3">
              <div className="relative w-full pt-1 ">
                <div className="flex h-1 mb-4  overflow-hidden text-xs bg-[#535353] rounded">
                  <div className="flex flex-col justify-center w-1/3 text-center text-white shadow-none bg-gray whitespace-nowrap"></div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </footer>
  );
}
