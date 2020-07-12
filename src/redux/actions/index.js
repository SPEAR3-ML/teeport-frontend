import {
  UPDATE_LAYOUT, ADD_LAYOUT, REMOVE_LAYOUT,
  UPDATE_PLOTS, REFRESH_PLOT,
  ADD_PLOT, REMOVE_PLOT,
} from '../actionTypes'

export const updateLayout = (taskId, layout) => ({
  type: UPDATE_LAYOUT,
  taskId,
  layout,
})

export const addLayout = taskId => ({
  type: ADD_LAYOUT,
  taskId,
})

export const removeLayout = (taskId, i) => ({
  type: REMOVE_LAYOUT,
  taskId,
  i,
})

// Actually these actions update plot configs
export const updatePlots = (taskId, plots) => ({
  type: UPDATE_PLOTS,
  taskId,
  plots,
})

export const refreshPlot = (taskId, i) => ({
  type: REFRESH_PLOT,
  taskId,
  i,
})

export const addPlot = (taskId, plot) => ({
  type: ADD_PLOT,
  taskId,
  plot,
})

export const removePlot = (taskId, i) => ({
  type: REMOVE_PLOT,
  taskId,
  i,
})
