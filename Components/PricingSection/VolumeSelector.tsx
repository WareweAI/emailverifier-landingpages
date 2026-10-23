"use client";

import { useEffect, useId, useState } from "react";
import { MinusIcon, PlusIcon } from "lucide-react";
import {
  PRESETS,
  VOLUME_MAX,
  VOLUME_MIN,
  clampSeasonalVolume,
  formatNumber,
  formatPresetLabel,
  stepCreditPack,
} from "@/lib/pricing";

type VolumeSelectorProps = {
  volume: number;
  onVolumeChange: (volume: number) => void;
  /** When set, only show these presets (homepage: fewer chips) */
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

  const [inputValue, setInputValue] = useState(formatNumber(volume));
  const [isEditing, setIsEditing] = useState(false);

  const packIndex = Math.max(
    0,
    presets.findIndex((p) => p === volume)
  );
  const sliderMax = Math.max(presets.length - 1, 1);

  useEffect(() => {
    if (!isEditing) {
      setInputValue(formatNumber(volume));
    }
  }, [volume, isEditing]);

  const commitVolume = (raw: number) => {
    const next = clampSeasonalVolume(raw);
    onVolumeChange(next);
    setInputValue(formatNumber(next));
  };

  const decrease = () => {
    onVolumeChange(stepCreditPack(volume, -1));
  };

  const increase = () => {
    onVolumeChange(stepCreditPack(volume, 1));
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const idx = Number(e.target.value);
    const next = presets[idx] ?? presets[0];
    onVolumeChange(next);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9,]/g, "");
    setInputValue(raw);

    const parsed = Number(raw.replace(/,/g, ""));
    if (!Number.isFinite(parsed) || raw.trim() === "") return;

    if (parsed >= VOLUME_MIN) {
      onVolumeChange(clampSeasonalVolume(parsed));
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
          aria-label="Fewer credits"
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
          aria-describedby={scaleId}
          className="min-w-0 flex-1 rounded-lg border border-line py-2.5 text-center text-lg font-medium tabular-nums text-ink focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary"
        />

        <button
          type="button"
          aria-label="More credits"
          onClick={increase}
          disabled={volume >= VOLUME_MAX}
          className="grid h-11 w-11 cursor-pointer place-items-center rounded-lg border border-line transition-colors duration-200 hover:border-primary hover:bg-surface-muted disabled:pointer-events-none disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        >
          <PlusIcon className="h-4 w-4" aria-hidden />
        </button>
      </div>

      <input
        id={sliderId}
        type="range"
        min={0}
        max={sliderMax}
        step={1}
        value={packIndex >= 0 ? packIndex : 0}
        onChange={handleSliderChange}
        aria-label="Email volume slider"
        aria-describedby={scaleId}
        aria-valuemin={VOLUME_MIN}
        aria-valuemax={VOLUME_MAX}
        aria-valuenow={volume}
        className="w-full cursor-pointer accent-primary"
      />

      <div id={scaleId} className="flex justify-between text-xs text-ink-muted">
        <span>25K</span>
        <span>100K</span>
        <span>10M</span>
      </div>

      <div className="flex flex-wrap gap-2" role="group" aria-label="Volume presets">
        {presets.map((preset) => {
          const selected = preset === volume;
          const mostValue = preset === 100_000;

          return (
            <button
              key={preset}
              type="button"
              onClick={() => {
                setIsEditing(false);
                onVolumeChange(preset);
              }}
              aria-pressed={selected}
              className={`cursor-pointer rounded-lg border px-2.5 py-1.5 text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                selected
                  ? "border-primary bg-primary-soft text-primary"
                  : "border-line bg-surface text-ink hover:border-primary hover:bg-surface-muted"
              }`}
            >
              {formatPresetLabel(preset)}
              {mostValue ? (
                <span className="ml-1 text-[10px] font-semibold uppercase tracking-wide text-primary/80">
                  Most value
                </span>
              ) : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}
