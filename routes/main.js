module.exports = function(app, obj, randomString) {
    app.get("/", function(req, res){
        res.send("Hello");
    });
}
