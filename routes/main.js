module.exports = function(app)
{
     app.get('/',function(req,res){
        res.render('OpeningPage.html')
     });
     app.get('/CourseReference',function(req,res){
        res.render('CourseReference.html');
    });
     app.get('/TestPage',function(req,res){
        res.render('TestPage.html');
    });
    app.get('/TestMenu',function(req,res){
        res.render('TestMenu.html');
    });
    app.get('/OpeningPage',function(req,res){
        res.render('OpeningPage.html')
    });
}
