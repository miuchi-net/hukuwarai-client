import { atomWithStorage } from "jotai/utils";

export const playerAtom = atomWithStorage<{
  id: number;
  name: string;
  game_id: number;
} | null>("player", null);
