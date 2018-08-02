global.express = require('express');
const mysql = require('mysql');
global.ejs = require('ejs');
global.md5 = require('md5');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const server = express();

//模板引擎的相关设置
server.engine('html', ejs.renderFile);
server.set('view engine', 'html');
server.set('views', 'view');
//数据库连接
global.mydb = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    port: 3306,
    database: 'interview'
});
mydb.connect();
//启用cookie parser，并设置签名密钥
let cookiesigned = 'h51804.app.com';
server.use(cookieParser(cookiesigned));

//启用session相关的中间件
server.use(session({
    secret: cookiesigned,
    name: 'sessid',
    resave: true, //每次发起请求的时候，有效时间要不要重新及时
    saveUninitialized: false,
    cookie: {maxAge: 1800 * 1000}
}));
//接收post过来的所有的数据
server.use(bodyParser.urlencoded({
    extended: true
}));

//实现管理员登录：引用的模块文件后面要有小括号   路径第一个字符 是  /  
server.use('/admin/login', require('./module/admin/login')());
//分类管理路由模块
server.use('/admin/qclass', require('./module/admin/qclass')());

//静态资源托管
server.use(express.static('view'));

//404处理：样式自定义
server.use((req ,res)=>{
    res.send('你访问的路径不存在');
});

server.listen(81);











