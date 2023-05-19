'use client'

import Image from 'next/image'
import {Anton} from 'next/font/google'
import { useElementSize } from "usehooks-ts"
import { Memetemplate } from '../data/types'

const anton = Anton({
  weight: '400',
  subsets: ['latin']
})

export const MemeDisplay = ({
  template,
  values,
}: {
  template: Memetemplate,
  values: Record<string, string>
}) => {
	//console.log(useElementSize());
	const [memeRef, {width}] = useElementSize()

  //console.log(template.background);
	const ratio = width / template.background.width

  return (
    <div 
			className="relative" 
			ref={memeRef}
		>
      <Image
        src={template.background.src}
        width={template.background.width}
        height={template.background.height}
        alt={template.background.alt} 
      />
      
      {template.textareas.map(ta => (
        <div
          key={ta.id}
          className='absolute'
          style={{
            top: ta.top * ratio,
            left: ta.left * ratio,
            width: ta.width * ratio,
            height: ta.height * ratio
          }}
        >
          <div
            className={`${anton.className} text-center ${
              ta.color ?? "white"
            }-contrast-outline`}
            style={{
              fontSize: ta.size * ratio,
              lineHeight: '1.1'
            }}
          >
            {values?.[ta.id] ?? ta.text}
          </div>
        </div>
      ))}
    </div> 
  )
}