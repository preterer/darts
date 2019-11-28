import { Module } from "vuex";

import { DartsService } from "../../services/darts.service";

export const calculation: Module<{ service: DartsService }, any> = {
  namespaced: true,

  state: {
    service: new DartsService()
  },

  mutations: {
    setService(state, service: DartsService) {
      state.service = service;
    }
  }
};