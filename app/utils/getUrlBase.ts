/** Must be used on the server */
export default function getUrlBase() {
	let url = process?.env?.VERCEL_BRANCH_URL ?? 'http://localhost:3000/'
	url = url.includes('http') ? url : `https://${url}`
	return url.charAt(url.length - 1) === '/' ? url : `${url}/`
}
