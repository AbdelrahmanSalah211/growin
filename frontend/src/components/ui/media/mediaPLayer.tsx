"use client";

import React, { useState, useRef, useEffect } from "react";
import {
    Play,
    Pause,
    Volume2,
    VolumeX,
    Maximize,
    Rewind,
    FastForward,
    RotateCcw,
} from "lucide-react";

const MediaPlayer = ({
  url,
  thumbnailUrl = null,
  autoPlay = false,
  controls = true,
  className = "",
  hasNext = false,
  hasPrev = false,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showControls, setShowControls] = useState(true);
  const [isInitialState, setIsInitialState] = useState(true);
  const [bufferedPercentage, setBufferedPercentage] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [isEnded, setIsEnded] = useState(false);

  const videoRef = useRef(null);
  const progressRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
      setIsLoading(false);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
    };

    const handleTimeUpdateAndBuffer = () => {
      handleTimeUpdate();
      updateBuffered();
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setIsInitialState(true);
    };

    const handleCanPlay = () => {
      setIsLoading(false);
    };

    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("timeupdate", handleTimeUpdateAndBuffer);
    video.addEventListener("ended", handleEnded);
    video.addEventListener("canplay", handleCanPlay);
    video.addEventListener("progress", updateBuffered);

    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("timeupdate", handleTimeUpdateAndBuffer);
      video.removeEventListener("ended", handleEnded);
      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("progress", updateBuffered);
    };
  }, []);

  const handlePlaybackRateChange = (rate) => {
    const video = videoRef.current;
    if (!video) return;

    video.playbackRate = rate;
    setPlaybackRate(rate);
  };

  const updateBuffered = () => {
    const video = videoRef.current;
    if (!video || !video.buffered?.length) return;

    const bufferedEnd = video.buffered.end(video.buffered.length - 1);
    const buffered = (bufferedEnd / video.duration) * 100;
    setBufferedPercentage(buffered);
  };

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
      setIsInitialState(false);
      setIsEnded(false);
    }
    setIsPlaying(!isPlaying);
  };
  const handleEnded = () => {
    setIsPlaying(false);
    setIsInitialState(false);
    setIsEnded(true);
  };

  const handleProgressClick = (e) => {
    const video = videoRef.current;
    const progressBar = progressRef.current;
    if (!video || !progressBar) return;

    const rect = progressBar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = (clickX / rect.width) * duration;

    video.currentTime = newTime;
    setCurrentTime(newTime);
  };
  const skipBackward = () => {
    const video = videoRef.current;
    if (video) {
      video.currentTime = Math.max(0, video.currentTime - 10);
    }
  };

  const skipForward = () => {
    const video = videoRef.current;
    if (video) {
      video.currentTime = Math.min(video.duration, video.currentTime + 10);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e) => {
    const video = videoRef.current;
    if (!video) return;

    const newVolume = parseFloat(e.target.value);
    video.volume = newVolume;
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const toggleFullscreen = () => {
    const container = containerRef.current;
    if (!container) return;

    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      container.requestFullscreen();
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const progressPercentage = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden rounded-t-4xl w-full aspect-video ${className}`}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(controls)}
      style={{ backgroundColor: "var(--color-surface)" }}
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        className="w-full h-full object-cover block"
        src={url}
        poster={thumbnailUrl}
        preload="metadata"
        playsInline
        onClick={togglePlay}
        onLoadStart={() => setIsLoading(true)}
        onEnded={handleEnded}
        style={{ minHeight: "42.1875rem" }}
      />

      {/* Loading Spinner */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-primary)]"></div>
        </div>
      )}

      {/* Play Overlay */}
      {(isInitialState || !isPlaying || isEnded) && (
        <div className="absolute inset-0 flex items-center justify-center">
          <button
            onClick={togglePlay}
            className="bg-[var(--color-surface)] bg-opacity-90 hover:bg-opacity-100 rounded-full p-4 transition-all duration-200 transform hover:scale-110"
            disabled={isLoading}
          >
            {isEnded ? (
              <RotateCcw
                className="h-8 w-8 text-[var(--color-primary-text)]"
                title="Replay"
              />
            ) : (
              <Play className="h-8 w-8 text-[var(--color-primary-text)] ml-1" />
            )}
          </button>
        </div>
      )}

      {/* Controls */}
      {controls && showControls && !isInitialState && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
          {/* Progress Bar */}
          <div
            ref={progressRef}
            className="w-full h-2 rounded-full relative mb-4 cursor-pointer bg-secondary"
            onClick={handleProgressClick}
          >
            {/* Buffered (downloaded) portion */}
            <div
              className="absolute left-0 top-0 h-full rounded-full"
              style={{
                width: `${bufferedPercentage}%`,
                backgroundColor: "var(--color-secondary-text)",
              }}
            />

            {/* Played portion */}
            <div
              className="absolute left-0 top-0 h-full rounded-full"
              style={{
                width: `${progressPercentage}%`,
                backgroundColor: "var(--color-primary)",
              }}
            />
          </div>

          {/* Controls Row */}
          <div className="relative flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={togglePlay}
                className="text-[var(--color-surface)] hover:text-[var(--color-secondary-text)] transition-colors"
              >
                {isPlaying ? (
                  <Pause className="h-6 w-6" />
                ) : (
                  <Play className="h-6 w-6" />
                )}
              </button>

              <div className="flex items-center space-x-2">
                <button
                  onClick={toggleMute}
                  className="text-[var(--color-surface)] hover:text-[var(--color-secondary-text)] transition-colors"
                >
                  {isMuted ? (
                    <VolumeX className="h-5 w-5" />
                  ) : (
                    <Volume2 className="h-5 w-5" />
                  )}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="w-20 h-1 rounded-lg appearance-none cursor-pointer"
                  style={{
                    backgroundColor: "var(--color-accent)",
                  }}
                />
              </div>

              <div className="text-sm text-[var(--color-surface)]">
                {formatTime(currentTime)} / {formatTime(duration)}
              </div>
            </div>
            <div className="absolute left-1/2 -translate-x-1/2 flex items-center space-x-3">
              {/* ⏪ Back 10s */}
              <button
                onClick={skipBackward}
                className="text-[var(--color-surface)] hover:text-[var(--color-secondary-text)] transition-colors"
                title="Rewind 10s"
              >
                <Rewind className="h-5 w-5" />
              </button>
              {/* Speed Controls */}
              <div className="relative">
                {/* Toggle Button */}
                <button
                  onClick={() => setShowSpeedMenu((prev) => !prev)}
                  className="w-8 h-8 flex items-center justify-center rounded-full text-xs font-semibold transition bg-[var(--color-surface)] text-[var(--color-primary-text)] hover:bg-[var(--color-secondary)]"
                >
                  {playbackRate}x
                </button>

                {/* Dropdown Menu */}
                {showSpeedMenu && (
                  <div className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-[var(--color-surface)] border border-[var(--color-secondary)] rounded-md shadow-md p-1 z-50 space-y-1">
                    {[0.5, 1, 1.25, 1.5, 1.75, 2].map((rate) => (
                      <button
                        key={rate}
                        onClick={() => {
                          handlePlaybackRateChange(rate);
                          setShowSpeedMenu(false);
                        }}
                        className={`w-full px-3 py-1 text-sm rounded transition text-left ${
                          playbackRate === rate
                            ? "bg-[var(--color-primary)] text-white"
                            : "hover:bg-[var(--color-secondary)] text-[var(--color-primary-text)]"
                        }`}
                      >
                        {rate}x
                      </button>
                    ))}
                  </div>
                )}
              </div>
              {/* ⏩ Forward 10s */}
              <button
                onClick={skipForward}
                className="text-[var(--color-surface)] hover:text-[var(--color-secondary-text)] transition-colors"
                title="Forward 10s"
              >
                <FastForward className="h-5 w-5" />
              </button>
            </div>

            <button
              onClick={toggleFullscreen}
              className="text-[var(--color-surface)] hover:text-[var(--color-secondary-text)] transition-colors"
            >
              <Maximize className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MediaPlayer;
