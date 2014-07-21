/**
 * Created by huanghonghui on 14-7-13.
 */
app.controller("MainController",function(){

}).controller("AboutController",function(){

}).controller("ChatController",function($scope,socket){

        this.roomTitle = "309";
        $scope.messages = [];
        $scope.message = "";
    socket.on("init:msg",function(messages){
        console.log("init",messages);
        messages.map(function(item){
            $scope.messages.push({
                userName:item.userName,
                body:item.body,
                created: item.created
            });
        });
        $scope.messages = messages;
    });


        socket.on("new:msg", function(message){
            console.log("new");
            console.log(message);
            $scope.messages.push({
                userName:message.userName,
                body:message.body,
                created: message.created
            });
//            $scope.messages.push(message);
//            $scope.newMessage= {};
        });


    this.sendMessage = function(){
        console.log("send");
        socket.emit("send:msg", $scope.newMessage);
        $scope.newMessage.created = new Date();
        $scope.messages.push($scope.newMessage);
        var sendUser = $scope.newMessage.userName;
        $scope.newMessage = {userName:sendUser};
    };

});