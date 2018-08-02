module.exports = function () {
    let router = express.Router();
    let qtable = 'questions';
    //判断是否登录
    router.use((req, res, next)=>{
        if(!req.session.aid){
            // res.redirect('/admin/login');
            // return ;
        }
        next();
    });

    //路由处理
    router.get('/', (req ,res)=>{
        //查询所有的试题并显示到页面
        let sql = `SELECT q.qid, q.qtitle, q.diff, q.import, q.addtimes, c.qcname 
                   FROM ${qtable} AS q 
                   LEFT JOIN qclass AS c ON q.qcid = c.qcid 
                   WHERE q.status = 0`;
        mydb.query(sql, (err, result)=>{
            res.render('admin/questionlist', {questionlist:result});
        });
    });

    //试题添加页面
    router.get('/add', (req ,res)=>{
        //获取分类信息
        let sql = 'SELECT qcid, qcname FROM qclass WHERE status = 0';
        mydb.query(sql, (err, results)=>{
            res.render('admin/addquestion', {qclist:results});
        });
    });

    router.post('/addquestionsubmit',(req ,res)=>{
        let sql = `INSERT INTO ${qtable}(qcid, qtitle, answer, ansyle, diff, import, comefrom, aid, username, addtimes) VALUES(?,?,?,?,?,?,?,?,?,?)`;
        let p = req.body;
        mydb.query(sql, [p.qcid, p.qtitle, p.answer, p.ansyle, p.diff, p.import, p.comefrom, req.session.aid, req.session.username, new Date().toLocaleString()],(err, result)=>{
            if(err){
                console.log(err);
                res.json({r:'db_err'});
                return ;
            }
            res.json({r:'ok'});
        });
    });


    return router;
}