import { createSelector } from 'reselect'

export const selectCount = createSelector(
  [
    state => state.get('count'),
  ],
  count => count,
)
