const User = require('../models/user');

module.exports = {
    registerUser: async (request, response) => {
    
        const user = new User(request.body);
    
        try {
            await user.save();
                response.status(201).json(user);
        } catch (error) {
            
        }
    
    }
}