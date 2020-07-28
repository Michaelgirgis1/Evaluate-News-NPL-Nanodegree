
function validateInputRequest(req, res, next) {
    if(!req.body.text ) { // check for input validation
        return res.status(400).json({
           message: 'Invalid input'
        })
    } 
    return next();
}


exports.validateInputRequest = validateInputRequest;
