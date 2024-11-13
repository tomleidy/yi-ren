const errorHandler = (err, req, res, next) => {
    console.error(err.stack);

    // Handle specific error types
    if (err.name === 'ValidationError') {
        return res.status(400).json({
            error: 'Validation Error',
            details: err.message
        });
    }

    if (err.name === 'UnauthorizedError') {
        return res.status(401).json({
            error: 'Unauthorized',
            details: err.message
        });
    }

    // Default error
    res.status(err.status || 500).json({
        error: err.message || 'Internal Server Error'
    });
};

module.exports = errorHandler;