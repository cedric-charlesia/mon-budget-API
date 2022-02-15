module.exports = async (request, response, next) => {

    // Get the user ID and user route ID
    const userId = request.userId;
    const routeId = parseInt(request.params.userId, 10);

    try {
        // Test if user ID matches with route ID 
        // If so, allow access to the requested route
        if (userId === routeId) next();

        else response.redirect('/');

    } catch (error) {
        response.status(401).json(error.message);
    }
}