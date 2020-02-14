import { createSelector } from 'reselect'

export const selectCount = createSelector(
  [
    state => state.getIn(['tmp', 'count']),
  ],
  count => count,
)

export const selectLayout = taskId => createSelector(
  [
    state => state.getIn(['layout', taskId]),
  ],
  layout => {
    if (!layout) {
      return []
    } else {
      return layout.toJS()
    }
  },
)
