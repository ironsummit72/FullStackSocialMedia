export default class ApiResponse {
	constructor(status, code, data, message, redirectUrl) {
		this.status = status
		this.code = code
		this.data = data
		this.message = message
		this.redirectUrl = redirectUrl
	}
}
