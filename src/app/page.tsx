import { MemeDisplay } from "./components/MemeDisplay"
import { MemeEditor } from "./components/MemeEditor"
import { Memetemplate, Meme } from "./data/types"

export default async function Home() {
  const memeTemplatesReq = await fetch('http://localhost:3000/api/templates')
  const memeTemplates = (await memeTemplatesReq.json()) as Memetemplate[]

  const memesReq = await fetch("http://localhost:3000/api/memes", {
    cache: "no-cache",
  })
  const memes = (await memesReq.json()) as Meme[]

  return (
    <main className="max-w-[1200px] mx-auto">
      <MemeEditor
        templates={memeTemplates} 
      />

      <h2 className="text-3xl font-bold mt-5 text-white">Memes</h2>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-2">
        {
          memes.map(meme => (
            <MemeDisplay
              key={meme.id}
              template={memeTemplates.find(t => t.id === meme.template)!}
              values={memes[0].values}
            />
          ))  
        }
      </div>
    </main>
  )
}
