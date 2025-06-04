const isAuthenticated = (req, res, next) => {
    if (req.session.user === undefined) {
        return res.status(404).json("You do not have access");
    }
    next();
};

module.exports = {
    isAuthenticated
};