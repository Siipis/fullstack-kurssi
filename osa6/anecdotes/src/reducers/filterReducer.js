export const setFilter = (filter) => {
  return {
    type: 'FILTER',
    filter
  }
}

const reducer = (store = '', action) => {
  switch (action.type) {
    case 'FILTER':
      return action.filter
    default:
      return store
  }
}

export default reducer
