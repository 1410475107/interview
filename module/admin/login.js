module.exports = function () {
    let router = express.Router();
    //路由处理
    router.get('/', (req ,res)=>{
        res.render('admin/login');
    });

    //处理登录验证
    router.post('/', (req ,res)=>{
        let sql = 'SELECT aid, username, passwd FROM admin WHERE username = ? LIMIT 1';
        mydb.query(sql, req.body.username, (err, result)=>{
            //系统性错误
            if(err){
                res.json({r:'db_error'});
                return;
            }
            //检查是否存在
            if(0==result.length){
                res.json({r:'username_not_exist'});
                return;
            }
            //检查密码正确性
            if(md5(req.body.passwd) != result[0].passwd){
                res.json({r:'passwd_error'});
                return;
            }
            //SESSION处理
            req.session.aid = result[0].aid;
            req.session.username = result[0].username;
            //更新登录信息
            let upsql = 'UPDATE admin SET loginnum = loginnum + 1, lastlogin = ?, ip = ? WHERE aid = ? LIMIT 1';
            mydb.query(upsql, [new Date().toLocaleString(), req.ip, result[0].aid], (err, r)=>{
                if(err){
                    console.log(err);
                }
                res.json({r:'ok'});
            });
        });
    })

    return router;
}