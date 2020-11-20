export default {
  app: {
    getToken: (state) => {
      return state.app.sessionValue;
    },
    getLanguageId: (state) => {
      return state.app.languageId;
    },
  },
};
