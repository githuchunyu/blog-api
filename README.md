# Blog-api

一个基于nodejs的博客网站后端。

## 初始化
- 安装依赖
- 本项目默认本地数据库名为blog，账户blog，密码123456，所以需要先设置数据库
```sh
# 先开启本地mysql服务，然后命令行进入交互
/usr/local/mysql/bin/mysql -h 127.0.0.1 -P 3306 -u root -p
# 输入你的root密码
# 创建用户
create user 'port'@'%' identified by '123456';
# 开放权限
grant all privileges  on *.*  to "port"@'%';
exit;
# 退出交互
```
然后创建数据库命名为`blog`，字符集`utf8`，排序规则`utf8_general_ci`。
- 执行迁移文件，创建用户表
- 执行种子文件，数据库中初始化默认的root用户数据

- 启动
```sh
npm start
```
浏览器中打开(http://localhost:3000)[http://localhost:3000]，如果出现`欢迎您`，即表示运行成功.

现在就可以测试用户的登录，登出等功能了。

## 参考
(sequelizer中文文档)[https://github.com/demopark/sequelize-docs-Zh-CN]  
(sequelize-auto)[https://github.com/sequelize/sequelize-auto/pull/359/commits/bd15c8108e6bb6058734e5ad4e4cd4ee14a8736d]