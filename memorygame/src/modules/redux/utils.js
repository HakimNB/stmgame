export function reducerFactory(initialState, handlers) {
  return function(state, action) {
    const s = state || initialState;
    const type = action.type;
    const handler = handlers[type];
    return handler ? handler(s, action) : s;
  };
}
