CREATE TABLE IF NOT EXISTS `customers` (
`uid` int(11) NOT NULL AUTO_INCREMENT,
`name` varchar(50) NOT NULL,
`email` varchar(50) NOT NULL,
`phone` varchar(100) NOT NULL,
`password` varchar(200) NOT NULL,
`address` varchar(50) NOT NULL,
`city` varchar(50) NOT NULL,
`created` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
PRIMARY KEY (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=187 ;