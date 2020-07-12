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

export const generateTasksLayouts = items => {
  const layouts = {}
  layouts.lg = generateLayout(items, 4)
  layouts.md = generateLayout(items, 3)
  layouts.sm = generateLayout(items, 2)
  layouts.xs = generateLayout(items, 1)
  return layouts
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

export const generatePlotsLayouts = size => {
  const layouts = {}
  layouts.lg = generatePlotLayout(size, 4)
  layouts.md = generatePlotLayout(size, 3)
  layouts.sm = generatePlotLayout(size, 2)
  layouts.xs = generatePlotLayout(size, 1)
  return layouts
}

const doOverlap = (x, y, w, h, x0, y0, w0, h0) => {
  if (x >= x0 + w0 || x0 >= x + w) return false
  if (y >= y0 + h0 || y0 >= y + h) return false
  return true
}

export const getBestLocation = (items, w, h) => {
  const xSet = new Set(items.map(item => item.x).concat(items.map(item => item.x + item.w)))
  xSet.add(0)
  const ySet = new Set(items.map(item => item.y).concat(items.map(item => item.y + item.h)))
  ySet.add(0)

  const validArray = []
  xSet.forEach(x => {
    ySet.forEach(y => {
      if (x + w <= 12) {
        const valid = !items.some(item => {
          return doOverlap(x, y, w, h, item.x, item.y, item.w, item.h)
        })
        if (valid) {
          validArray.push([x, y])
        }
      }
    })
  })
  validArray.sort((a, b) => a[1] - b[1] || a[0] - b[0])

  return validArray[0]
}

export const getNewLayout = (items, w, h) => {
  const xy = getBestLocation(items, w, h)
  const newItem = {
    i: `${items.length + 1}`,
    x: xy[0],
    y: xy[1],
    w: w,
    h: h,
    minW: 3,
    maxW: 12,
    minH: h,
    maxH: 4 * h,
  }

  return newItem
}

export const generateDefaultPlots = () => {
  const plots = [{
    title: 'Evaluation History',
    revision: 0,
  }, {
    title: 'Evolution Trace',
    recent: 5,
    revision: 0,
  }]
  return plots
}

export const getObj1Obj2GenIdx = (history, recent = 1) => {
  const generations = []
  for (let i = 0; i < recent; i++) {
    if (!history) {
      break
    }
    const genIdx = history.length - i
    if (genIdx < 1) {
      break
    }

    const Y = history[genIdx - 1][1]
    const obj1 = Y.map(p => p[0])
    const obj2 = Y.map(p => {
      if (p.length < 2) {
        return 0
      } else {
        return p[1]
      }
    })

    generations.push([obj1, obj2, genIdx])
  }
  return generations
}

export const getXObjsBests = history => {
  let x = []
  let y = []
  const objs = []
  const bests = []

  if (history && history.length) {
    history.forEach(([, Y]) => {
      y = _.concat(y, Y)
    })
    x = _.range(1, _.size(y) + 1)
    for (let i = 0; i < y[0].length; i++) {
      const obj = y.map(p => p[i])
      objs.push(obj)
      const best = []
      let min = obj[0]
      for (let j = 0; j < obj.length; j++) {
        min = Math.min(min, obj[j])
        best.push(min)
      }
      bests.push(best)
    }
  }

  return [x, objs, bests]
}

export const getObjsVars = history => {
  let objs = []
  let vars = []

  if (history && history.length) {
    history.forEach(([X, Y]) => {
      objs = _.concat(objs, Y)
      vars = _.concat(vars, X)
    })
  }

  return [objs, vars]
}

export const getXVars = history => {
  let x = []
  let y = [] // decision variables
  const vars = []

  if (history && history.length) {
    history.forEach(([X]) => {
      y = _.concat(y, X)
    })
    x = _.range(1, _.size(y) + 1)
    for (let i = 0; i < y[0].length; i++) {
      const v = y.map(d => d[i])
      vars.push(v)
    }
  }

  return [x, vars]
}
