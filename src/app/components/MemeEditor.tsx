'use client'

import {useForm} from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { Memetemplate } from '../data/types'
import { MemeDisplay } from './MemeDisplay'

const textValues = (template: Memetemplate) => {
	return template.textareas.reduce((values, ta) => ({
			...values,
			[ta.id]: ta.text
		}),
		{} as Record<string, string>
	)
}

export const MemeEditor = ({templates}: {templates:Memetemplate[]}) => {
	const {register, handleSubmit, watch, setValue} = useForm<{
		template: string; 
		values: Record<string, string>
	}>({
		defaultValues: {
			template: templates[0].id,
			values: textValues(templates[0])
		}
	})

	console.log(textValues(templates[0]));

	const templateId  = watch('template')
	const template = templates.find(t => t.id === templateId)!

	const values = watch('values')
	
	const router = useRouter()
	const [isPending, startTransition] = useTransition();

	const onSubmit = async (data: {
		template: string,
		values: Record<string, string>
	}) => {
		//console.log(data);
		await fetch('http://localhost:3000/api/memes', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				template: data.template,
				values: data.values
			})
		})
		
		startTransition(() => router.refresh())
	}

	const contents = (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className="grid xs:grid-cols-1 md:grid-cols-[60%_40%]">
				<MemeDisplay
					template={template}
					values={values} 
				/>
				<div className="px-2">
					<select
						className='select select-bordered w-full'
						value={templateId}
						onChange={e => {
							const newTemp = templates.find(t => t.id === e.target.value)!
							
							setValue('template', newTemp.id)
							setValue('values', textValues(newTemp))
						}}
					>
						<option disabled>Pick your template</option>
						{templates.map(t => (
							<option
								key={t.id} 
								value={t.id}
							>
								{t.id}
							</option>
						))}
					</select>

					{template.textareas.map((ta, ind) => (
						<div
							key={ind} 
							className="mt-5"
						>
							<label htmlFor={ta.id}>{ta.id}</label>
							<div>
								<input 
									type="text"
									className='input w-full input-bordered'
									{...register(`values.${ta.id}`)} 
								/>
							</div>
						</div>
					))}

					<div className="flex justify-end">
						<button 
							className="btn btn-accent mt-5 min-w-[200px]"
							type='submit'
							disabled={isPending}
						>
							Let&apos;s Go!
						</button>
					</div>
				</div>
			</div>
		</form>
	)

	return contents
}