const createError = require("http-errors");

exports.notFound = (req, res, next) => {
    next(createError(404, "Route not found"));
};

exports.logError = (err) => {
    console.error("🔥 ERROR LOG →", {
        message: err.message,
        status: err.status,
        code: err.code,
        stack: err.stack
    });
}

exports.formatErrorResponse = (err) => ({
    success: false,
    status: err.status || 500,
    message: err.message || "Internal Server Error",
});

exports.errorHandler = (err, req, res, next) => {
    exports.logError(err);

    if (err.name === "JsonwebTokenError") {
        err.status = 401;
        err.message = "Token tidak valid atau sudah kadaluarsa";
    }

    if (err.code === "ER_DUP_ENTRY") {
        err.status = 409;
        err.message = "Data sudah ada";
    }

    if (err.code === "ECONNREFUSED") {
        err.status = 503;
        err.message = "Database tidak terhubung";
    }

    const response = exports.formatErrorResponse(err);
    res.status(response.status).json(response);
}