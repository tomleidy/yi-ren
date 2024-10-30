// verifyUser, verifyAdmin,

function verifyUser(req, res, next) { next(); }
function verifyAdmin(req, res, next) { next(); }


module.exports = {
    verifyUser,
    verifyAdmin
}