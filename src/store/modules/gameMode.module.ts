import { Module } from "vuex";

import { Button } from "#/interfaces/button";
import { GameMode } from "#/interfaces/gameMode";
import { DartsService } from "../../services/darts.service";
import { missButton } from "../../utils/missButton";

export const gameMode: Module<GameMode, any> = {
  namespaced: true,

  state() {
    return {
      service: undefined as any,
      missButton: missButton(0)
    };
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
