"use client";

import { useEffect, useId, useState } from "react";
import { MinusIcon, PlusIcon } from "lucide-react";
import {
  PRESETS,
  SEASONAL_MAX,
  VOLUME_MIN,
  VOLUME_STEP,
  clampSeasonalVolume,
  formatNumber,
  formatPresetLabel,
} from "@/lib/pricing";

type VolumeSelectorProps = {
  volume: number;
  onVolumeChange: (volume: number) => void;
};

export default function VolumeSelector({
  volume,
  onVolumeChange,
}: VolumeSelectorProps) {
  const baseId = useId();
  const inputId = `${baseId}-volume-input`;
  const sliderId = `${baseId}-volume-slider`;
  const scaleId = `${baseId}-volume-scale`;
  const hintId = `${baseId}-volume-hint`;

  const [inputValue, setInputValue] = useState(formatNumber(volume));
  const [isEditing, setIsEditing] = useState(false);
  const [showClampHint, setShowClampHint] = useState(false);

  useEffect(() => {
    if (!isEditing) {
      setInputValue(formatNumber(volume));
    }
  }, [volume, isEditing]);

  const commitVolume = (raw: number) => {
    const exceededMax = raw > SEASONAL_MAX;
    const next = clampSeasonalVolume(raw);
    onVolumeChange(next);
    setInputValue(formatNumber(next));
    setShowClampHint(exceededMax);
  };

  const decrease = () => {
    commitVolume(volume - VOLUME_STEP);
  };

  const increase = () => {
    if (volume >= SEASONAL_MAX) {
      setShowClampHint(true);
      return;
    }
    commitVolume(volume + VOLUME_STEP);
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    commitVolume(Number(e.target.value));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9,]/g, "");
    setInputValue(raw);

    const parsed = Number(raw.replace(/,/g, ""));
    if (!Number.isFinite(parsed) || raw.trim() === "") return;

    if (parsed > SEASONAL_MAX) {
      onVolumeChange(SEASONAL_MAX);
      setInputValue(formatNumber(SEASONAL_MAX));
      setShowClampHint(true);
      return;
    }

    if (parsed >= VOLUME_MIN) {
      onVolumeChange(clampSeasonalVolume(parsed));
      setShowClampHint(false);
    }
  };

  const handleInputBlur = () => {
    setIsEditing(false);
    const parsed = Number(inputValue.replace(/,/g, ""));
    if (!Number.isFinite(parsed) || inputValue.trim() === "") {
      setInputValue(formatNumber(volume));
      return;
    }
    commitVolume(parsed);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.currentTarget.blur();
    }
  };

  return (
    <div className="space-y-4">
      <label
        htmlFor={inputId}
        className="block text-gray-800 font-medium text-sm sm:text-base"
      >
        Email Volume
      </label>

      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
        <button
          type="button"
          aria-label="Decrease email volume by 1,000"
          onClick={decrease}
          disabled={volume <= VOLUME_MIN}
          className="h-11 w-11 border border-gray-300 rounded-md grid place-items-center
            hover:bg-gray-100 active:scale-95 transition disabled:opacity-40 disabled:pointer-events-none
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
        >
          <MinusIcon className="w-4 h-4" aria-hidden="true" />
        </button>

        <input
          id={inputId}
          name="email-volume"
          inputMode="numeric"
          type="text"
          value={inputValue}
          onFocus={() => setIsEditing(true)}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          onKeyDown={handleInputKeyDown}
          aria-label="Email volume"
          aria-describedby={`${scaleId}${showClampHint ? ` ${hintId}` : ""}`}
          className="text-center min-w-0 flex-1 border border-gray-300 rounded-md py-2.5 text-lg font-medium
            text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
        />

        <button
          type="button"
          aria-label="Increase email volume by 1,000"
          onClick={increase}
          disabled={volume >= SEASONAL_MAX}
          className="h-11 w-11 border border-gray-300 rounded-md grid place-items-center
            hover:bg-gray-100 active:scale-95 transition disabled:opacity-40 disabled:pointer-events-none
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
        >
          <PlusIcon className="w-4 h-4" aria-hidden="true" />
        </button>
      </div>

      {showClampHint && (
        <p id={hintId} className="text-xs text-gray-500" role="status">
          Pay As You Go max is {formatNumber(SEASONAL_MAX)} emails.
        </p>
      )}

      <input
        id={sliderId}
        type="range"
        min={VOLUME_MIN}
        max={SEASONAL_MAX}
        step={VOLUME_STEP}
        value={volume}
        onChange={handleSliderChange}
        aria-label="Email volume slider"
        aria-describedby={scaleId}
        aria-valuemin={VOLUME_MIN}
        aria-valuemax={SEASONAL_MAX}
        aria-valuenow={volume}
        className="w-full accent-blue-600 cursor-pointer"
      />

      <div id={scaleId} className="flex justify-between text-xs text-gray-600">
        <span>1K</span>
        <span>100K</span>
        <span>1M</span>
        <span>10M</span>
      </div>

      <div
        className="flex flex-wrap gap-2"
        role="group"
        aria-label="Volume presets"
      >
        {PRESETS.map((preset) => {
          const selected = preset === volume;

          return (
            <button
              key={preset}
              type="button"
              onClick={() => {
                setIsEditing(false);
                onVolumeChange(preset);
                setShowClampHint(false);
              }}
              aria-pressed={selected}
              className={`px-2.5 py-1.5 rounded-md border text-sm font-medium transition
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 ${
                  selected
                    ? "bg-blue-100 text-gray-900 border-blue-600"
                    : "bg-white border-gray-300 text-gray-800 hover:bg-gray-100"
                }`}
            >
              {formatPresetLabel(preset)}
            </button>
          );
        })}
      </div>
    </div>
  );
}
