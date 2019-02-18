const jwt = require('jsonwebtoken');

// if Authentication is successful, call next, if not, fail
module.exports = (req, res, next) => {
    if (process.env.AUTH_MODE == "dev") {
        next();
    }
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_KEY, null);
        req.userData = decoded;
        if (decoded.admin === true) {
            next();
        }
    } catch(error) {
        return res.status(401).json({
            message: 'Auth failed'
        })
    }
};