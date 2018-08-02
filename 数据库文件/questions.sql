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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COMMENT='试题表';

-- 正在导出表  interview.questions 的数据：~0 rows (大约)
/*!40000 ALTER TABLE `questions` DISABLE KEYS */;
INSERT INTO `questions` (`qid`, `qcid`, `qtitle`, `answer`, `ansyle`, `diff`, `import`, `comefrom`, `aid`, `username`, `addtimes`, `updatetimes`, `status`, `views`, `collect`) VALUES
	(1, 6, '<p>JS的<span style="font-weight: bold; font-size: large; color: rgb(194, 79, 74);">数据类型</span>有哪些？</p><p><br></p>', '数字，数组，对象', '<p>基本类型和<span style="font-weight: bold; color: rgb(194, 79, 74);">引用类型</span></p>', 1, 1, '新华社', 1, '李翰宇', '2018-08-02 11:26:30', '0000-00-00 00:00:00', 0, 0, 0),
	(2, 5, '<p>123</p>', '456', '<p>789</p>', 4, 5, '10', 1, '李翰宇', '2018-08-02 11:28:22', '0000-00-00 00:00:00', 0, 0, 0);
/*!40000 ALTER TABLE `questions` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
