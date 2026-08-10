import { beforeEach, describe, expect, it } from "vitest";
import { clearMahjongRoomsForTests, createMahjongRoom, getMahjongRoom, joinMahjongRoom, submitMahjongMatch } from "@/lib/mahjong-rooms";

describe("local Mahjong rooms", () => {
  beforeEach(() => clearMahjongRoomsForTests());

  it("lets players join one board with independent progress", () => {
    const host = createMahjongRoom("Mei");
    const guest = joinMahjongRoom(host.state.code, "Daniel");
    expect(guest?.state.tiles).toEqual(host.state.tiles);
    expect(guest?.state.players.map((player) => player.name)).toEqual(["Mei", "Daniel"]);

    const pair = host.state.tiles.filter((tile) => tile.face === host.state.tiles[0].face);
    const result = submitMahjongMatch(host.state.code, host.playerToken, [pair[0].id, pair[1].id]);
    expect(result?.matched).toBe(true);
    expect(result?.state.players[0]).toMatchObject({ name: "Mei", matches: 1, moves: 1 });
    expect(getMahjongRoom(host.state.code, guest?.playerToken || "")?.removedTileIds).toEqual([]);
  });

  it("rejects fake and repeated matches", () => {
    const host = createMahjongRoom("Mei");
    const first = host.state.tiles[0];
    const different = host.state.tiles.find((tile) => tile.face !== first.face);
    expect(submitMahjongMatch(host.state.code, host.playerToken, [first.id, different?.id || -1])?.matched).toBe(false);

    const pair = host.state.tiles.filter((tile) => tile.face === first.face);
    expect(submitMahjongMatch(host.state.code, host.playerToken, [pair[0].id, pair[1].id])?.matched).toBe(true);
    expect(submitMahjongMatch(host.state.code, host.playerToken, [pair[0].id, pair[1].id])?.matched).toBe(false);
  });
});