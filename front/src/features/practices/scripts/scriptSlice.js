import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "script",
  initialState: {
    progressPecent: 0,
    totalCharacters: 0,
    currentCharacters: 0,
    totalWrongCharacters: 0,
    wrongCharacters: 0,
    typeCount: 0,
    wrongTyping: null,
  },
  reducers: {
    initState: (state) => {
      state.progressPecent = 0;
      state.totalCharacters = 0;
      state.currentCharacters = 0;
      state.totalWrongCharacters = 0;
      state.wrongCharacters = 0;
      state.typeCount = 0;
      state.wrongTyping = {};
    },
    incrementProgressPercent: (state, action) => {
      state.progressPecent = action.payload;
      state.totalWrongCharacters += state.wrongCharacters;
      state.wrongCharacters = 0;
      state.totalCharacters += state.currentCharacters;
      state.currentCharacters = 0;
    },
    incrementWrongCharacters: (state, action) => {
      state.wrongCharacters = action.payload;
    },
    incrementCurrentCharacters: (state, action) => {
      state.currentCharacters = action.payload;
    },
    incrementTypeCount: (state) => {
      state.typeCount += 1;
    },
    addWrongTyping: (state, action) => {
      const key = action.payload;
      state.wrongTyping[key] =
        state.wrongTyping[key] == undefined ? 1 : state.wrongTyping[key] + 1;
    },
  },
});
export const {
  initState,
  incrementProgressPercent,
  incrementWrongCharacters,
  incrementCurrentCharacters,
  incrementTypeCount,
  addWrongTyping,
} = slice.actions;

export const selectProgressPercent = (state) =>
  parseInt(state.script.progressPecent) + "%";
export const selectAccuracyPercent = (state) => {
  const accuracy = parseInt(
    (((state.script.totalCharacters + state.script.currentCharacters) -
      (state.script.totalWrongCharacters + state.script.wrongCharacters)) /
      (state.script.totalCharacters+ state.script.currentCharacters)) *
      100
  );
  return accuracy ? accuracy + "%" : "100%";
};
export const selectTypeCount = (state) => 
  state.script.typeCount;
export const selectWrongTyping = (state) => 
  state.script.wrongTyping;

export default slice.reducer;