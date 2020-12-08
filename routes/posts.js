const express = require ("express");
const router = express.Router()
verify = require("./verify")

router.get("/",verify,(req,res) => {
    /*res.json({
       posts:{
           title:"in italia",
           description:"forza italia forza juve forza bianconeri"
       } 
    });*/
    res.send(req.user);
});

module.exports = router;