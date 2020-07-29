import _ from 'lodash'

export const generateLayout = (ids, columnNum = 4, height = 1) => {
  const layout = []
  const width = 12 / columnNum
  for (let i = 0; i < ids.length; i++) {
    const c = i % columnNum
    const r = Math.floor(i / columnNum)
    const item = {
      i: ids[i],
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

export const generateLayouts = (ids, height = 1) => {
  const layouts = {}
  layouts.lg = generateLayout(ids, 4, height)
  layouts.md = generateLayout(ids, 3, height)
  layouts.sm = generateLayout(ids, 2, height)
  layouts.xs = generateLayout(ids, 1, height)
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

export const getNewLayout = (items, id, w, h) => {
  const xy = getBestLocation(items, w, h)
  const newItem = {
    i: id,
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

export const generateDefaultCmpPlots = () => {
  const plots = [{
    title: 'Evaluation History',
    revision: 0,
  }, {
    title: 'Evolution Trace',
    recent: 1,
    revision: 0,
  }]
  return plots
}

export const generateDefaultBenchmarkPlots = () => {
  const plots = [{
    title: 'Evaluation History',
    revision: 0,
  }, {
    title: 'Evolution Trace',
    recent: 1,
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
