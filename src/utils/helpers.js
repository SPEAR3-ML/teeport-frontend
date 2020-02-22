import _ from 'lodash'

export const generateLayout = (items, columnNum = 4) => {
  const layout = []
  const width = 12 / columnNum
  const height = 8
  for (let i = 0; i < _.size(items); i++) {
    const c = i % columnNum
    const r = Math.floor(i / columnNum)
    const item = {
      i: items[i].id,
      x: c * width,
      y: r * height,
      w: width,
      h: height,
      minW: 3,
      maxW: 12,
      minH: height,
      maxH: 4 * height,
    }
    layout.push(item)
  }
  return layout
}

export const generatePlotLayout = (size, columnNum = 2) => {
  const layout = []
  const width = 12 / columnNum
  const height = 12
  for (let i = 0; i < size; i++) {
    const c = i % columnNum
    const r = Math.floor(i / columnNum)
    const item = {
      i: `${i + 1}`,
      x: c * width,
      y: r * height,
      w: width,
      h: height,
      minW: 3,
      maxW: 12,
      minH: height,
      maxH: 4 * height,
    }
    layout.push(item)
  }
  return layout
}
