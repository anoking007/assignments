const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const { Admin }=require("../db/index.js")
const { Course }=require("../db/index.js")
// Admin Routes
router.post('/signup', async (req, res) => {
    // Implement admin signup logic
    const username=req.body.username;
    const password=req.body.password;
    await Admin.create({
        username:username,
        password:password,
    })

    res.json({
        msg:"Admin created successfully"
    })

});

router.post('/courses', adminMiddleware, async(req, res) => {
    // Implement course creation logic
    const title=req.body.title;
    const description=req.body.description;
    const price=req.body.price;
    const imageLink=req.body.imageLink;
    const newCourse= await Course.create({
        title,
        description,
        price,
        imageLink
    })

    res.json({
        message: 'Course created successfully', 
        courseId: newCourse._id,
    })
});

router.get('/courses', adminMiddleware, (req, res) => {
    // Implement fetching all courses logic
    

    Course.find({}).then((respond)=>{
        req.json({
            Course:respond,
        })
    })
});

module.exports = router;