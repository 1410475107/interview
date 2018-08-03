const async = require('async');
module.exports = function () {
    const router = express.Router();
    let qtable = 'questions';
    //进到个人中心的前提是登录
    router.use((req ,res, next)=>{
        if(!req.session.uid){
            res.redirect('/login');
            return ;
        }
        next();
    });
    //试题列表页面
    router.get('/', (req ,res)=>{
        let qcid = req.query.qcid ? req.query.qcid : 0;
        qcid = parseInt(qcid);
        
        let keywords = req.query.keywords ? req.query.keywords : '';
        //当前页面
        let page = req.query.page ? req.query.page : 1;
        //每页显示多少条
        let pagenum = 10;
        //总页数
        let totalpage= 1;
        //链接地址扩展信息
        let urlext = '';
        async.series({
            qclist:function (cb) {
                //获取分类信息
                let sql = 'SELECT qcid, qcname FROM qclass WHERE status = 0';
                mydb.query(sql, (err, results)=>{
                    // res.render('admin/addquestion', {qclist:results});
                    cb(null, results);
                });
            },
            totalnums:function (cb) {
                //查询满足条件的记录数
                let sql = `SELECT count(qid) AS totalnums FROM ${qtable} WHERE status = 0`;
                 //根据分类查询试题
                 if(qcid){
                    sql += ` AND qcid = ${qcid}`;
                    urlext += `&qcid=${qcid}`;
                }
                if(keywords){
                    sql += ` AND qtitle LIKE "%${keywords}%"`;
                    urlext += `&keywords=${keywords}`;
                }
                mydb.query(sql, (err, result)=>{
                    console.log(err);
                    //返回总记录数
                    cb(null, result[0].totalnums);
                });
            },
            questionlist:function (cb) {
                //查询所有的试题并显示到页面
                let sql = `SELECT q.qid, q.qtitle, q.diff, q.import, q.collect, q.views, q.addtimes, c.qcname 
                FROM ${qtable} AS q 
                LEFT JOIN qclass AS c ON q.qcid = c.qcid 
                WHERE q.status = 0`;
                //根据分类查询试题
                if(qcid){
                    sql += ` AND q.qcid = ${qcid}`;
                }
                if(keywords){
                    sql += ` AND q.qtitle LIKE "%${keywords}%"`;
                }
                //查询当前页应该显示的记录
                sql += ` LIMIT ${pagenum*(page-1)},${pagenum}`;
                mydb.query(sql, (err, result)=>{
                    // res.render('admin/questionlist', {questionlist:result});
                    cb(null, result);
                });
            }
        },(err, results)=>{
            results.qcid = qcid;
            results.keywords = keywords;
            //totalnums  存的是满足条件的总记录数
            //计算总页数
            totalpage = Math.ceil(results.totalnums / pagenum);
            results.totalpage = totalpage;
            results.page = page;
            //显示前后3页  end - start = showpage - 1        6  7  8  9  10  11  12
            let showpage = 7;
            let start = page - Math.ceil((showpage-1)/2);
            let end = page + Math.floor((showpage-1)/2);
            //开始页数不能小于  1
            if(start < 1){
                start   = 1;
                end     = showpage - 1 + start;
            }
            //结束页码不能大于总页数
            if(end > totalpage){
                end     = totalpage;
                start   = end + 1 - showpage;
                //开始页数不能小于  1
                if(start < 1){
                    start = 1;
                }
            }
            results.start = start;
            results.end = end;
            //链接地址里面查询信息
            results.urlext = urlext;
            res.render('qlist', results);
        });
    });

    router.post('/collect', (req, res)=>{
        let qid = req.body.qid;
        async.waterfall([
            function(cb){//检查是否已经收藏过
                let sql = 'SELECT cid FROM collection WHERE qid = ? AND uid = ? LIMIT 1';
                mydb.query(sql, [qid, req.session.uid], (err ,result)=>{
                    if(result.length){
                        cb(null, 'have');
                    }else{
                        cb(null, 'ok');
                    }
                });
            },
            function (ch, cb) {
                console.log(ch);
                if(ch == 'ok'){
                    let sql = `UPDATE ${qtable} SET collect = collect + 1 WHERE qid = ?`;
                    mydb.query(sql, qid, (err ,result)=>{
                        cb(null, ch);
                    });
                }else{
                    cb(null, ch);
                }
            },
            function (ch, cb) {
                if(ch == 'ok'){
                    let sql = `INSERT INTO collection(uid, qid, addtimes) VALUES(?,?,?)`;
                    mydb.query(sql, [req.session.uid, qid, new Date().toLocaleString()], (err ,result)=>{
                        cb(null, ch);
                    });
                }else{
                    cb(null, ch);
                }
            }
        ], (err, result)=>{
            res.json({r:result});
        });

    });

    // router.get('/', (req ,res)=>{
    //     res.render('qlist', {
    //         username:req.session.username,
    //         header:req.session.header
    //     });
    // });


    return router;
}