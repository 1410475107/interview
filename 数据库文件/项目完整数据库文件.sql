-- --------------------------------------------------------
-- 主机:                           127.0.0.1
-- 服务器版本:                        5.5.53-log - MySQL Community Server (GPL)
-- 服务器操作系统:                      Win32
-- HeidiSQL 版本:                  9.5.0.5280
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- 导出  表 interview.admin 结构
CREATE TABLE IF NOT EXISTS `admin` (
  `aid` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `username` char(12) NOT NULL COMMENT '账号',
  `passwd` char(32) NOT NULL COMMENT 'md5',
  `tel` char(11) NOT NULL COMMENT '手机号',
  `loginnum` int(11) NOT NULL COMMENT '登录次数',
  `lastlogin` datetime NOT NULL COMMENT '最后一次登录时间',
  `ip` char(25) NOT NULL COMMENT '登录IP',
  PRIMARY KEY (`aid`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='管理员信息表';

-- 正在导出表  interview.admin 的数据：~1 rows (大约)
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` (`aid`, `username`, `passwd`, `tel`, `loginnum`, `lastlogin`, `ip`) VALUES
	(1, '李翰宇', 'f379eaf3c831b04de153469d1bec345e', '18996326358', 37, '2018-08-03 16:38:24', '::1');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;

-- 导出  表 interview.collection 结构
CREATE TABLE IF NOT EXISTS `collection` (
  `cid` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `uid` int(11) NOT NULL COMMENT '用户id',
  `qid` int(11) NOT NULL COMMENT '试题id',
  `addtimes` datetime NOT NULL COMMENT '收藏时间',
  `status` int(11) NOT NULL DEFAULT '0' COMMENT '收藏状态',
  PRIMARY KEY (`cid`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8 COMMENT='收藏信息表';

-- 正在导出表  interview.collection 的数据：~3 rows (大约)
/*!40000 ALTER TABLE `collection` DISABLE KEYS */;
INSERT INTO `collection` (`cid`, `uid`, `qid`, `addtimes`, `status`) VALUES
	(20, 2, 2, '2018-08-03 17:36:28', 0),
	(22, 2, 3, '2018-08-04 09:03:46', 0);
/*!40000 ALTER TABLE `collection` ENABLE KEYS */;

-- 导出  表 interview.qclass 结构
CREATE TABLE IF NOT EXISTS `qclass` (
  `qcid` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `qcname` char(12) NOT NULL COMMENT '分类名称',
  `aid` int(11) NOT NULL COMMENT '添加者id',
  `username` char(4) NOT NULL COMMENT '添加者姓名',
  `addtimes` datetime NOT NULL COMMENT '添加时间',
  `updatetimes` datetime DEFAULT NULL COMMENT '修改时间',
  `status` tinyint(4) NOT NULL DEFAULT '0',
  PRIMARY KEY (`qcid`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COMMENT='分类管理';

-- 正在导出表  interview.qclass 的数据：~5 rows (大约)
/*!40000 ALTER TABLE `qclass` DISABLE KEYS */;
INSERT INTO `qclass` (`qcid`, `qcname`, `aid`, `username`, `addtimes`, `updatetimes`, `status`) VALUES
	(4, 'VUE456', 1, '李翰宇', '2018-08-01 16:07:25', '2018-08-02 09:48:14', 0),
	(5, 'CSS', 1, '李翰宇', '2018-08-02 09:32:20', NULL, 0),
	(6, 'javascript', 1, '李翰宇', '2018-08-02 09:32:30', NULL, 0),
	(7, 'React', 1, '李翰宇', '2018-08-02 13:41:54', NULL, 0),
	(8, 'jQuery', 1, '李翰宇', '2018-08-02 13:42:04', NULL, 0);
/*!40000 ALTER TABLE `qclass` ENABLE KEYS */;

-- 导出  表 interview.questions 结构
CREATE TABLE IF NOT EXISTS `questions` (
  `qid` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `qcid` int(11) NOT NULL COMMENT '分类id',
  `qtitle` text NOT NULL COMMENT '题干',
  `answer` text NOT NULL COMMENT '答案',
  `ansyle` text COMMENT '试题解析',
  `diff` tinyint(4) NOT NULL DEFAULT '1' COMMENT '难易度',
  `import` tinyint(4) NOT NULL DEFAULT '1' COMMENT '重要度',
  `comefrom` varchar(500) DEFAULT NULL COMMENT '来源',
  `aid` tinyint(4) NOT NULL COMMENT '添加者',
  `username` char(12) NOT NULL COMMENT '添加者',
  `addtimes` datetime NOT NULL COMMENT '添加时间',
  `updatetimes` datetime NOT NULL COMMENT '修改时间',
  `status` tinyint(4) NOT NULL COMMENT '0表示正常',
  `views` int(11) NOT NULL DEFAULT '0' COMMENT '浏览次数',
  `collect` int(11) NOT NULL DEFAULT '0' COMMENT '收藏次数',
  PRIMARY KEY (`qid`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COMMENT='试题表';

-- 正在导出表  interview.questions 的数据：~3 rows (大约)
/*!40000 ALTER TABLE `questions` DISABLE KEYS */;
INSERT INTO `questions` (`qid`, `qcid`, `qtitle`, `answer`, `ansyle`, `diff`, `import`, `comefrom`, `aid`, `username`, `addtimes`, `updatetimes`, `status`, `views`, `collect`) VALUES
	(1, 6, '<p>JS的<span style="font-weight: bold; font-size: large; color: rgb(194, 79, 74);">数据类型</span>有哪些？</p><p><br></p>', '数字，数组，对象', '<p>基本类型和<span style="font-weight: bold; color: rgb(194, 79, 74);">引用类型</span></p>', 1, 1, '新华社', 1, '李翰宇', '2018-08-02 11:26:30', '0000-00-00 00:00:00', 0, 0, 7),
	(2, 7, '<p>React是哪个公司开源的？1</p><p><br></p>', 'React是哪个公司开源的？2', '<p>React是哪个公司开源的？&nbsp; 3<br></p><p><br></p>', 2, 2, 'facebook', 1, '李翰宇', '2018-08-02 11:28:22', '2018-08-03 09:28:18', 0, 1, 1),
	(3, 5, '<p>你知道的定位以及他们之间的区别？</p><p><img src="http://lulaoshi:81/uploads/2018/08/1533190086389_697614.jpg"><img src="http://lulaoshi:81/uploads/2018/08/1533190086417_556517.jpg"><img src="http://lulaoshi:81/uploads/2018/08/1533190086425_214259.jpg"><img src="http://lulaoshi:81/uploads/2018/08/1533190086428_128133.jpg"><img src="http://lulaoshi:81/uploads/2018/08/1533190086441_937658.jpg"></p>', '四种定位：相对，固定，绝对，继承', '<p>绝对定位&nbsp;&nbsp;<br></p>', 2, 5, '人民日报', 1, '李翰宇', '2018-08-02 14:13:10', '0000-00-00 00:00:00', 0, 0, 1);
/*!40000 ALTER TABLE `questions` ENABLE KEYS */;

-- 导出  表 interview.records 结构
CREATE TABLE IF NOT EXISTS `records` (
  `rid` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `uid` int(11) NOT NULL COMMENT '用户id',
  `qid` int(11) NOT NULL COMMENT '试题id',
  `answer` varchar(5000) NOT NULL COMMENT '用户输入的答案',
  `note` varchar(5000) NOT NULL COMMENT '个人笔记',
  `addtimes` datetime NOT NULL COMMENT '做题时间',
  `status` tinyint(4) NOT NULL DEFAULT '0' COMMENT '0表示正常',
  PRIMARY KEY (`rid`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='答题记录';

-- 正在导出表  interview.records 的数据：~1 rows (大约)
/*!40000 ALTER TABLE `records` DISABLE KEYS */;
INSERT INTO `records` (`rid`, `uid`, `qid`, `answer`, `note`, `addtimes`, `status`) VALUES
	(1, 2, 2, '我的答案', '', '2018-08-04 10:37:51', 0);
/*!40000 ALTER TABLE `records` ENABLE KEYS */;

-- 导出  表 interview.user 结构
CREATE TABLE IF NOT EXISTS `user` (
  `uid` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `username` char(20) NOT NULL COMMENT '账号',
  `passwd` char(32) NOT NULL COMMENT '密码，md5',
  `tel` char(11) NOT NULL COMMENT '手机号',
  `email` char(50) DEFAULT NULL COMMENT '邮箱',
  `header` char(100) DEFAULT NULL COMMENT '头像地址',
  `loginnum` int(11) NOT NULL DEFAULT '0' COMMENT '登录次数',
  `ip` char(20) DEFAULT NULL COMMENT 'ip地址',
  `lasttimes` datetime DEFAULT NULL COMMENT '最后一次登录时间',
  `regtimes` datetime DEFAULT NULL COMMENT '最后注册时间',
  `status` tinyint(4) NOT NULL DEFAULT '0' COMMENT '0表示正常',
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COMMENT='用户信息表';

-- 正在导出表  interview.user 的数据：~2 rows (大约)
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` (`uid`, `username`, `passwd`, `tel`, `email`, `header`, `loginnum`, `ip`, `lasttimes`, `regtimes`, `status`) VALUES
	(1, '谭杰', 'e10adc3949ba59abbe56e057f20f883e', '15982365325', '', 'http://lulaoshi:81/uploads\\2018\\08\\1533280318557_3', 1, '::ffff:192.168.2.105', '2018-08-03 15:11:49', '0000-00-00 00:00:00', 0),
	(2, '屈向', 'e10adc3949ba59abbe56e057f20f883e', '18282020602', 'quxiang@163.com', 'http://lulaoshi:81/uploads\\2018\\08\\1533289491644_044937.jpg', 45, '::1', '2018-08-04 15:33:23', '0000-00-00 00:00:00', 0);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
