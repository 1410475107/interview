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
INSERT INTO `admin` (`aid`, `username`, `passwd`, `tel`, `loginnum`, `lastlogin`, `ip`) VALUES
	(1, '李翰宇', 'f379eaf3c831b04de153469d1bec345e', '18996326358', 12, '2018-08-01 16:04:52', '::1');

-- 导出  表 interview.qclass 结构
CREATE TABLE IF NOT EXISTS `qclass` (
  `qcid` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `qcname` char(12) NOT NULL COMMENT '分类名称',
  `aid` int(11) NOT NULL COMMENT '添加者id',
  `username` char(4) NOT NULL COMMENT '添加者姓名',
  `addtimes` datetime NOT NULL COMMENT '添加时间',
  `updatetimes` datetime DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`qcid`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COMMENT='分类管理';

-- 正在导出表  interview.qclass 的数据：~3 rows (大约)

INSERT INTO `qclass` (`qcid`, `qcname`, `aid`, `username`, `addtimes`, `updatetimes`) VALUES
	(2, 'javascript', 1, '李翰宇', '2018-08-01 16:06:59', NULL),
	(3, 'CSS', 1, '李翰宇', '2018-08-01 16:07:19', NULL),
	(4, 'VUE', 1, '李翰宇', '2018-08-01 16:07:25', NULL);

