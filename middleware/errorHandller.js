const errorHandler = (error, req, res, next) => {
    console.log(error.code);
    
};

module.exports = errorHandler;
