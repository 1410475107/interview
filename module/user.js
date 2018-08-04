const async = require('async');
module.exports = function () {
    const router = express.Router();
    let qtable = 'questions';

    
    //进到个人中心的前提是登录
    router.use((req ,res, next)=>{
        /*
        req.session.uid = 2;
        req.session.header = 'http://lulaoshi:81/uploads\2018\08\1533289491644_044937.jpg';
        req.session.username = '屈向';
        */
        if(!req.session.uid){
            res.redirect('/login');
            return ;
        }
        next();
    });
    router.get('/', (req ,res)=>{
        res.render('user', {
            username:req.session.username,
            header:req.session.header
        });
    });

    router.post('/saveheader', (req ,res)=>{
        let header = req.body.header;
        let sql = 'UPDATE user SET header = ? WHERE uid = ? LIMIT 1';
        mydb.query(sql, [header, req.session.uid], (err, result)=>{
            res.json({r:'ok'});
        });
    });
    
    router.get('/collect', (req ,res)=>{
        let qcid = req.query.qcid ? req.query.qcid : 0;
        qcid = parseInt(qcid);
        
        let keywords = req.query.keywords ? req.query.keywords : '';
        //当前页面
        let page = req.query.page ? req.query.page : 1;
        //每页显示多少条
        let pagenum = 1;
        //总页数
        let totalpage= 1;
        //链接地址扩展信息
        let urlext = '';
        async.series({
            totalnums:function (cb) {
                //查询满足条件的记录数
                let sql = `SELECT count(cid) AS totalnums FROM collection WHERE status = 0`;
                mydb.query(sql, (err, result)=>{
                    console.log(err);
                    //返回总记录数
                    cb(null, result[0].totalnums);
                });
            },
            questionlist:function (cb) {
                //查询所有的试题并显示到页面
                let sql = `SELECT co.*, q.qid, q.qtitle, q.diff, q.import, q.collect, q.views, q.addtimes, c.qcname 
                FROM collection AS co 
                LEFT JOIN ${qtable} AS q ON co.qid = q.qid 
                LEFT JOIN qclass AS c ON q.qcid = c.qcid 
                WHERE co.status = 0`;
                //查询当前页应该显示的记录
                sql += ` LIMIT ${pagenum*(page-1)},${pagenum}`;
                mydb.query(sql, (err, result)=>{
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
            results.header = req.session.header;
            results.username = req.session.username;
            res.render('collectlist', results);
        });
    });


    return router;
}