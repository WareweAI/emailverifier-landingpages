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
  isSeasonalPreset,
} from "@/lib/pricing";

type VolumeSelectorProps = {
  volume: number;
  onVolumeChange: (volume: number) => void;
  /** When set, only show these presets (homepage: no disabled mega chips) */
  presetList?: readonly number[];
};

export default function VolumeSelector({
  volume,
  onVolumeChange,
  presetList,
}: VolumeSelectorProps) {
  const presets = presetList ?? PRESETS;
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
        className="block text-sm font-medium text-ink sm:text-base"
      >
        Email volume
      </label>

      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
        <button
          type="button"
          aria-label="Decrease email volume by 1,000"
          onClick={decrease}
          disabled={volume <= VOLUME_MIN}
          className="grid h-11 w-11 cursor-pointer place-items-center rounded-lg border border-line transition-colors duration-200 hover:border-primary hover:bg-surface-muted disabled:pointer-events-none disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        >
          <MinusIcon className="h-4 w-4" aria-hidden />
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
          className="min-w-0 flex-1 rounded-lg border border-line py-2.5 text-center text-lg font-medium tabular-nums text-ink focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary"
        />

        <button
          type="button"
          aria-label="Increase email volume by 1,000"
          onClick={increase}
          disabled={volume >= SEASONAL_MAX}
          className="grid h-11 w-11 cursor-pointer place-items-center rounded-lg border border-line transition-colors duration-200 hover:border-primary hover:bg-surface-muted disabled:pointer-events-none disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        >
          <PlusIcon className="h-4 w-4" aria-hidden />
        </button>
      </div>

      {showClampHint && (
        <p id={hintId} className="text-xs text-ink-muted" role="status">
          Max purchase is {formatNumber(SEASONAL_MAX)} emails.
          {presetList ? " Need more? Contact us." : ""}
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
        className="w-full cursor-pointer accent-primary"
      />

      <div id={scaleId} className="flex justify-between text-xs text-ink-muted">
        <span>1K</span>
        <span>50K</span>
        <span>100K max</span>
      </div>

      <div className="flex flex-wrap gap-2" role="group" aria-label="Volume presets">
        {presets.map((preset) => {
          const available = presetList ? true : isSeasonalPreset(preset);
          const selected = available && preset === volume;

          if (!available) {
            return (
              <button
                key={preset}
                type="button"
                disabled
                title="Not available in Seasonal pricing"
                aria-label={`${formatPresetLabel(preset)} — not available`}
                className="cursor-not-allowed rounded-lg border border-line px-2.5 py-1.5 text-sm font-medium text-ink-muted opacity-60"
              >
                {formatPresetLabel(preset)}
              </button>
            );
          }

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
              className={`cursor-pointer rounded-lg border px-2.5 py-1.5 text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                selected
                  ? "border-primary bg-primary-soft text-primary"
                  : "border-line bg-surface text-ink hover:border-primary hover:bg-surface-muted"
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
