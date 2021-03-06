module.exports = function () {
    let router = express.Router();

    router.get('/', (req ,res)=>{
        //个人信息
        res.render('index',{
            //个人信息
            username:req.session.username,
            header:req.session.header
        });
    });

    //注册页面
    router.get('/reg', (req ,res)=>{
        res.render('reg', {title:'注册页面'});
    });

    //处理注册的数据
    router.post('/reg', (req ,res)=>{
        //检查账号是否已经存在
        let p = req.body;
        if(!p.passwd){
            res.json({r:'passwd_no'});
            return ;
        }
        let sql = `SELECT uid FROM user WHERE username = ? LIMIT 1`;
        mydb.query(sql, p.username, (err, result)=>{
            if(result.length){
                res.json({r:'username_existed'});
            }else{
                let sql = 'INSERT INTO user(username, passwd, tel, email, ip, regtimes) VALUES (?,?,?,?,?,?)';
                mydb.query(sql, [p.username, md5(p.passwd), p.tel, p.email, req.ip, new Date().toLocaleString()], (err, result)=>{
                    if(err){
                        res.json({r:'db_err'});
                    }else{
                        res.json({r:'success'});
                    }
                });
            }
        });
    });


    //登录页面
    router.get('/login', (req ,res)=>{
        res.render('login', {title:'登录', href:req.query.href});
    });
    //退出登录
    router.get('/logout', (req ,res)=>{
        delete req.session.uid;
        delete req.session.username;
        delete req.session.header;
        res.redirect('/login');
    });
    //登录验证
    router.post('/login', (req ,res)=>{
        //验证验证码是否正确
        let q = req.body;
        if(req.session.captcha.toLowerCase() != q.coder.toLowerCase()){
            res.json({r:'coder_err'});
            return ;
        }
        //验证账号或者手机号是否存在
        let sql = `SELECT uid, username, passwd, tel, header FROM user WHERE username = ? OR tel = ? LIMIT 1`;
        mydb.query(sql, [q.username, q.username], (err, result)=>{
            console.log(err);
            if(!result.length){
                res.json({r:'not_exist'});
                return ;
            }
            //验证密码是否正确
            if(md5(q.passwd) != result[0].passwd){
                res.json({r:'pw_err'});
                return ;
            }
            console.log(result[0].header);
            //登录成功后做什么事情
            req.session.uid = result[0].uid;
            req.session.username = result[0].username;
            req.session.header = result[0].header;
            //更新个人登录信息
            let upsql = 'UPDATE user SET loginnum = loginnum + 1, ip=?, lasttimes=? WHERE uid = ?';
            mydb.query(upsql, [req.ip, new Date().toLocaleString(), result[0].uid], (err, result)=>{
                res.json({r:'ok', url:req.body.href});
            });
        });
    });


    //验证码
    router.get('/coderimg', (req ,res)=>{
        var captcha = svgCaptcha.create({
            size:4,
            ignoreChars: '0o1i',
            noise:5,
            color:true,
            background: '#cc9966',
            width:100,
            height:34
        });
        req.session.captcha = captcha.text;
        
        res.type('svg');
        res.status(200).send(captcha.data);
    })


    return router;
}