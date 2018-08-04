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

-- 正在导出表  interview.records 的数据：~0 rows (大约)
/*!40000 ALTER TABLE `records` DISABLE KEYS */;
INSERT INTO `records` (`rid`, `uid`, `qid`, `answer`, `note`, `addtimes`, `status`) VALUES
	(1, 2, 2, '我的答案', '', '2018-08-04 10:37:51', 0);
/*!40000 ALTER TABLE `records` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
