module.exports = function () {
    let router = express.Router();

    router.get('/', (req ,res)=>{
        res.render('index');
    });

    //注册页面
    router.get('/reg', (req ,res)=>{
        res.render('reg');
    });

    //处理注册的数据
    router.post('/reg', (req ,res)=>{
        //检查账号是否已经存在
        let p = req.body;
        let sql = `SELECT uid FROM user WHERE username = ? LIMIT 1`;
        mydb.query(sql, p.username, (err, result)=>{
            if(result.length){
                res.json({r:'username_existed'});
            }else{
                let sql = 'INSERT INTO user(username, passwd, tel, email, ip, regtimes) VALUES (?,?,?,?,?,?)';
                mydb.query(sql, [p.username, md5(p.passwd), p.tel, p.email, req.ip, new Date().toLocaleString], (err, result)=>{
                    if(err){
                        res.json({r:'db_err'});
                    }else{
                        res.json({r:'success'});
                    }
                });
            }
        });
    });


    return router;
}