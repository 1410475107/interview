module.exports = function () {
    let router = express.Router();
    //路由处理
    router.get('/', (req ,res)=>{
        //查询所有的分类并显示到页面
        let sql = 'SELECT * FROM qclass WHERE 1';
        mydb.query(sql, (err, result)=>{
            res.render('admin/qclist', {qclist:result});
        });
        
    });

    //添加的页面路由
    router.get('/add', (req ,res)=>{
        res.render('admin/addqclass');
    });
    //添加数据处理
    router.post('/addclasssubmit',(req ,res)=>{
        let sql = 'INSERT INTO qclass(qcname, aid, username, addtimes) VALUES(?,?,?,?)';
        mydb.query(sql, [req.body.qcname, req.session.aid, req.session.username, new Date().toLocaleString()],(err, result)=>{
            if(err){
                res.json({r:'db_err'});
                return ;
            }
            res.json({r:'ok'});
        });
    });

    return router;
}