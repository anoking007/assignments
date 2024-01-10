const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const{ User,Course }=require("../db/index.js")
// User Routes
router.post('/signup', async(req, res) => {
    // Implement user signup logic
    const username=req.body.username;
    const password=req.body.password;
    await User.create({
        username:username,
        password:password,
    })

    res.json({
        msg:"User created successfully"
    })
});

router.get('/courses', (req, res) => {
    // Implement listing all courses logic
    const username=req.body.username;
    const password=req.body.password;
    Course.find({}).then((result)=>{
        res.json({
            "Courses":result,
        })
    })
});

router.post('/courses/:courseId', userMiddleware, (req, res) => {
    // Implement course purchase logic
    const courseId=req.params.courseId;
    const username=req.headers.username;
    User.findOne({
        username,
    },{
        "$push":{purchasedCourses:courseId}
    }).then(()=>{
        res.json({
            message: "Purchase complete!"
        })
    })
    
});

router.get('/purchasedCourses', userMiddleware, (req, res) => {
    // Implement fetching purchased courses logic
    const users= User.findOne({username:req.headers.username}).then((result)=>{
        return result.purchasedCourses
    })
    console.log(users);
    Course.find({
        _id:{
            "$in":users,
        }
    }).then((courses)=>{
        res.json({
            "courses":courses
        })
    })
});

module.exports = router