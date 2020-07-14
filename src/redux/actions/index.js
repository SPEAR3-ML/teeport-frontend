import {
  UPDATE_LAYOUTS, ADD_LAYOUT, REMOVE_LAYOUT,
  UPDATE_PLOTS, REFRESH_PLOT,
  ADD_PLOT, REMOVE_PLOT,
} from '../actionTypes'

export const updateLayouts = (taskId, layout) => ({
  type: UPDATE_LAYOUTS,
  taskId,
  layout,
})

export const addLayout = (taskId, layoutId) => ({
  type: ADD_LAYOUT,
  taskId,
  layoutId,
})

export const removeLayout = (taskId, layoutId) => ({
  type: REMOVE_LAYOUT,
  taskId,
  layoutId,
})

// Actually these actions update plot configs
export const updatePlots = (taskId, plots) => ({
  type: UPDATE_PLOTS,
  taskId,
  plots,
})

export const refreshPlot = (taskId, plotId) => ({
  type: REFRESH_PLOT,
  taskId,
  plotId,
})

export const addPlot = (taskId, plot) => ({
  type: ADD_PLOT,
  taskId,
  plot,
})

export const removePlot = (taskId, plotId) => ({
  type: REMOVE_PLOT,
  taskId,
  plotId,
})
