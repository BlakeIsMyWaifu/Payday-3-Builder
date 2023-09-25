export type SkillCategory = Record<string, Skill>

export interface Skill {
	name: string
	type: 'main' | 'basic' | 'mastery'
	values: Record<string, string | number>
	tooltipNotes: Stat[]
	tags: `${Usage} ${Stat}`[]
	stateTags: `${Tier}-${Usage} ${Stat}`[]
	description: string
	descriptionAced: string | null
}

type Stat = 'edge' | 'grit' | 'rush'
type Usage = 'gain' | 'refresh' | 'consume' | 'require'
type Tier = 'basic' | 'aced' | 'basic,aced'

const skills: SkillCategory[] = [
	{
		Medic: {
			name: 'Medic',
			type: 'main',
			values: { DamageReduction: '40%', InteractSpeed: '20%', AdditionalCharges: 2 },
			tooltipNotes: ['grit'],
			tags: ['gain grit'],
			stateTags: ['aced-gain grit'],
			description:
				'You revive teammates {InteractSpeed} faster.\r\n\r\nMedic Bags you deploy have {AdditionalCharges} additional {AdditionalCharges}|plural(charge,charges).',
			descriptionAced:
				'When you start reviving a teammate, you gain [sk-grit]GRIT[/].\r\n\r\nAs long as you have [sk-grit]GRIT[/], you take {DamageReduction} less damage when reviving a teammate.'
		},
		'Steady Hands': {
			name: 'Steady Hands',
			type: 'basic',
			values: { AdditionalHealth: '20%' },
			tooltipNotes: [],
			tags: [],
			stateTags: [],
			description:
				'Interacting with Medic Bags heals you for an additional {AdditionalHealth} of your max health.',
			descriptionAced: null
		},
		'Extra Charge': {
			name: 'Extra Charge',
			type: 'basic',
			values: { AdditionalCharges: 2 },
			tooltipNotes: [],
			tags: [],
			stateTags: [],
			description:
				'Medic Bags you deploy have {AdditionalCharges} additional {AdditionalCharges}|plural(charge,charges).',
			descriptionAced: null
		},
		'Combat Medic': {
			name: 'Combat Medic',
			type: 'basic',
			values: { ImmunityDuration: 5 },
			tooltipNotes: ['grit'],
			tags: ['require grit'],
			stateTags: ['basic-require grit'],
			description:
				'If you have [sk-grit]GRIT[/], successfully reviving your teammate will give both you and that teammate damage immunity for {ImmunityDuration} {ImmunityDuration}|plural(second,seconds).',
			descriptionAced: null
		},
		'Code Blue': {
			name: 'Code Blue',
			type: 'basic',
			values: { InteractSpeed: '30%' },
			tooltipNotes: ['rush'],
			tags: ['gain rush', 'refresh rush'],
			stateTags: ['basic-gain rush', 'basic-refresh rush'],
			description:
				'Whenever a teammate is downed or disabled, you gain or refresh [sk-rush]RUSH[/].\r\n\r\nAs long as you have [sk-rush]RUSH[/], you pick teammates up {InteractSpeed} faster.',
			descriptionAced: null
		},
		Triage: {
			name: 'Triage',
			type: 'basic',
			values: { AdditionalHealth: '15%', InteractSpeed: '50%' },
			tooltipNotes: ['edge', 'grit', 'rush'],
			tags: ['consume edge', 'consume grit', 'consume rush'],
			stateTags: ['basic-consume edge', 'basic-consume grit', 'basic-consume rush'],
			description:
				'Interacting with a Medic Bag or First Aid Kit will consume active [sk-edge]EDGE[/], [sk-grit]GRIT[/], and [sk-rush]RUSH[/] and heal you for an additional {AdditionalHealth} for each.\r\n\r\nYou interact {InteractSpeed} faster with Medic Bags and First Aid Kits.',
			descriptionAced: null
		},
		'Field Surgery': {
			name: 'Field Surgery',
			type: 'mastery',
			values: { AdditionalHealth: '10%', RestoredDownedCount: 1 },
			tooltipNotes: [],
			tags: [],
			stateTags: [],
			description:
				'Interacting with any Medic Bag will restore an additional {AdditionalHealth} of your max health and restore {RestoredDownedCount} "{RestoredDownedCount}|plural(down,downs)".',
			descriptionAced: null
		}
	},
	{
		'Ammo Specialist': {
			name: 'Ammo Specialist',
			type: 'main',
			values: { IncreasedCapacity: '20%', AdditionalCharges: 2 },
			tooltipNotes: ['edge'],
			tags: ['gain edge'],
			stateTags: ['aced-gain edge'],
			description:
				'Your reserve ammo capacity is increased by {IncreasedCapacity}.\r\n\r\nAmmo bags you deploy have {AdditionalCharges} additional {AdditionalCharges}|plural(charge,charges).',
			descriptionAced:
				"Whenever you pick up ammo, if your current weapon's magazine is full, you gain [sk-edge]EDGE[/] if you don't have it."
		},
		Scrounger: {
			name: 'Scrounger',
			type: 'basic',
			values: { ThrowableChance: '10%' },
			tooltipNotes: ['edge'],
			tags: ['require edge'],
			stateTags: ['basic-require edge'],
			description:
				'As long as you have [sk-edge]EDGE[/], ammo drops have a {ThrowableChance} chance of replenishing one of your throwables.',
			descriptionAced: null
		},
		'Fully Loaded': {
			name: 'Fully Loaded',
			type: 'basic',
			values: { AdditionalCharges: 2 },
			tooltipNotes: [],
			tags: [],
			stateTags: [],
			description:
				'Ammo bags you deploy have {AdditionalCharges} additional {AdditionalCharges}|plural(charge,charges).',
			descriptionAced: null
		},
		'Plate Up': {
			name: 'Plate Up',
			type: 'basic',
			values: {},
			tooltipNotes: ['grit'],
			tags: ['require grit'],
			stateTags: ['basic-require grit'],
			description:
				'As long as you have [sk-grit]GRIT[/], ammo drops will instantly regenerate your current armor chunk.',
			descriptionAced: null
		},
		'High Grain': {
			name: 'High Grain',
			type: 'basic',
			values: { ExtraDamage: '20%', Duration: 10 },
			tooltipNotes: [],
			tags: [],
			stateTags: [],
			description:
				'After interacting with an ammo bag, you get {ExtraDamage} more damage for {Duration} {Duration}|plural(second,seconds). This bonus does not stack with itself.',
			descriptionAced: null
		},
		'Mag Throw': {
			name: 'Mag Throw',
			type: 'basic',
			values: { AmmoRange: 10 },
			tooltipNotes: ['rush'],
			tags: ['require rush'],
			stateTags: ['basic-require rush'],
			description:
				"As long as you have [sk-rush]RUSH[/], any ammo drops you pick up are also given to crew members within {AmmoRange} {AmmoRange}|plural(meter,meters).\r\n\r\nThis won't trigger the Mag Throw skill of other players.",
			descriptionAced: null
		},
		'Top Up': {
			name: 'Top Up',
			type: 'mastery',
			values: { AdditionalAmmo: '20%' },
			tooltipNotes: [],
			tags: [],
			stateTags: [],
			description:
				'Interacting with any ammo bag will restore an additional {AdditionalAmmo} ammo and fully restock your throwables.',
			descriptionAced: null
		}
	},
	{
		Mower: {
			name: 'Mower',
			type: 'main',
			values: { ShotBullets: 35 },
			tooltipNotes: ['edge'],
			tags: ['gain edge', 'refresh edge'],
			stateTags: ['basic-gain edge', 'aced-refresh edge'],
			description: 'Every {ShotBullets} bullets you shoot, gain [sk-edge]EDGE[/].',
			descriptionAced: 'Whenever you reload a weapon with an empty magazine, refresh [sk-edge]EDGE[/].'
		},
		'Recoil Handling': {
			name: 'Recoil Handling',
			type: 'basic',
			values: {},
			tooltipNotes: ['edge'],
			tags: ['require edge'],
			stateTags: ['basic-require edge'],
			description: 'As long as you have [sk-edge]EDGE[/], your weapon recoil is reduced.',
			descriptionAced: null
		},
		'Suppressive Fire': {
			name: 'Suppressive Fire',
			type: 'basic',
			values: {},
			tooltipNotes: ['edge'],
			tags: ['require edge'],
			stateTags: ['basic-require edge'],
			description:
				'As long as you have [sk-edge]EDGE[/], every shot from your weapon has a chance to inflict a heavy stagger.',
			descriptionAced: null
		},
		'Ammo Funnel': {
			name: 'Ammo Funnel',
			type: 'basic',
			values: {},
			tooltipNotes: ['edge'],
			tags: ['require edge'],
			stateTags: ['basic-require edge'],
			description:
				"As long as you have [sk-edge]EDGE[/], ammo you pick up is directly added to your equipped weapon's magazine. If your magazine is full, it's added to your reserves instead.",
			descriptionAced: null
		},
		Replenish: {
			name: 'Replenish',
			type: 'basic',
			values: {},
			tooltipNotes: ['edge'],
			tags: ['require edge'],
			stateTags: ['basic-require edge'],
			description:
				'As long as you have [sk-edge]EDGE[/], you automatically pick up ammo dropped by enemies you have killed.',
			descriptionAced: null
		},
		'Sprint Loaded': {
			name: 'Sprint Loaded',
			type: 'mastery',
			values: {},
			tooltipNotes: [],
			tags: [],
			stateTags: [],
			description: 'You can reload while sprinting.',
			descriptionAced: null
		}
	},
	{
		Infiltrator: {
			name: 'Infiltrator',
			type: 'main',
			values: {},
			tooltipNotes: ['rush'],
			tags: ['gain rush', 'refresh rush'],
			stateTags: ['basic,aced-gain rush', 'basic-refresh rush'],
			description:
				'Whenever you successfully pick a lock, or kill an enemy with a throwing knife, gain or refresh [sk-rush]RUSH[/].',
			descriptionAced: 'Whenever a guard begins to detect you, gain [sk-rush]RUSH[/].'
		},
		'Quick Fingers': {
			name: 'Quick Fingers',
			type: 'basic',
			values: {},
			tooltipNotes: ['rush'],
			tags: ['require rush'],
			stateTags: ['basic-require rush'],
			description:
				'As long as you have [sk-rush]RUSH[/], a successful lockpick jiggle will immediately pick the lock.',
			descriptionAced: null
		},
		Retriever: {
			name: 'Retriever',
			type: 'basic',
			values: {},
			tooltipNotes: [],
			tags: [],
			stateTags: [],
			description: "Your throwing knives won't break on impact with the environment.",
			descriptionAced: null
		},
		Bagger: {
			name: 'Bagger',
			type: 'basic',
			values: { InteractionSpeed: '50%' },
			tooltipNotes: ['rush'],
			tags: ['require rush'],
			stateTags: ['basic-require rush'],
			description: 'As long as you have [sk-rush]RUSH[/], you bag loot {InteractionSpeed} faster.',
			descriptionAced: null
		},
		'Blade Bouncer': {
			name: 'Blade Bouncer',
			type: 'basic',
			values: { ExtraDamage: '100%' },
			tooltipNotes: [],
			tags: [],
			stateTags: [],
			description:
				'Your throwing knives will ricochet off the environment up to two times. The throwing knife will do extra damage for each bounce.',
			descriptionAced: null
		},
		'Frugal Thrower': {
			name: 'Frugal Thrower',
			type: 'mastery',
			values: { KeepChance: '20%' },
			tooltipNotes: [],
			tags: [],
			stateTags: [],
			description: 'Throwables you use have a {KeepChance} chance to be replenished after they are destroyed.',
			descriptionAced: null
		}
	},
	{
		Tank: {
			name: 'Tank',
			type: 'main',
			values: { IncreasedRegenerationSpeed: '20%', AdditionalCharges: 2 },
			tooltipNotes: ['grit'],
			tags: ['gain grit', 'refresh grit'],
			stateTags: ['aced-gain grit', 'aced-refresh grit'],
			description:
				'Increase the regeneration speed of your armor chunks by {IncreasedRegenerationSpeed}.\r\n\r\nYour armor bag has {AdditionalCharges} additional {AdditionalCharges}|plural(charge,charges).',
			descriptionAced: 'Whenever one of your armor chunks breaks, gain or refresh [sk-grit]GRIT[/].'
		},
		Hardy: {
			name: 'Hardy',
			type: 'basic',
			values: { DurationReduction: '50%' },
			tooltipNotes: [],
			tags: [],
			stateTags: [],
			description:
				'As long as you have at least one armor chunk, any flashbang, stagger and stun effect duration you suffer is lowered by {DurationReduction}.',
			descriptionAced: null
		},
		'Extra Plates': {
			name: 'Extra Plates',
			type: 'basic',
			values: { AdditionalCharges: 2 },
			tooltipNotes: [],
			tags: [],
			stateTags: [],
			description:
				'Your armor bag has {AdditionalCharges} additional {AdditionalCharges}|plural(charge,charges).',
			descriptionAced: null
		},
		'Armor Up': {
			name: 'Armor Up',
			type: 'basic',
			values: {},
			tooltipNotes: [],
			tags: [],
			stateTags: [],
			description: 'Interacting with any armor bag will restore an additional chunk.',
			descriptionAced: null
		},
		'Last Man Standing': {
			name: 'Last Man Standing',
			type: 'basic',
			values: { Duration: 10 },
			tooltipNotes: ['grit'],
			tags: ['consume grit'],
			stateTags: ['basic-consume grit'],
			description:
				"If damage would normally down you, you can instead consume available [sk-grit]GRIT[/] to stay on your feet and become immune to damage for {Duration} {Duration}|plural(second,seconds).\r\n\r\nAfter this effect has been applied, you can't gain [sk-grit]GRIT[/] until you heal using a Medic Bag or First Aid Kit, or until you're downed.",
			descriptionAced: null
		},
		Disengage: {
			name: 'Disengage',
			type: 'mastery',
			values: { Duration: 5 },
			tooltipNotes: [],
			tags: [],
			stateTags: [],
			description:
				"Once per heist, you can free yourself from a Cloaker or Zapper, after which you can't be disabled by them again for {Duration} {Duration}|plural(second,seconds).",
			descriptionAced: null
		}
	},
	{
		Sharpshooter: {
			name: 'Sharpshooter',
			type: 'main',
			values: { ActivationTime: 1.5 },
			tooltipNotes: ['edge'],
			tags: ['gain edge', 'refresh edge'],
			stateTags: ['basic-gain edge', 'aced-refresh edge'],
			description:
				'Stand still for {ActivationTime} seconds while aiming down sights or scopes and gain [sk-edge]EDGE[/].',
			descriptionAced: 'Performing a headshot while aiming down sight will refresh your [sk-edge]EDGE[/].'
		},
		'Collateral Control': {
			name: 'Collateral Control',
			type: 'basic',
			values: {},
			tooltipNotes: [],
			tags: [],
			stateTags: [],
			description:
				"If you destroy a Special enemy's weak point, like the Zapper's battery or the Nader's belt, the explosion will only affect enemies.",
			descriptionAced: null
		},
		'Long Shot': {
			name: 'Long Shot',
			type: 'basic',
			values: {},
			tooltipNotes: ['edge'],
			tags: ['require edge'],
			stateTags: ['basic-require edge'],
			description:
				'As long as you have [sk-edge]EDGE[/] and are aiming down sights, distance penalties do not apply to headshot multipliers.',
			descriptionAced: null
		},
		'Precision Shot': {
			name: 'Precision Shot',
			type: 'basic',
			values: {},
			tooltipNotes: ['edge'],
			tags: ['consume edge'],
			stateTags: ['basic-consume edge'],
			description:
				'When aiming down a scope, your shot will consume any [sk-edge]EDGE[/] you have. When this happens, your shot will do extra damage based on your scope magnification.',
			descriptionAced: null
		},
		'Cutting Shot': {
			name: 'Cutting Shot',
			type: 'basic',
			values: { IncreasedArmorPenetration: 1 },
			tooltipNotes: ['edge'],
			tags: ['require edge'],
			stateTags: ['basic-require edge'],
			description: 'As long as you have [sk-edge]EDGE[/], your armor penetration is increased.',
			descriptionAced: null
		},
		'Speed Aim': {
			name: 'Speed Aim',
			type: 'mastery',
			values: { IncreasedADSSpeed: 20 },
			tooltipNotes: [],
			tags: [],
			stateTags: [],
			description: 'Increase your ADS and scope speed.',
			descriptionAced: null
		}
	},
	{
		Escapist: {
			name: 'Escapist',
			type: 'main',
			values: { SprintDuration: 3 },
			tooltipNotes: ['edge', 'rush'],
			tags: ['gain rush', 'consume rush', 'gain edge', 'refresh edge'],
			stateTags: ['basic-gain rush', 'aced-consume rush', 'aced-gain edge', 'aced-refresh edge'],
			description:
				'Whenever you sprint for at least {SprintDuration} {SprintDuration}|plural(second,seconds) gain [sk-rush]RUSH[/].',
			descriptionAced:
				"If you have [sk-rush]RUSH[/] available and slide, it's consumed, and you gain or refresh [sk-edge]EDGE[/]."
		},
		Balanced: {
			name: 'Balanced',
			type: 'basic',
			values: {},
			tooltipNotes: ['rush'],
			tags: ['require rush', 'consume rush'],
			stateTags: ['basic-require rush', 'basic-consume rush'],
			description:
				'As long as you have [sk-rush]RUSH[/] and an enemy or effect would stagger you, instead consume [sk-rush]RUSH[/] and ignore the stagger.',
			descriptionAced: null
		},
		'Move & Cover': {
			name: 'Move & Cover',
			type: 'basic',
			values: {},
			tooltipNotes: ['edge', 'grit'],
			tags: ['consume edge', 'gain grit', 'refresh grit'],
			stateTags: ['basic-consume edge', 'basic-gain grit', 'basic-refresh grit'],
			description:
				"If you have [sk-edge]EDGE[/] available and vault or mantle, it's consumed, and you gain or refresh [sk-grit]GRIT[/]",
			descriptionAced: null
		},
		'Slide Tackle': {
			name: 'Slide Tackle',
			type: 'basic',
			values: {},
			tooltipNotes: ['grit'],
			tags: ['require grit', 'consume grit'],
			stateTags: ['basic-require grit', 'basic-consume grit'],
			description:
				'If you have [sk-grit]GRIT[/] and slide into one or more non-Special enemies, you consume [sk-grit]GRIT[/] and stagger those enemies.',
			descriptionAced: null
		},
		'Battering Ram': {
			name: 'Battering Ram',
			type: 'basic',
			values: {},
			tooltipNotes: ['edge', 'grit', 'rush'],
			tags: ['require edge', 'require grit', 'require rush'],
			stateTags: ['basic-require edge', 'basic-require grit', 'basic-require rush'],
			description:
				'As long as you have [sk-edge]EDGE[/], [sk-grit]GRIT[/], or [sk-rush]RUSH[/], you can sprint through locked doors to breach them. \r\n\r\nOnly effective on doors with locks that can be picked or shot',
			descriptionAced: null
		},
		Swift: {
			name: 'Swift',
			type: 'mastery',
			values: { SpeedIncrease: '10%' },
			tooltipNotes: [],
			tags: [],
			stateTags: [],
			description: 'Your base sprinting speed when masked on is increased by {SpeedIncrease}.',
			descriptionAced: null
		}
	},
	{
		Demolitionist: {
			name: 'Demolitionist',
			type: 'main',
			values: { IncreasedAreaOfEffect: '20%' },
			tooltipNotes: ['rush'],
			tags: ['gain rush', 'refresh rush'],
			stateTags: ['aced-gain rush', 'aced-refresh rush'],
			description:
				'Explosions caused by your shots or throwables have their area of effect increased by {IncreasedAreaOfEffect}.',
			descriptionAced: 'Whenever you cause an explosion, gain or refresh [sk-rush]RUSH[/].'
		},
		Cooker: {
			name: 'Cooker',
			type: 'basic',
			values: { HoldDuration: 1.5 },
			tooltipNotes: ['grit'],
			tags: ['gain grit'],
			stateTags: ['basic-gain grit'],
			description:
				'Whenever you hold a throwable for at least {HoldDuration} {HoldDuration}|plural(second,seconds) before throwing it, gain [sk-grit]GRIT[/].',
			descriptionAced: null
		},
		'Shell Shock': {
			name: 'Shell Shock',
			type: 'basic',
			values: { AccuracyPenalty: '10%' },
			tooltipNotes: [],
			tags: [],
			stateTags: [],
			description:
				'Non-special enemies damaged by your explosions get a permanent penalty of {AccuracyPenalty} to accuracy. This effect can only be applied once.',
			descriptionAced: null
		},
		Blowback: {
			name: 'Blowback',
			type: 'basic',
			values: {},
			tooltipNotes: ['rush'],
			tags: ['require rush'],
			stateTags: ['basic-require rush'],
			description:
				'As long as you have [sk-rush]RUSH[/], non-special enemies damaged by your explosions lose all armor.',
			descriptionAced: null
		},
		'Blast Shield': {
			name: 'Blast Shield',
			type: 'basic',
			values: {},
			tooltipNotes: ['grit'],
			tags: ['consume grit'],
			stateTags: ['basic-consume grit'],
			description:
				'Available [sk-grit]GRIT[/] is consumed to negate any damage you would normally receive from explosions caused by you.',
			descriptionAced: null
		},
		Overcooked: {
			name: 'Overcooked',
			type: 'basic',
			values: {},
			tooltipNotes: [],
			tags: [],
			stateTags: [],
			description:
				'Any throwable or weapon you use that has an explosive component will no longer run on a timer but will immediately explode on impact with the environment or an NPC.',
			descriptionAced: null
		},
		'Extra Munitions': {
			name: 'Extra Munitions',
			type: 'mastery',
			values: { AdditionalCapacity: 2 },
			tooltipNotes: [],
			tags: [],
			stateTags: [],
			description: 'Your throwable capacity is increased by {AdditionalCapacity}.',
			descriptionAced: null
		}
	},
	{
		Enforcer: {
			name: 'Enforcer',
			type: 'main',
			values: { KillAmount: 2, KillAmountAced: 1, WithinRange: 5, WithinTime: 4 },
			tooltipNotes: ['edge', 'grit'],
			tags: ['gain grit', 'require grit', 'gain edge'],
			stateTags: ['basic-gain grit', 'aced-require grit', 'aced-gain edge'],
			description:
				'Whenever you kill {KillAmount} {KillAmount}|plural(enemy,enemies) within {WithinTime} {WithinTime}|plural(second,seconds) that are within {WithinRange} {WithinRange}|plural(meter,meters) of you, you gain [sk-grit]GRIT[/].',
			descriptionAced:
				'Whenever you kill {KillAmountAced} {KillAmountAced}|plural(enemy,enemies) within {WithinRange} {WithinRange}|plural(meter, meters) range, if you have [sk-grit]GRIT[/], gain [sk-edge]EDGE[/].'
		},
		'Quick Reload': {
			name: 'Quick Reload',
			type: 'basic',
			values: {},
			tooltipNotes: ['edge', 'grit'],
			tags: ['require edge', 'require grit'],
			stateTags: ['basic-require edge', 'basic-require grit'],
			description:
				'As long as you have both [sk-grit]GRIT[/] and [sk-edge]EDGE[/], you have increased reload speed.',
			descriptionAced: null
		},
		'Face to Face': {
			name: 'Face to Face',
			type: 'basic',
			values: { ExtraDamage: '10%', WithinRange: 5 },
			tooltipNotes: ['edge', 'grit'],
			tags: ['require edge', 'require grit'],
			stateTags: ['basic-require edge', 'basic-require grit'],
			description:
				'As long as you have both [sk-edge]EDGE[/] and [sk-grit]GRIT[/], you deal {ExtraDamage} extra damage to targets within {WithinRange} {WithinRange}|plural(meter,meters) of you.',
			descriptionAced: null
		},
		Solid: {
			name: 'Solid',
			type: 'basic',
			values: {},
			tooltipNotes: ['edge', 'grit'],
			tags: ['require edge', 'require grit'],
			stateTags: ['basic-require edge', 'basic-require grit'],
			description:
				"As long as you have both [sk-edge]EDGE[/] and [sk-grit]GRIT[/], you're immune to stagger effects.",
			descriptionAced: null
		},
		'Combat Reload': {
			name: 'Combat Reload',
			type: 'basic',
			values: {},
			tooltipNotes: ['edge', 'grit'],
			tags: ['refresh edge', 'refresh grit'],
			stateTags: ['basic-refresh edge', 'basic-refresh grit'],
			description:
				'Whenever you reload a weapon while the magazine still has ammo, refresh [sk-edge]EDGE[/] and [sk-grit]GRIT[/].',
			descriptionAced: null
		},
		'Shock & Awe': {
			name: 'Shock & Awe',
			type: 'mastery',
			values: { WithinRange: 8, StaggerRange: 5, StaggerChance: '20%' },
			tooltipNotes: [],
			tags: [],
			stateTags: [],
			description:
				'Killing an enemy within {WithinRange} {WithinRange}|plural(meter,meters) of you has a chance to stagger all non-Special enemies within {StaggerRange} {StaggerRange}|plural(meter,meters) of you.',
			descriptionAced: null
		}
	},
	{
		Manipulator: {
			name: 'Manipulator',
			type: 'main',
			values: { InteractSpeed: '50%' },
			tooltipNotes: [],
			tags: [],
			stateTags: [],
			description: 'You tie up and trade hostages {InteractSpeed} faster.',
			descriptionAced: 'Whenever you trade a hostage, they count as one additional hostage.'
		},
		Overbearing: {
			name: 'Overbearing',
			type: 'basic',
			values: { IncreasedRange: '20%', IncreasedDowntime: '50%' },
			tooltipNotes: [],
			tags: [],
			stateTags: [],
			description:
				'Your shout range for intimidating civilians is increased by {IncreasedRange}.\r\n\r\nCivilians stay down {IncreasedDowntime} longer after being shouted down.',
			descriptionAced: null
		},
		'Silver Tongue': {
			name: 'Silver Tongue',
			type: 'basic',
			values: {},
			tooltipNotes: [],
			tags: [],
			stateTags: [],
			description: 'Trading Employees, Guards or Law Enforcement counts as trading an additional hostage.',
			descriptionAced: null
		},
		Negotiator: {
			name: 'Negotiator',
			type: 'basic',
			values: { ExtraResource: 1 },
			tooltipNotes: [],
			tags: [],
			stateTags: [],
			description:
				'Trading hostages for First Aid now yields {ExtraResource} additional First Aid {ExtraResource}|plural(pack,packs).',
			descriptionAced: null
		},
		Menacing: {
			name: 'Menacing',
			type: 'basic',
			values: { SurrenderDistance: 5 },
			tooltipNotes: [],
			tags: [],
			stateTags: [],
			description:
				"You can shout at guards, SWAT or Heavy SWAT within {SurrenderDistance} {SurrenderDistance}|plural(meter,meters) of you to force them to surrender. As long as you're aiming at them, they will go down on their knees and drop their weapon. Any damage dealt to them or taking your aim off of them interrupts this process.\r\n\r\nOnce fully surrendered, the SWAT obeys all the rules of a civilian, including any penalties for killing them. You can't have more than one SWAT as a hostage at any time.",
			descriptionAced: null
		},
		'Stockholm Syndrome': {
			name: 'Stockholm Syndrome',
			type: 'basic',
			values: {},
			tooltipNotes: [],
			tags: [],
			stateTags: [],
			description:
				"When you're downed, you can shout at a tied down or cowering hostage within range to try and reach you and revive you.",
			descriptionAced: null
		},
		'Master Trader': {
			name: 'Master Trader',
			type: 'mastery',
			values: { TimeSaved: 20 },
			tooltipNotes: [],
			tags: [],
			stateTags: [],
			description:
				"Every hostage you trade between assault waves reduces the next player's time in custody by {TimeSaved} {TimeSaved}|plural(second,seconds); the minimum time spent in custody is capped at 10 seconds. This time reduction resets after any player has been taken into custody.",
			descriptionAced: null
		}
	},
	{
		Engineer: {
			name: 'Engineer',
			type: 'main',
			values: { AdditionalMaxHeatBuildup: '20%' },
			tooltipNotes: [],
			tags: [],
			stateTags: [],
			description:
				'Unlocking this skill gives you access to the Sentry Turret equipment. This turret can be equipped in the equipment slot of your loadout.\r\n\r\nThe turret will shoot any non-mechanical enemies it sees until the enemies are dead or no longer within sight. As it shoots, it will build up heat until it reaches max heat. Once the sentry is at max heat, it will stop functioning. The owner of the turret can pick up the turret at any point to reset the heat to 0 and redeploy it.\r\n\r\nEquipping this skill increases the max heat build-up of your turret by {AdditionalMaxHeatBuildup}.',
			descriptionAced:
				'Increase the max heat build-up of your sentry turret by another {AdditionalMaxHeatBuildup}.'
		},
		'AP Turret': {
			name: 'AP Turret',
			type: 'basic',
			values: { IncreasedArmorPenetration: 1 },
			tooltipNotes: [],
			tags: [],
			stateTags: [],
			description: 'Increase armor penetration of sentry turrets you deploy by {IncreasedArmorPenetration}.',
			descriptionAced: null
		},
		'Cooling System': {
			name: 'Cooling System',
			type: 'basic',
			values: { ReducedHeatBuildupFromDamage: '30%' },
			tooltipNotes: [],
			tags: [],
			stateTags: [],
			description:
				'Reduce heat build-up from damage, electrical explosions or hack attempts by {ReducedHeatBuildupFromDamage} for all turrets.',
			descriptionAced: null
		},
		Detonation: {
			name: 'Detonation',
			type: 'basic',
			values: {},
			tooltipNotes: [],
			tags: [],
			stateTags: [],
			description: 'Whenever your turret overheats, it will cause an explosion that damages NPCs in an area.',
			descriptionAced: null
		},
		'Spin Cycle': {
			name: 'Spin Cycle',
			type: 'basic',
			values: {},
			tooltipNotes: [],
			tags: [],
			stateTags: [],
			description: 'Your sentry turret can now rotate 360 degrees to acquire its targets.',
			descriptionAced: null
		},
		'Dual Sentries': {
			name: 'Dual Sentries',
			type: 'basic',
			values: { AdditionalSelfHeatBuildup: '50%' },
			tooltipNotes: [],
			tags: [],
			stateTags: [],
			description:
				'You can now deploy a second sentry turret, but all your turrets build heat {AdditionalSelfHeatBuildup} faster while shooting.',
			descriptionAced: null
		},
		'Targeted Fire': {
			name: 'Targeted Fire',
			type: 'mastery',
			values: {},
			tooltipNotes: [],
			tags: [],
			stateTags: [],
			description:
				"Your turrets will switch targets to whichever enemy you mark manually, if it's within line of sight. If you mark multiple enemies, it will prioritize the last one you marked.",
			descriptionAced: null
		}
	},
	{
		Gunslinger: {
			name: 'Gunslinger',
			type: 'main',
			values: {},
			tooltipNotes: ['edge'],
			tags: ['gain edge', 'consume edge', 'refresh edge'],
			stateTags: ['basic-gain edge', 'basic-consume edge', 'aced-refresh edge'],
			description:
				'Whenever you switch your weapon, you gain [sk-edge]EDGE[/]. \r\n\r\nADSing will end any [sk-edge]EDGE[/] you have active',
			descriptionAced:
				'Performing headshots with your weapon in hipfire will refresh any [sk-edge]EDGE[/] you have.'
		},
		'From the Hip': {
			name: 'From the Hip',
			type: 'basic',
			values: { SpreadDecrease: '30%' },
			tooltipNotes: ['edge'],
			tags: ['require edge'],
			stateTags: ['basic-require edge'],
			description: 'As long as you have [sk-edge]EDGE[/], your hipfire spread is decreased.',
			descriptionAced: null
		},
		'Heavy Hipfire': {
			name: 'Heavy Hipfire',
			type: 'basic',
			values: {},
			tooltipNotes: ['edge'],
			tags: ['require edge'],
			stateTags: ['basic-require edge'],
			description: 'As long as you have [sk-edge]EDGE[/], hipfire shots will cause heavy stagger.',
			descriptionAced: null
		},
		Finisher: {
			name: 'Finisher',
			type: 'basic',
			values: { ExtraDamage: '200%' },
			tooltipNotes: ['edge'],
			tags: ['consume edge'],
			stateTags: ['basic-consume edge'],
			description:
				'If you have [sk-edge]EDGE[/], the last shot of your magazine will consume it to deal {ExtraDamage} more damage.',
			descriptionAced: null
		},
		'Quick Draw': {
			name: 'Quick Draw',
			type: 'mastery',
			values: { EquipSpeed: 30 },
			tooltipNotes: [],
			tags: [],
			stateTags: [],
			description: 'Increase your weapon swap speed.',
			descriptionAced: null
		}
	},
	{
		Grifter: {
			name: 'Grifter',
			type: 'main',
			values: { Range: 1, RangeAced: 10 },
			tooltipNotes: ['rush'],
			tags: ['gain rush'],
			stateTags: ['basic-gain rush'],
			description:
				'As long as you are masked off, if you are within {Range} {Range}|plural(meter,meters) of a civilian or employee, gain [sk-rush]RUSH[/].',
			descriptionAced:
				'When you mask on, any civilians and employees within {RangeAced} {RangeAced}|plural(meter,meters) that can see you will become intimidated.'
		},
		'Walk The Walk': {
			name: 'Walk The Walk',
			type: 'basic',
			values: {},
			tooltipNotes: ['rush'],
			tags: ['require rush'],
			stateTags: ['basic-require rush'],
			description:
				"As long as you're unmasked and have [sk-rush]RUSH[/], cameras can't detect you trespassing in private areas. (They will still detect you performing an illegal action.)",
			descriptionAced: null
		},
		'Social Engineering': {
			name: 'Social Engineering',
			type: 'basic',
			values: {},
			tooltipNotes: ['rush'],
			tags: ['require rush'],
			stateTags: ['basic-require rush'],
			description:
				"As long as you're unmasked and have [sk-rush]RUSH[/], employees will ignore you performing illegal actions.",
			descriptionAced: null
		},
		'Open Mic': {
			name: 'Open Mic',
			type: 'basic',
			values: { InteractSpeed: '50%' },
			tooltipNotes: [],
			tags: [],
			stateTags: [],
			description: 'You answer radios {InteractSpeed} faster.',
			descriptionAced: null
		},
		Slippery: {
			name: 'Slippery',
			type: 'mastery',
			values: {},
			tooltipNotes: [],
			tags: [],
			stateTags: [],
			description: 'After getting cuffed by a guard, you can break free by lockpicking the cuffs.',
			descriptionAced: null
		}
	},
	{
		Hacker: {
			name: 'Hacker',
			type: 'main',
			values: {},
			tooltipNotes: [],
			tags: [],
			stateTags: [],
			description:
				"You can hack cameras to gain access to the area's CCTV system. This functions as though you had accessed the heist's security room.\r\n\r\nYou gain one Runtime.",
			descriptionAced:
				'You can overload a device that already has an active Runtime. This will cause an electrical explosion that will stun anyone within range and destroy the device.\r\n\r\nYou gain one additional Runtime.'
		},
		'Secure Loop': {
			name: 'Secure Loop',
			type: 'basic',
			values: {},
			tooltipNotes: [],
			tags: [],
			stateTags: [],
			description:
				"You can use one Runtime to make the security camera you're controlling loop its footage. Cameras looping their footage cannot detect you or anything out of the ordinary. \r\n\r\nIf the camera is destroyed, you regain your Runtime use. If you apply a new Runtime when you're at max Runtimes, your oldest active one is removed.",
			descriptionAced: null
		},
		'Appliance Breach': {
			name: 'Appliance Breach',
			type: 'basic',
			values: {},
			tooltipNotes: [],
			tags: [],
			stateTags: [],
			description: 'You can activate lures from a distance, as long as you have a clear line of sight.',
			descriptionAced: null
		},
		'Routed Ping': {
			name: 'Routed Ping',
			type: 'basic',
			values: { MarkedDuration: 5 },
			tooltipNotes: [],
			tags: [],
			stateTags: [],
			description:
				"You can spend a Runtime to make the hacked camera automatically mark any guards or law enforcement within its range.\r\n\r\nTargets stay marked for {MarkedDuration} {MarkedDuration}|plural(second,seconds) after leaving the camera's view and do not count towards your maximum number of marked targets",
			descriptionAced: null
		},
		'Glitch Protocol': {
			name: 'Glitch Protocol',
			type: 'basic',
			values: { DistractTime: 5, Cooldown: 60 },
			tooltipNotes: [],
			tags: [],
			stateTags: [],
			description:
				"You can hack a guard's radio to cause a disturbance, stopping and distracting them, pausing any action they are doing. You must have a line of sight to the guard to hack them.\r\n\r\nThe guard is distracted for {DistractTime} {DistractTime}|plural(second,seconds), after which they will go back to their previous action. If the guard was escorting a player, the guard will go back to patrolling. If the guard was about to detain a player, the guard will go into Search mode instead.\r\n\r\nUsing this ability has a cooldown of {Cooldown} {Cooldown}|plural(second,seconds).",
			descriptionAced: null
		},
		'Signal Catch': {
			name: 'Signal Catch',
			type: 'mastery',
			values: {},
			tooltipNotes: [],
			tags: [],
			stateTags: [],
			description: "You can answer radios remotely if you have a line of sight to the guard's body.",
			descriptionAced: null
		}
	},
	{
		Tactician: {
			name: 'Tactician',
			type: 'main',
			values: { IncreasedAreaOfEffect: '20%' },
			tooltipNotes: ['edge'],
			tags: ['gain edge'],
			stateTags: ['basic-gain edge'],
			description: 'Whenever you stun or stagger an enemy, gain [sk-edge]EDGE[/].',
			descriptionAced: 'Your flashbang and smoke grenade area of effect is increased by {IncreasedAreaOfEffect}.'
		},
		'Crowd Control': {
			name: 'Crowd Control',
			type: 'basic',
			values: {},
			tooltipNotes: [],
			tags: [],
			stateTags: [],
			description:
				'Civilians affected by your flashbang will cower for a duration that is twice as long as if you had shouted them down.\r\n\r\nCivilians affected by your smoke grenade will stop moving unless you order them to follow you.',
			descriptionAced: null
		},
		'Coup de grâce': {
			name: 'Coup de grâce',
			type: 'basic',
			values: { ExtraDamage: '5%' },
			tooltipNotes: ['edge'],
			tags: ['require edge'],
			stateTags: ['basic-require edge'],
			description:
				'If you have [sk-edge]EDGE[/], you will deal {ExtraDamage} more damage when you shoot a staggered or stunned enemy.',
			descriptionAced: null
		},
		Discombobulate: {
			name: 'Discombobulate',
			type: 'basic',
			values: { DecreasedDamageAmount: '40%', DecreasedDamageDuration: 5 },
			tooltipNotes: [],
			tags: [],
			stateTags: [],
			description:
				'Enemies affected by your flashbangs suffer a {DecreasedDamageAmount} damage debuff for the duration of the stun and for {DecreasedDamageDuration} {DecreasedDamageDuration}|plural(second,seconds) seconds after it wears off.\r\n\r\nEnemies affected by your smoke grenade suffer a {DecreasedDamageAmount} damage debuff while in the smoke, and it has a duration of {DecreasedDamageDuration} {DecreasedDamageDuration}|plural(second,seconds) seconds after they have escaped the smoke.',
			descriptionAced: null
		},
		Expose: {
			name: 'Expose',
			type: 'basic',
			values: {},
			tooltipNotes: [],
			tags: [],
			stateTags: [],
			description:
				'Shots fired at enemies affected by your flashbang will ignore armor for as long as they are stunned.',
			descriptionAced: null
		},
		Scramble: {
			name: 'Scramble',
			type: 'mastery',
			values: { IncreasedDuration: '20%' },
			tooltipNotes: [],
			tags: [],
			stateTags: [],
			description: 'Any stun effects you apply last {IncreasedDuration} longer.',
			descriptionAced: null
		}
	},
	{
		Strategist: {
			name: 'Strategist',
			type: 'main',
			values: { AdditionalMark: 1, MarkDuration: '20%' },
			tooltipNotes: [],
			tags: [],
			stateTags: [],
			description:
				'You can mark {AdditionalMark} additional {AdditionalMark}|plural(target,targets).\r\n\r\nYour marks last {MarkDuration} longer.',
			descriptionAced:
				'You can mark {AdditionalMark} additional {AdditionalMark}|plural(target,targets).\r\n\r\nYour marks last {MarkDuration} longer.'
		},
		'Combat Marking': {
			name: 'Combat Marking',
			type: 'basic',
			values: { ExtraDamage: '10%' },
			tooltipNotes: ['edge'],
			tags: ['require edge'],
			stateTags: ['basic-require edge'],
			description:
				'As long as you have [sk-edge]EDGE[/], you deal an extra {ExtraDamage} damage against any marked target.',
			descriptionAced: null
		},
		'Threat Assessment': {
			name: 'Threat Assessment',
			type: 'basic',
			values: { DamageReduction: '10%' },
			tooltipNotes: ['grit'],
			tags: ['require grit'],
			stateTags: ['basic-require grit'],
			description:
				'As long as you have [sk-grit]GRIT[/], you take {DamageReduction} less damage from any marked target.',
			descriptionAced: null
		},
		Misdirect: {
			name: 'Misdirect',
			type: 'basic',
			values: {},
			tooltipNotes: ['rush'],
			tags: ['require rush'],
			stateTags: ['basic-require rush'],
			description:
				'As long as you have [sk-rush]RUSH[/], any marked Cloaker or Zapper that tries to disable you will instead suffer a heavy stagger.',
			descriptionAced: null
		},
		'Marked For Death': {
			name: 'Marked For Death',
			type: 'mastery',
			values: { Range: 5, Duration: 5 },
			tooltipNotes: [],
			tags: [],
			stateTags: [],
			description:
				'Whenever you are downed or disabled by an enemy, that enemy and up to 5 enemies within {Range} {Range}|plural(meter,meters) of you are marked.',
			descriptionAced: null
		}
	},
	{
		'CQC Specialist': {
			name: 'CQC Specialist',
			type: 'main',
			values: {},
			tooltipNotes: ['grit', 'rush'],
			tags: ['gain grit', 'refresh grit', 'gain rush', 'refresh rush'],
			stateTags: ['aced-gain grit', 'aced-refresh grit', 'basic-gain rush', 'basic-refresh rush'],
			description: 'Whenever you perform a takedown, gain or refresh [sk-rush]RUSH[/].',
			descriptionAced: 'Whenever you grab a human shield, gain or refresh [sk-grit]GRIT[/].'
		},
		'Soft Assets': {
			name: 'Soft Assets',
			type: 'basic',
			values: { IncreasedSpeed: '5%' },
			tooltipNotes: [],
			tags: [],
			stateTags: [],
			description:
				"When you shove away a SWAT you're using as a human shield, gain extra ammo.\r\n\r\nYou move {IncreasedSpeed} faster while holding a human shield.",
			descriptionAced: null
		},
		Groundskeeper: {
			name: 'Groundskeeper',
			type: 'basic',
			values: { InteractSpeed: '20%' },
			tooltipNotes: [],
			tags: [],
			stateTags: [],
			description: 'You perform takedowns {InteractSpeed} faster.',
			descriptionAced: null
		},
		'Pin Puller': {
			name: 'Pin Puller',
			type: 'basic',
			values: { IncreasedSpeed: '5%' },
			tooltipNotes: ['grit'],
			tags: ['consume grit'],
			stateTags: ['basic-consume grit'],
			description:
				"If you have [sk-grit]GRIT[/] and shove a SWAT you held as a human shield, [sk-grit]GRIT[/] is consumed, and the SWAT's smoke grenade is triggered when they land. Only one grenade per SWAT can be triggered.\r\n\r\nYou move {IncreasedSpeed} faster while holding a human shield.",
			descriptionAced: null
		},
		'Savage Takedown': {
			name: 'Savage Takedown',
			type: 'basic',
			values: { Range: 5 },
			tooltipNotes: [],
			tags: [],
			stateTags: [],
			description:
				'Whenever you perform a takedown, any civilian within {Range} {Range}|plural(meter,meters) will immediately become intimidated.',
			descriptionAced: null
		},
		'Pressure Points': {
			name: 'Pressure Points',
			type: 'basic',
			values: {},
			tooltipNotes: [],
			tags: [],
			stateTags: [],
			description:
				"Corpses you've left after performing a takedown need to be examined in detail before civilians and guards realize they are dead.",
			descriptionAced: null
		},
		'Cover-Up': {
			name: 'Cover-Up',
			type: 'mastery',
			values: {},
			tooltipNotes: [],
			tags: [],
			stateTags: [],
			description: 'Taking down a guard will immediately also answer the radio.',
			descriptionAced: null
		}
	}
]

