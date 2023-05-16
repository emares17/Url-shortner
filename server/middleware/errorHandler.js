class RequestError extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;
    }
}

function errorHandler(err, req, res, next) {
    console.error(err.stack);

    if (err instanceof RequestError) {
        res.status(err.status).json({
            error: err.message,
            status: err.status
        });
    } else {
        res.status(500).json({
            error: 'Internal Server Error',
            status: 500
        });
    }
}

module.exports = { RequestError, errorHandler };