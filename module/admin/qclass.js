module.exports = function () {
    let router = express.Router();
    //判断是否登录
    router.use((req, res, next)=>{
        if(!req.session.aid){
            res.redirect('/admin/login');
            return ;
        }
        next();
    });

    //路由处理
    router.get('/', (req ,res)=>{
        //查询所有的分类并显示到页面
        let sql = 'SELECT * FROM qclass WHERE status = 0';
        mydb.query(sql, (err, result)=>{
            res.render('admin/qclist', {qclist:result});
        });
    });

    
    router.get('/update', (req ,res)=>{
        //查询所有的分类并显示到页面
        let sql = 'SELECT * FROM qclass WHERE status = 0 AND qcid = ? LIMIT 1';
        mydb.query(sql, req.query.qcid, (err, result)=>{
            res.render('admin/update', {qclass:result[0]});
        });
    });

    //添加的页面路由
    router.get('/add', (req ,res)=>{
        res.render('admin/addqclass');
    });
    //添加数据处理，把数据保存到数据库
    router.post('/addclasssubmit',(req ,res)=>{
        let sql = 'INSERT INTO qclass(qcname, aid, username, addtimes) VALUES(?,?,?,?)';
        mydb.query(sql, [req.body.qcname, req.session.aid, req.session.username, new Date().toLocaleString()],(err, result)=>{
            if(err){
                console.log(err);
                res.json({r:'db_err'});
                return ;
            }
            res.json({r:'ok'});
        });
    });

    
    router.post('/updatesubmit',(req ,res)=>{
        let sql = 'UPDATE qclass SET qcname = ?, updatetimes = ? WHERE qcid=? LIMIT 1';
        mydb.query(sql, [req.body.qcname, new Date().toLocaleString(), req.body.qcid],(err, result)=>{
            if(err){
                console.log(err);
                res.json({r:'db_err'});
                return ;
            }
            res.json({r:'ok'});
        });
    });

    router.post('/del', (req ,res)=>{
        // let sql = 'DELETE FROM qclass WHERE qcid = ?';
        let sql = 'UPDATE qclass SET status = 1 WHERE qcid = ?';
        mydb.query(sql, req.body.qcid, (err, result)=>{
            if(err){
                res.json({r:'db_err'});
                return ;
            }
            res.json({r:'ok'});
        });

    });

    return router;
}