const errorHandler = (error, req, res, next) => {
    console.error(error);
    if (error.code === 401) {
        res.status(error.code).render('loginPage', {
            data: {
                errorMessage: error.message,
                btnText: 'SUBMIT',
                URL: 'http://localhost:7777/login/',
                method: 'post',
            },
        })
    } else if (error.code === 400) {
        if (error.title === 'login') {
            res.status(error.code).render('loginPage', {
                data: {
                    inputs: req.body.userName,
                    errorMessage: error.message,
                    btnText: 'SUBMIT',
                    URL: 'http://localhost:7777/login/',
                    method: 'post',
                },
            })
        }
    } else if (error.code === 500 || error.code === 501) {
        console.error("server Error: " + error.message + ": " + error.code);
        res.status(STATUS_CODES.INTERNAL_SERVER).json({ success: false, message: "Something went wrong! please try again later." });
    } else {
        res.status(STATUS_CODES.INTERNAL_SERVER).json({ success: false, message: "Something went wrong! please try again later." });
    }

};

module.exports = errorHandler;
