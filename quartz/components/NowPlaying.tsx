import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
// @ts-ignore
import script from "./scripts/nowplaying.inline"
import style from "./styles/graph.scss"
import { i18n } from "../i18n"
import { classNames } from "../util/lang"

export default (() => {
  const NowPlaying: QuartzComponent = ({ displayClass, cfg }: QuartzComponentProps) => {
    return <div id="nowplaying" />
  }

  NowPlaying.afterDOMLoaded = script

  return NowPlaying
}) satisfies QuartzComponentConstructor
