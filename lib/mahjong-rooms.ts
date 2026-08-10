import { randomBytes } from "node:crypto";

const tileFaces = ["春", "夏", "秋", "冬", "竹", "梅", "蘭", "菊", "一", "二", "三", "四"];
const roomLifetimeMs = 4 * 60 * 60 * 1000;

export type MahjongPlayer = {
  id: string;
  name: string;
  matches: number;
  moves: number;
  finishedAt: string | null;
};

type StoredPlayer = MahjongPlayer & {
  token: string;
  removedTileIds: number[];
};

type MahjongRoom = {
  code: string;
  createdAt: number;
  tiles: { id: number; face: string }[];
  players: StoredPlayer[];
};

const rooms = new Map<string, MahjongRoom>();

function token() {
  return randomBytes(18).toString("base64url");
}

function roomCode() {
  for (let attempt = 0; attempt < 20; attempt += 1) {
    const code = randomBytes(3).toString("hex").toUpperCase();
    if (!rooms.has(code)) return code;
  }
  throw new Error("Could not allocate a Mahjong room.");
}

function shuffledTiles() {
  const tiles = tileFaces.flatMap((face, pair) => [{ id: pair * 2, face }, { id: pair * 2 + 1, face }]);
  for (let index = tiles.length - 1; index > 0; index -= 1) {
    const swapIndex = randomBytes(2).readUInt16BE() % (index + 1);
    [tiles[index], tiles[swapIndex]] = [tiles[swapIndex], tiles[index]];
  }
  return tiles;
}

function removeExpiredRooms(now = Date.now()) {
  for (const [code, room] of rooms) {
    if (now - room.createdAt > roomLifetimeMs) rooms.delete(code);
  }
}

function publicState(room: MahjongRoom, player: StoredPlayer) {
  return {
    code: room.code,
    tiles: room.tiles,
    removedTileIds: player.removedTileIds,
    players: room.players
      .map(({ id, name, matches, moves, finishedAt }) => ({ id, name, matches, moves, finishedAt }))
      .sort((left, right) => right.matches - left.matches || left.moves - right.moves),
    currentPlayerId: player.id
  };
}

export function createMahjongRoom(playerName: string) {
  removeExpiredRooms();
  const code = roomCode();
  const player: StoredPlayer = { id: token(), token: token(), name: playerName, matches: 0, moves: 0, finishedAt: null, removedTileIds: [] };
  const room: MahjongRoom = { code, createdAt: Date.now(), tiles: shuffledTiles(), players: [player] };
  rooms.set(code, room);
  return { playerToken: player.token, state: publicState(room, player) };
}

export function joinMahjongRoom(code: string, playerName: string) {
  removeExpiredRooms();
  const room = rooms.get(code.toUpperCase());
  if (!room) return null;
  if (room.players.length >= 8) throw new Error("This room already has eight players.");
  const player: StoredPlayer = { id: token(), token: token(), name: playerName, matches: 0, moves: 0, finishedAt: null, removedTileIds: [] };
  room.players.push(player);
  return { playerToken: player.token, state: publicState(room, player) };
}

export function getMahjongRoom(code: string, playerToken: string) {
  removeExpiredRooms();
  const room = rooms.get(code.toUpperCase());
  const player = room?.players.find((candidate) => candidate.token === playerToken);
  return room && player ? publicState(room, player) : null;
}

export function submitMahjongMatch(code: string, playerToken: string, tileIds: [number, number]) {
  const room = rooms.get(code.toUpperCase());
  const player = room?.players.find((candidate) => candidate.token === playerToken);
  if (!room || !player) return null;
  player.moves += 1;
  const [firstId, secondId] = tileIds;
  const first = room.tiles.find((tile) => tile.id === firstId);
  const second = room.tiles.find((tile) => tile.id === secondId);
  const available = !player.removedTileIds.includes(firstId) && !player.removedTileIds.includes(secondId);
  const matched = Boolean(first && second && firstId !== secondId && available && first.face === second.face);
  if (matched) {
    player.removedTileIds.push(firstId, secondId);
    player.matches += 1;
    if (player.removedTileIds.length === room.tiles.length) player.finishedAt = new Date().toISOString();
  }
  return { matched, state: publicState(room, player) };
}

export function clearMahjongRoomsForTests() {
  rooms.clear();
}