import minimist from 'minimist'
import COLLECTION from './../data/COLLECTION.json'  assert { type: 'json' }
import Scape from './Scape.mjs'

const options = minimist(process.argv.slice(2))
const ID = options.id
const DEFAULT_HEIGHT = 24
const HEIGHT = options.height || DEFAULT_HEIGHT
const SKIP_LANDMARKS = options['skip-landmarks'] || false
const BUMP_SUNS = options['bump-suns'] || false
const UPSCALE = options['upscale'] || false

const renderScape = async (id) => {
  const scape = (new Scape(id)).setHeight(HEIGHT)

  if (SKIP_LANDMARKS) {
    scape.skipLandmarks()
  }

  if (BUMP_SUNS) {
    scape.bumpSuns()
  }

  if (UPSCALE) {
    const width = typeof UPSCALE === 'number' ? UPSCALE : undefined
    scape.upscale(width)
  }

  return await scape.render()
}

const run = async () => {
  if (ID) {
    return await renderScape(ID)
  }

  for (const item of COLLECTION) {
    await renderScape(item.id)
  }
}

run()
