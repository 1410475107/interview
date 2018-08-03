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

-- 导出  表 interview.collection 结构
CREATE TABLE IF NOT EXISTS `collection` (
  `cid` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `uid` int(11) NOT NULL COMMENT '用户id',
  `qid` int(11) NOT NULL COMMENT '试题id',
  `addtimes` datetime NOT NULL COMMENT '收藏时间',
  `status` int(11) NOT NULL DEFAULT '0' COMMENT '收藏状态',
  PRIMARY KEY (`cid`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8 COMMENT='收藏信息表';

-- 正在导出表  interview.collection 的数据：~0 rows (大约)
/*!40000 ALTER TABLE `collection` DISABLE KEYS */;
INSERT INTO `collection` (`cid`, `uid`, `qid`, `addtimes`, `status`) VALUES
	(20, 2, 2, '2018-08-03 17:36:28', 0);
/*!40000 ALTER TABLE `collection` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
