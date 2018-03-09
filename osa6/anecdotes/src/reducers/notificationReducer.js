export const notify = (notification, seconds = 5) => {
  return async (dispatch) => {
    dispatch({
      type: 'NOTIFY',
      notification
    })

    setTimeout(() => {
      dispatch({
        type: 'NOTIFY',
        notification: ''
      })
    }, seconds*1000)
  }
}

const reducer = (store = '', action) => {
  switch (action.type) {
    case 'NOTIFY':
      return action.notification
    default:
      return store
  }
}

export default reducer
