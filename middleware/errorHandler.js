exports.exceptionHandler = async (err, req, res, next) => {
    const MODE = process.env.NODE_ENV;

    if(MODE === 'production') {
        return res.status(500).json({
            message: 'Internal server error',
        });
    }

    return res.status(500).json({
        message: err.message,
        stack: err.stack,
    });
}