const isAuthenticated = (req, res, next) => {
    if (!req.session?.passport?.user) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    next();
};

const isAdmin = (req, res, next) => {
    if (!req.session?.passport?.user) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    // Get user from session and check admin status
    const userId = req.session.passport.user._id;
    User.findById(userId)
        .then(user => {
            if (!user?.admin) {
                return res.status(403).json({ error: "Forbidden" });
            }
            next();
        })
        .catch(err => {
            next(err);
        });
};

module.exports = {
    isAuthenticated,
    isAdmin
};