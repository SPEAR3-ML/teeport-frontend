import { createSelector } from 'reselect'

export const selectCount = createSelector(
  [
    state => state.getIn(['tmp', 'count']),
  ],
  count => count,
)

export const selectLayout = createSelector(
  [
    state => state.getIn(['layout', 'l0']),
  ],
  layout => layout.toJS(),
)
