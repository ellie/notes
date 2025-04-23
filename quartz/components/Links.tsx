import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { FullSlug, SimpleSlug, resolveRelative } from "../util/path"
import { QuartzPluginData } from "../plugins/vfile"
import { byDateAndAlphabetical } from "./PageList"
import style from "./styles/links.scss"
import { Date, getDate } from "./Date"
import { GlobalConfiguration } from "../cfg"

interface Options {
  title: string
}

const defaultOptions = (cfg: GlobalConfiguration): Options => ({
  title: "",
})

export default ((userOpts?: Partial<Options>) => {
  function Links({ allFiles, fileData, displayClass, cfg }: QuartzComponentProps) {
    const opts = { ...defaultOptions(cfg), ...userOpts }
    return (
      <div class={`links ${displayClass ?? ""}`}>
        <h3>{opts.title}</h3>
        <ul>
          <li>
            <h3 style={{marginTop: 0, marginBottom: 0}}><a href="/notes">Notes</a></h3>
            <i>where I share what I've learned</i>
          </li>
          <li>
            <h3 style={{marginTop: 0, marginBottom: 0}}><a href="/life">Life</a></h3>
            <i>where I write about my adventures</i>
          </li>
          <li>
            <h3 style={{marginTop: 0, marginBottom: 0}}><a href="/posts">Posts</a></h3>
            <i>my longer form thoughts</i>
          </li>
          <li>
            <h3 style={{marginTop: 0, marginBottom: 0}}><a href="/projects">Projects</a></h3>
            <i>cool things I've made</i>
          </li>
        </ul>
      </div>
    )
  }

  Links.css = style
  return Links
}) satisfies QuartzComponentConstructor
