class ApiError extends Error{
    constructor(status, message) {
        super();
        this.status = status
        this.message = message
    }

    static badRequest(message) {
        return new ApiError(404, message)
    }

    static internal(message) {
        return new ApiError(500, message)
    }

    static forbidden(message) {
        return new ApiError(483, message)
    }

    static success(message) {
        return new ApiError(200, message)
    }

    static created(message) {
        return new ApiError(201, message)
    }

}

module.exports = ApiError;