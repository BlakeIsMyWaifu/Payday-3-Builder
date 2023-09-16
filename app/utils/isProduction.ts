/**
 * Can only be used on the server
 */
export default function isProduction() {
	return process.env.NODE_ENV === 'production'
}
