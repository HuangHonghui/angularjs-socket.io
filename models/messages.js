/**
 * Created by huanghonghui on 14-7-21.
 */

var mongoose = require("mongoose"),
    Schema = mongoose.Schema;

var MessagesSchema = Schema({
    userName: String,
    body:String,
    created: {type:Date, default:Date.now}
});

var Messages = mongoose.model("Messages", MessagesSchema);

module.exports = Messages;