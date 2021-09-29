const isAdmin = (req, res, next) => {
    // After the user is signed in, there should be a session variable called req.session.admin
    // If the user is not an admin, it will be false
    // If the user is an admin, it will be true 
    const adminCheck = req.session.admin; 
    if(adminCheck) {
        res.redirect('/')
    } else {
        next();
    }
}