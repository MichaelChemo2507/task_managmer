const errorHandler = (error, req, res, next) => {
    console.error(error);
    console.log(error.code);
    if (error.code === 'ER_DUP_ENTRY') {
        if (error.sqlMessage.startsWith("Duplicate entry")) {
            res.status(400).render('registrationPage', {
                data: {
                    errorMessage: "user name already exist",
                    btnText: 'SUBMIT',
                    URL: 'http://localhost:7777/registration/',
                    LOGIN_URL: 'http://localhost:7777/login/',
                    method: 'post',
                },
            })
        }
    } else if (error.code === 403) {
        if (error.title === 'authentication_process') {
            res.status(error.code).render('loginPage', {
                data: {
                    errorMessage: error.message,
                    btnText: 'SUBMIT',
                    URL: 'http://localhost:7777/login/',
                    method: 'post',
                },
            })
        }
    } else if (error.code === 401) {
        res.status(error.code).render('loginPage', {
            data: {
                errorMessage: error.message,
                btnText: 'SUBMIT',
                URL: 'http://localhost:7777/login/',
                method: 'post',
            },
        })
    } else if (error.code === 400) {
        if (error.title === 'tasks') {
            res.status(400).render('tasksPage', {
            })
        }
        else if (error.title === 'users') {
            res.status(400).render('registrationPage', {
                data: {
                    errorMessage: error.message,
                    btnText: 'SUBMIT',
                    URL: 'http://localhost:7777/registration/',
                    LOGIN_URL: 'http://localhost:7777/login/',
                    method: 'post',
                },
            })
        } else if (error.title === 'login') {
            res.status(error.code).render('loginPage', {
                data: {
                    inputs: req.body.userName,
                    errorMessage: error.message,
                    btnText: 'SUBMIT',
                    URL: 'http://localhost:7777/login/',
                    method: 'post',
                },
            })
        } else {
            res.status(error.code).json({ success: false, message: error.message })
        }
    } else if (error.code === 500 || error.code === 501) {
        console.error("server Error: " + error.message + ": " + error.code);
        res.status(STATUS_CODES.INTERNAL_SERVER).json({ success: false, message: "Something went wrong! please try again later." });
    } else {
        res.status(STATUS_CODES.INTERNAL_SERVER).json({ success: false, message: "Something went wrong! please try again later." });
    }

};

module.exports = errorHandler;
