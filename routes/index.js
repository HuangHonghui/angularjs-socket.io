/**
 * Created by huanghonghui on 14-7-12.
 *
 * 路由文件
 */
var express = require("express");
var router = express.Router();


/* 首页路由 */
router.get("/", function(req,res){
    res.render("index", {title:"首页"});
});

router.get("/partials/:name", function(req,res){
    var name = req.params.name;
    res.render("partials/"+name, {title:"首页"});
});

module.exports = router;