  
module.exports = (requiredRole) => {
    return (req, res, next) => {
      // Check if the user has the required role
      if (req.user.role === requiredRole || req.user.role === 'Admin') {
        next(); 
      } else {
        return res.status(403).json({ error: 'Forbidden: You are not authorized.' });
      }
    };
  };