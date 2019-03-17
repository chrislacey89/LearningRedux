const initialState = {
  counter: 0,
  results: []
};
let updatedArray;

const reducer = (state = initialState, action) => {
  if (action.type === "INCREMENT") {
    return {
      ...state,

      counter: state.counter + 1
    };
  }
  if (action.type === "DECREMENT") {
    return {
      // ... clones old state with all properties
      ...state,
      counter: state.counter - 1
    };
  }
  if (action.type === "ADD") {
    return {
      ...state,

      counter: state.counter + action.value
    };
  }
  if (action.type === "SUBTRACT") {
    return {
      ...state,

      counter: state.counter - action.value
    };
  }
  if (action.type === "STORE_RESULT") {
    return {
      ...state,
      // concat returns a new array by adding a new item
      results: state.results.concat({
        id: new Date().getTime(),
        value: state.counter
      })
    };
  }
  if (action.type === "DELETE_RESULT") {
    // filter returns a new array with all elements that are not equal to the id we passed with the action
    const updatedArray = state.results.filter(
      result => result.id !== action.resultElementId
    );
    return {
      ...state,
      results: updatedArray
    };
  }

  return state;
};

export default reducer;
