const User = require('../models/user');

module.exports = async (request, response, next) => {

    // Get the user ID and user route ID
    const userId = request.userId;
    const routeId = parseInt(request.params.userId, 10);

    try {
        // Test if user ID matches with route ID 
        // If so, allow access to the requested route
        const user = await User.findById(userId);
        if (user.id && (userId === routeId)) next();

        else response.redirect('/login');

    } catch (error) {
        response.status(401).json(error.message);
    }
}