const router = require('express').Router();
const {User,Post,Comment}= require('../../models');
const sequelize = require('../../config/connection');

router.get('/',(req,res)=>
{
    Post.findAll(
        {
            include:[{model: User, through: Post.user_id}] 
        }
    )
    .then(data=>res.json(data))
    .catch(err => 
    {
        console.log(err);
        res.status(500).json(err);
    });
});

//express router get findOne Post and User user_name  by Post.user_id
//attributes: { exclude: ['password'] }
router.get('/:id', async (req, res) => {
    try {
      let data = await Post.findByPk(req.params.id, {
        include:[{model: User, through: Post.user_id}] 
        
      });
      if(!data) {
        res.status(404).json({message: "Error 404 - Post Not Found"});
        return;
      }
      res.status(200).json(data);
    } catch(error) {
      res.status(500).json(error);
    }
  });

router.get('/:id_using_where',(req,res)=>
{
    Post.findOne(
    {
        where: 
        {
            id : req.params.id
        }
        , include:[{model: User, through: Post.user_id}] 
        
    })
    .then(data=>res.json(data))
    .catch(err => 
    {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/',(req,res)=>
{
    Post.create({
        title:req.body.title,
        body:req.body.body,
        user_id:req.session.user_id
    })
    .then(data=>res.json(data))
    .catch(err => 
    {
        console.log(err);
        res.status(500).json(err);
    });
});

router.put('/:id',(req,res)=>
{
    Post.update(req.body,
        {
            where:
            {
                id: req.params.id
            }
        })
    .then(data=>res.json(data))
    .catch(err => 
    {
        console.log(err);
        res.status(500).json(err);
    });
});

router.delete('/:id',(req,res)=>
{
    Post.destroy({
            where:
            {
                id: req.params.id
            }
        })
    .then(data=>res.json(data))
    .catch(err => 
    {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;