const isAdmin = (req, res, next) => {
    // After the user is signed in, there should be a session variable called req.session.admin
    // If the user is not an admin, it will be false
    // If the user is an admin, it will be true 
    if(!req.session.admin) {
        res.redirect('/')
    } else {
        next();
    }
}

module.exports = isAdmin; 