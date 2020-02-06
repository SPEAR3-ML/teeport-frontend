import { createSelector } from 'reselect'

export const selectCount = createSelector(
  [
    state => state.getIn(['tmp', 'count']),
  ],
  count => count,
)
