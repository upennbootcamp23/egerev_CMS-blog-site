const router = require('express').Router();
const {Post,User,Comment} = require('../models');
const withAuth = require('../utils/auth');

router.get('/',(req,res)=>
{
    Post.findAll(
    {
        include:
        {
            model: User
        }
    })
    .then(data=>
    {
        const posts = data.map(post => post.get({ plain: true }) );
        const task = "comments";
        res.render('homepage',{posts,loggedIn:req.session.loggedIn,task:task});
    })
    .catch(err => 
    {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/login', (req, res) => {
    
    res.render('login');
});

router.get('/signup', (req, res) => {
    
    res.render('signup');
});

router.get('/dashboard',withAuth, (req, res) => {
    Post.findAll(
        {
            where:
            {
                user_id:req.session.user_id
            },
            include:
            {
                model: User
            }
        })
        .then(data=>
        {
            const posts = data.map(post => post.get({ plain: true }) );
            const task = "create";
            res.render('dashboard',{posts,username:req.session.username,loggedIn:req.session.loggedIn,task:task});
        })
        .catch(err => 
        {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/dashboard/edit/:id',withAuth, (req, res) => {
    Post.findOne(
        {
            where:
            {
                user_id:req.session.user_id,
                id:req.params.id
            },
            include:
            {
                model: User
            }
        })
        .then(data=>
        {
            const post = data.get({ plain: true });
            const task = "edit";
            res.render('edit-post',{post,username:req.session.username,loggedIn:req.session.loggedIn,task:task,edit:true});
        })
        .catch(err => 
        {
            console.log(err);
            res.status(500).json(err);
        });
});


router.get('/posts/:id', (req, res) => {
    Post.findOne(
        {
            where:
            {
                id:req.params.id
            },
            include:
            [
                {
                    model:User
                },
                {
                    model:Comment,
                    include:
                    {
                        model:User
                    }
                }
            ]

        })
        .then(data=>
        {
            const post = data.get({ plain: true });
            console.log(post);
            res.render('single-post',{post, username:req.session.username, loggedIn:req.session.loggedIn});
        })
        .catch(err => 
        {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/posts/add-comment/:id',withAuth, (req, res) => {
    
    Post.findOne(
        {
            where:
            {
                id:req.params.id
            },
            include:        
            {
                model:User
            }
        })
        .then(data=>
        {
            const post = data.get({ plain: true });
            res.render('add-comment',{post, username:req.session.username, loggedIn:req.session.loggedIn});
        })
        .catch(err => 
        {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;