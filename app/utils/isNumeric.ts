export default function isNumeric(number: string) {
	return !isNaN(parseFloat(number)) && isFinite(+number)
}
