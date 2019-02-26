const jwt = require('jsonwebtoken');

// if Authentication is successful, call next, if not, fail
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_KEY, null);
        res.locals.userData = decoded;
        next();
    } catch(error) {
        return res.status(401).json({
            message: 'Auth failed'
        })
    }
};