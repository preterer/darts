import { Module } from "vuex";

import { Player } from "#/interfaces/player";
import { PLAYERS_KEY } from "../../utils/constants";

export const players: Module<{ list: Player[] }, any> = {
  namespaced: true,

  state() {
    return { list: getPlayers() };
  },

  mutations: {
    add(state, player: Player): void {
      player.id = Date.now();
      state.list.push(player);
      save(state.list);
    },

    remove(state, id: number): void {
      const index = state.list.findIndex(player => player.id === id);
      state.list.splice(index, 1);
      save(state.list);
    },

    update(state, player: Player): void {
      const index = state.list.findIndex(p => p.id === player.id);
      state.list.splice(index, 1, player);
      save(state.list);
    }
  }
};

/**
 * Gets current players list
 *
 * @returns {Player[]}
 */
function getPlayers(): Player[] {
  const storePlayers = getStoredPlayers();
  if (storePlayers && Array.isArray(storePlayers) && storePlayers.length) {
    return storePlayers;
  }
  return getDefaultPlayers();
}

/**
 * Gets players from store
 *
 * @returns {(Player[] | void)}
 */
function getStoredPlayers(): Player[] | void {
  const storedPlayers = localStorage.getItem(PLAYERS_KEY);
  if (storedPlayers) {
    return JSON.parse(storedPlayers);
  }
}

/**
 * Gets a new players list
 *
 * @returns {Player[]}
 */
function getDefaultPlayers(): Player[] {
  return [
    { id: 1, name: "Player 1", score: 0, state: {} },
    { id: 2, name: "Player 2", score: 0, state: {} }
  ];
}

/**
 * Saves players to localstorage
 *
 * @param {Player[]} list
 */
function save(list: Player[]): void {
  localStorage.setItem(PLAYERS_KEY, JSON.stringify(list));
}
