const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');
const path = require('path');
const methodOverride = require('method-override');

const app = express();


mongoose.connect('mongodb://127.0.0.1:27017/batApp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Database Connected'))
.catch(err => console.log(err));


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

const sessionConfig = {
    secret: 'thisshouldbeabettersecret!',
    resave: false,
    saveUninitialized: true,
};

app.use(session(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
});

const batRoutes = require('./routes/bats');
const authRoutes = require('./routes/auth');

app.use('/bats', batRoutes);
app.use('/', authRoutes);

app.get('/', (req, res) => {
    res.redirect('/bats');
});

app.listen(3000, () => {
    console.log('Serving on port 3000');
});
