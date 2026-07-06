class ApiError extends Error {
    constructor(
        statusCode,
        message = "Something went worng",
        error = [],
        stack = ""
    ){
        super(message)
        this.message = message;
        this.data = null;
        this.statusCode = statusCode;
        this.error = error;
        this.success = false;

        if(stack) {
            this.stack = stack
        } else {
            Error.captureStackTrace(this, this.constructor)
        }
    }
}

export { ApiError }