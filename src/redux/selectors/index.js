import { createSelector } from 'reselect'

export const selectLayouts = taskId => createSelector(
  [
    state => state.getIn(['layouts', taskId]),
  ],
  layouts => {
    if (!layouts) {
      return layouts
    } else {
      return layouts.toJS()
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
