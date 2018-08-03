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

-- 导出  表 interview.user 结构
CREATE TABLE IF NOT EXISTS `user` (
  `uid` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `username` char(20) NOT NULL COMMENT '账号',
  `passwd` char(32) NOT NULL COMMENT '密码，md5',
  `tel` char(11) NOT NULL COMMENT '手机号',
  `email` char(50) DEFAULT NULL COMMENT '邮箱',
  `header` char(50) DEFAULT NULL COMMENT '头像地址',
  `loginnum` int(11) NOT NULL DEFAULT '0' COMMENT '登录次数',
  `ip` char(20) DEFAULT NULL COMMENT 'ip地址',
  `lasttimes` datetime DEFAULT NULL COMMENT '最后一次登录时间',
  `regtimes` datetime DEFAULT NULL COMMENT '最后注册时间',
  `status` tinyint(4) NOT NULL DEFAULT '0' COMMENT '0表示正常',
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='用户信息表';

-- 正在导出表  interview.user 的数据：~0 rows (大约)
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` (`uid`, `username`, `passwd`, `tel`, `email`, `header`, `loginnum`, `ip`, `lasttimes`, `regtimes`, `status`) VALUES
	(1, '谭杰', 'e10adc3949ba59abbe56e057f20f883e', '15982365325', '', NULL, 0, '::1', NULL, '0000-00-00 00:00:00', 0);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
