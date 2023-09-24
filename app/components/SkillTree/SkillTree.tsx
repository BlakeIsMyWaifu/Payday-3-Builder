import { Group, Stack, Title } from '@mantine/core'
import { type CSSProperties } from 'react'

import skills, { type Skill, type SkillCategory } from '~/data/skills'

import classes from './SkillTree.module.css'

export default function SkillTree() {
	return (
		<Stack className={classes.tree}>
			{skills.map((category, i) => {
				return <SkillCategory key={i} row={i} category={category} />
			})}
		</Stack>
	)
}

interface SkillCategoryProps {
	row: number
	category: SkillCategory
}

function SkillCategory({ row, category }: SkillCategoryProps) {
	const categoryArr = Object.values(category)

	return (
		<Stack className={classes.category} gap='xs'>
			<Title order={4} pl='sm' pt='xs'>
				{categoryArr[0].name}
			</Title>
			<Group wrap='nowrap' pl='sm' pb='sm' pr='sm'>
				{categoryArr.map((node, i) => {
					return <SkillNode key={node.name} skill={node} pos={[row + 1, i + 1]} />
				})}
			</Group>
		</Stack>
	)
}

interface SkillNodeProps {
	skill: Skill
	pos: [row: number, col: number]
}

function SkillNode({ skill, pos: [row, col] }: SkillNodeProps) {
	return (
		<div
			className={classes.skillWrapper}
			style={{
				marginLeft: skill.type === 'mastery' ? 'auto' : undefined
			}}
		>
			<div
				className={classes.skill}
				style={
					{
						'--r': row,
						'--c': col,
						'--size': skill.type === 'basic' ? '60px' : '80px'
					} as CSSProperties
				}
			/>
		</div>
	)
}
