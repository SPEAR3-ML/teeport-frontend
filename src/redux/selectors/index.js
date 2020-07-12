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

export const selectPlots = taskId => createSelector(
  [
    state => state.getIn(['plots', taskId]),
  ],
  plots => {
    if (!plots) {
      return plots
    } else {
      return plots.toJS()
    }
  },
)
