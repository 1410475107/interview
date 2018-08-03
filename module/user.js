module.exports = function () {
    const router = express.Router();
    //进到个人中心的前提是登录
    router.use((req ,res, next)=>{
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
    })

    return router;
}