function replaceAll(skill: Skill) {
	Object.entries(skill.values).forEach(([key, value]) => {
		skill.description = replacePlural(skill.description, key, value)
		skill.description = replaceValues(skill.description, key, value)
		if (skill.descriptionAced) {
			skill.descriptionAced = replacePlural(skill.descriptionAced, key, value)
			skill.descriptionAced = replaceValues(skill.descriptionAced, key, value)
		}
	})
	skill.description = replacePlaceholders(skill.description)
	if (skill.descriptionAced) {
		skill.descriptionAced = replacePlaceholders(skill.descriptionAced)
	}
}

function replacePlural(text: string, key: string, value: string | number) {
	if (!text.includes(`{${key}}|plural`)) return text
	const [, words] = text.split(`{${key}}|plural(`)
	const [single, plural] = words.split(')')[0].split(',')
	const replace = `{${key}}|plural(${single},${plural})`
	return text.replaceAll(replace, parseFloat(value.toString()) <= 1 ? single : plural)
}

function replaceValues(text: string, key: string, value: string | number) {
	return text.replaceAll(`{${key}}`, `[sk-val]${value}[/]`)
}

const placeholders = [
	['[sk-state]', '<span class="skill-state">'],
	['[sk-val]', '<span class="skill-val">'],
	['[sk-edge]', '<span class="skill-bonus-edge">'],
	['[sk-grit]', '<span class="skill-bonus-grit">'],
	['[sk-rush]', '<span class="skill-bonus-rush">'],
	['[/]', '</span>']
]

function replacePlaceholders(text: string) {
	placeholders.forEach(([a, b]) => {
		text = text.replaceAll(a, b)
	})
	return text
}

skills.forEach(category => {
	Object.values(category).forEach(skill => {
		replaceAll(skill)
	})
})

export default skills
