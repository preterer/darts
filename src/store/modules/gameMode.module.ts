import { Module } from "vuex";

import { Button } from "#/interfaces/button";
import { GameMode } from "#/interfaces/gameMode";
import { DartsService } from "../../services/darts.service";

export const gameMode: Module<GameMode, any> = {
  namespaced: true,

  state: {
    service: new DartsService(),
    missButton: {
      text: "Miss",
      score: 0,
      class: "btn-100 btn-danger",
      alwaysNegative: false
    }
  },

  mutations: {
    setService(state, service: DartsService): void {
      state.service = service;
    },
    setMissButton(state, button: Button): void {
      state.missButton = button;
    }
  }
};
