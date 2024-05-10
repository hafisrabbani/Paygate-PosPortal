exports.exceptionHandler = async (err, req, res, next) => {
    const MODE = process.env.NODE_ENV;

    if (MODE === 'production') {
        return res.status(500).json({
            message: 'Internal server error',
        });
    }

    return res.status(500).json({
        message: err.message,
        stack: err.stack,
    });
}

exports.errorHandler = async (err, req, res, next) => {
    const {
        type,
    } = err;

    switch (type) {
        case 'NotFoundError':
            return res.status(404).json({'message': 'Data not found'});
        case 'UnauthorizedError':
            return res.status(401).json({'message': 'Unauthorized'});
        case 'BadRequestError':
            return res.status(400).json({'message': 'Bad request'});
        case 'DuplicateError':
            return res.status(400).json({'message': 'Duplicate data'});
        case 'ValidationError':
            return res.status(400).json({'message': 'Validation error'});
        default:
            return res.status(500).json({'message': 'Internal server error'});
    }
}