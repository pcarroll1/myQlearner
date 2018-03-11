var express    =    require('express');
var app        =    express();

require('./routes/main')(app);
app.set('bin',__dirname + '/bin');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(express.static('public'));

var server     =    app.listen(8081,function(){
console.log("Express is running on port 8081");
});
