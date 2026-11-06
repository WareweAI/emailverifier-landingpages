import assert from "node:assert/strict";
import test from "node:test";
import { CREDIT_PACKS, calculatePrice } from "@/lib/pricing";
import {
  VOLUME_OPTIONS,
  assertCompetitorCellsTraceable,
  assertOurVolumesMatchHomepage,
  ourPriceForVolume,
} from "@/lib/competitor-comparison";

test("comparison volumes exist in homepage CREDIT_PACKS", () => {
  assert.doesNotThrow(() => assertOurVolumesMatchHomepage());
  for (const volume of VOLUME_OPTIONS) {
    const pack = CREDIT_PACKS.find((p) => p.credits === volume);
    assert.ok(pack, `missing pack for ${volume}`);
    const ours = ourPriceForVolume(volume);
    assert.ok(ours);
    const quote = calculatePrice(volume);
    assert.equal(ours!.totalUsd, quote.priceUsd);
    assert.equal(ours!.perThousand, quote.ratePerThousand);
  }
});

test("known homepage pack prices match comparison source", () => {
  assert.equal(ourPriceForVolume(10_000)?.totalUsd, 20);
  assert.equal(ourPriceForVolume(25_000)?.totalUsd, 45);
  assert.equal(ourPriceForVolume(50_000)?.totalUsd, 80);
  assert.equal(ourPriceForVolume(100_000)?.totalUsd, 140);
  assert.equal(ourPriceForVolume(1_000_000)?.totalUsd, 800);
});

test("every competitor cell is sourced or explicitly unverified", () => {
  const problems = assertCompetitorCellsTraceable();
  assert.deepEqual(problems, [], problems.join("\n"));
});
