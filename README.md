# My-SQL-Statement-Helper
Semi-automated tool to generate SQL statements

思路：使用 PHP 读取数据表及各个字段，前端控制，半自动得生成增删改查的 SQL 语句。

-------
2016/04/17 22:04 更新

-------

完成了大致的功能，还有很多细节需要进一步完善，
### 已经发现的问题及解决办法：

* 删除语句的条件之间的逻辑运算符应该有 ```AND``` ```OR``` => 选择 ```delete``` 语句的时候增加下拉列表
* 更新语句的列和条件之间需要区分 => 添加 ```checkbox``` 选中则是条件，反之是更新的列值
* 选择语句的条件更复杂。。。(其实条件都可以很复杂，一脸尴尬)

-------
2016/04/18 23:32 更新

-------

修复了 ```update``` 语句的 bug 

通过使用 ```checkbox``` 来标记哪些字段为需要修改的字段，哪些字段是判断条件字段

