import { createSelector } from 'reselect'

export const selectLayout = taskId => createSelector(
  [
    state => state.getIn(['layout', taskId]),
  ],
  layout => {
    if (!layout) {
      return layout
    } else {
      return layout.toJS()
    }
  },
)
