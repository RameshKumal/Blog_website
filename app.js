const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogroutes = require('./routers/blogroutes')
const { render } = require('ejs');
//express app 
const app = express();

//database connection
const dburi = process.env.DB_URI;
mongoose.connect(dburi)
.then((result) => app.listen(3000))//listen request 
.catch((err) => console.log(err));
//register view engine
app.set('view engine', 'ejs');// app.set('views', 'myviews');if not def


// listen for request

//custom middleware
// app.use((req,res, next) => {
//     console.log('New request made: ');
//     console.log('host: ',req.hostname);
//     console.log('path: ', req.path);
//     console.log('method: ', req.method);
//     next();
// });

// app.use((req, res, next) =>{
//     console.log('In the next middleware.')
//     next();
// });

app.use(morgan('dev'))
app.use(express.urlencoded({extended : true}))
app.use(express.static('public'))


app.get('/', (req, res) =>{
    res.redirect('/blogs');
})

app.get('/about', (req, res) =>{
    res.render('about', {title : 'About'});
})

//blog route
app.use('/blogs', blogroutes)



//404 page
app.use((req, res) =>{//use function is middleware .
    res.status(404).render('404', {title : '404'});
})
