const mailer = require('nodemailer');
const router = require('express').Router();
const UserModel = require('../models/user');
const MessageModel = require('../models/message');

const smtp_user = "james@82cfcccfd82ac9a7.maileroo.org"
const smtp_pass = "1e7be787ed5af928bdda6647";

const transporter = mailer.createTransport({
  host: "smtp.maileroo.com",
  port: 587,
  secure: false,
  auth: {
    user: smtp_user, // your full outlook email
    pass: smtp_pass, // password or app password
  },
  requireTLS: true
});

transporter.verify((err) => {
  if (err) {
    console.error('SMTP ERROR:', err);
  } else {
    console.log('SMTP READY');
  }
});

const sendMail = async (to, subject, text) => {
    return await transporter.sendMail({
        envelope: {
            from: 'no-reply@82cfcccfd82ac9a7.maileroo.org',
            to
        },
        from: '"Angular MVP App" <no-reply@82cfcccfd82ac9a7.maileroo.org>',
        to,
        subject,
        text
    });
}

router.post("/users", async (req, res) => {
    let { email } = req.body;
    let users = await UserModel.find({});
    res.send({
        success:true,
        users: users.filter((value) => value.email != email)
    })
})

router.post("/send-code", async (req, res) => {
    let { email } = req.body;
    let user = await UserModel.findOne({email});

    let random = Math.random() * 1e6;
    let code = random.toFixed(0).padStart(6, "0");
    let result = await sendMail(email, "Verify Email", `Verification Code ${code}`);

    user.code = code;
    await user.save();
    
    if(result.accepted.length === 1 && result.rejected.length === 0){
        res.send({success: true});
    } else {
        res.send({success: false});
    }
    
});

router.post("/verify-code", async (req, res) => {
    let { email, code } = req.body;
    let user = await UserModel.findOne({email});
    if (user != null && user.code === code){
        user.verified = true;
        user.active = true;
        await user.save();
        res.send({success: true, user});
    } else {
        res.send({success: false});
    }
})

router.post("/signup", async (req, res) => {
    let { email, firstname, lastname, password, plan, privilege } = req.body;
    let user = await UserModel.findOne({ email });
    if(user == null){
        user = new UserModel(req.body);
        await user.save();
        res.send({
            success: true,
            user: req.body
        })
    } else {
        res.send({
            success: false,
            msg: "already exist!"
        })
    }
});

router.post("/signin", async (req, res) => {
    let { email, password } = req.body;
    let user = await UserModel.findOne({ email });
    if(user != null && user.password === password){
        res.send({
            success: true,
            user
        })
    } else {
        res.send({success: false});
    }
});

router.post("/update", async (req, res) => {
    let { email } = req.body;
    let user = await UserModel.findOneAndUpdate({ email }, { ...req.body });
    res.send({
        success: true,
        user: { ...user, ...req.body }
    })
})

router.post("/udpate-msg", async (req, res) => {
    let { _id, content } = req.body;
    await MessageModel.findByIdAndUpdate(_id, { content });
    res.send({success: true});
})

module.exports = router;