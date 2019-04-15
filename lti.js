const express = require('express');
const router = express.Router();

const lti = require('ims-lti');

router.post("*", require('body-parser').urlencoded({extended:true}));

router.post('/',(req, res, next)=>{
    const provider = new lti.Provider('top','secret');

    provider.valid_request(req, (err, isValid) => {
        if(isValid){            
            if(provider.body.roles.includes('Instructor') ){
                res.redirect(301, '/homeTeacher');
            }else{
                res.redirect(301, '/homeStudent');
            }            
        }else{
            next(err);
        }
    });
});

module.exports = router;