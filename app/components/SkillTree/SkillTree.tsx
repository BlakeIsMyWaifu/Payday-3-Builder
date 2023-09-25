import './placeholders.css'

import { Group, Stack, Text, Title } from '@mantine/core'
import { createContext, type CSSProperties, type Dispatch, type SetStateAction, useContext, useState } from 'react'

import skills, { type Skill, type SkillCategory } from '~/data/skills'
import createMarkup from '~/utils/createMarkup'

import classes from './SkillTree.module.css'

type HoverState = { skill: Skill; pos: [row: number, col: number] }
const HoverContext = createContext<{ hover: HoverState; setHover: Dispatch<SetStateAction<HoverState>> }>({
	hover: { skill: skills[0].Medic, pos: [1, 1] },
	setHover: () => undefined
})

export default function SkillTree() {
	const [hover, setHover] = useState<HoverState>({ skill: skills[0].Medic, pos: [1, 1] })

	return (
		<HoverContext.Provider value={{ hover, setHover }}>
			<div style={{ display: 'flex', flexDirection: 'row' }}>
				<Stack className={classes.tree}>
					{skills.map((category, i) => {
						return <SkillCategory key={i} row={i} category={category} />
					})}
				</Stack>
				<Stack className={classes.sideInfo}>
					<SkillInfo />
					<StatInfo />
				</Stack>
			</div>
		</HoverContext.Provider>
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

interface SkillImageProps {
	skill: Skill
	pos: [row: number, col: number]
}

function SkillImage({ skill, pos: [row, col] }: SkillImageProps) {
	return (
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
	)
}

interface SkillNodeProps {
	skill: Skill
	pos: [row: number, col: number]
}

function SkillNode({ skill, pos }: SkillNodeProps) {
	const { setHover } = useContext(HoverContext)

	return (
		<div
			className={classes.skillWrapper}
			style={{
				marginLeft: skill.type === 'mastery' ? 'auto' : undefined
			}}
			onMouseEnter={() => setHover({ skill, pos })}
		>
			<SkillImage skill={skill} pos={pos} />
		</div>
	)
}

function SkillInfo() {
	const {
		hover: { skill, pos }
	} = useContext(HoverContext)

	return (
		<Stack className={classes.info}>
			<Group>
				<SkillImage skill={skill} pos={pos} />
				<Title order={4}>{skill.name}</Title>
			</Group>
			<Text dangerouslySetInnerHTML={createMarkup(skill.description)} />
			{skill.descriptionAced ? <Text dangerouslySetInnerHTML={createMarkup(skill.descriptionAced)} /> : null}
		</Stack>
	)
}
const Edge = () => <span className='skill-bonus-edge'>EDGE </span>
const Grit = () => <span className='skill-bonus-grit'>GRIT </span>
const Rush = () => <span className='skill-bonus-rush'>RUSh </span>
const Value = ({ children }: { children: string }) => <span className='skill-val'>{children}</span>

function StatInfo() {
	return (
		<Stack className={classes.info}>
			<Text>
				<Edge /> - You deal <Value>10%</Value> extra damage for <Value>20</Value> seconds.
			</Text>
			<Text>
				<Grit /> - You take <Value>10%</Value> less damage for <Value>20</Value> seconds.
			</Text>
			<Text>
				<Rush /> - Your movement speed is increased for <Value>20</Value> seconds.
			</Text>
		</Stack>
	)
}
