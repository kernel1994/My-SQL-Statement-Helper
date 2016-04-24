$(function () {
    var vmData = new Vue({
        el: "#container",

        data: {
            // table name 和 field name
            // 结构：[{table: "tableName", field: ["fd0", "fd1", ...]}, ...]
            TbFd: [],
            // SQL 语句类型
            types: [
                {name: "Insert", value: "INSERT"},
                {name: "Delete", value: "DELETE"},
                {name: "Update", value: "UPDATE"},
                {name: "Query" , value: "QUERY" }
            ],
            // 选择的 SQL 语句类型
            checkedType: "UPDATE",
            // 选择的数据表
            checkedTable: "tb_role",
            // 填写的字段
            // 结构：[{name: "fieldName", value: "fieldValue"}, ...]
            checkedField: [],
            // 勾选和填写的条件
            // 结构 checkedField ，用于保存选择的条件和条件值
            checkedCondition: []
        },

        methods: {
            // 通过检测input 的改变来动态修改语句。
            // 这个想法已经放弃，因为太难了⁄(⁄ ⁄•⁄ω⁄•⁄ ⁄)⁄
//                fieldEdit: function (e) {
//                     方法内 `this` 指向 vm
//                     `event` 是原生 DOM 事件
//                    var fieldName = $(e.target).attr("name");
//                    var fieldValue = $(e.target).val();
//                    console.log(fieldName + ": " + fieldValue);
//                }
        }
    });

    // 自定义过滤器，返回指定表的所有字段
    // 过滤器参数未使用，因为我只需要触发它就可以了，真正需要的参数是checkedTable
    Vue.filter("kaka", () => (vmData.TbFd.filter(({table}) => (table === vmData.checkedTable))));

    // 后台获取表属性
    $.get("resolveDatabase.php", ({retData}) => vmData.TbFd = retData);

    function updateSQL() {
        // 合成的 SQL 语句
        let sql = "";
        
        /******* 插入 *******/
        if (vmData.checkedType === vmData.types[0].value) {
            let filedNameStr = "",
                filedValueStr = "";
            vmData.checkedField.forEach(({name, value}) => {
                filedNameStr += name + ", ";
                filedValueStr += value + ", ";
            });

            filedNameStr = filedNameStr.slice(0, -2);
            filedValueStr = filedValueStr.slice(0, -2);
            
            sql = `INSERT INTO ${vmData.checkedTable} (${filedNameStr}) VALUES (${filedValueStr})`;

        /******* 删除 *******/
        } else if (vmData.checkedType === vmData.types[1].value) {
            let str = "";
            vmData.checkedField.forEach(({name, value}) => str += `${name} = ${value} AND `);
            
            str = str.slice(0, -5);
            
            sql = `DELETE FROM ${vmData.checkedTable} WHERE ${str}`; //TODO delete condition

        /******* 修改 *******/
        } else if (vmData.checkedType === vmData.types[2].value) {

            // 组成 SET 后面的语句
            let str = "";
            vmData.checkedField.forEach(({name, value}) => str += `${name} = '${value}', `);
            str = str.slice(0, -2);

            // 组成 WHERE 后面的语句
            let cond = "";
            vmData.checkedCondition.forEach(({name, value}) => cond += `${name} = '${value}' AND `);
            cond = cond.slice(0, -5);

            sql = `UPDATE ${vmData.checkedTable} SET ${str} WHERE ${cond}`; //TODO update condition

        /******* 查询 *******/
        } else if (vmData.checkedType === vmData.types[3].value) {
            let str = "",
                col = "*";
            vmData.checkedField.forEach(({name, value}) => str += `${name} = ${value} AND `);
            
            str = str.slice(0, -5);
            
            sql = `SELECT ${col} FROM ${vmData.checkedTable} WHERE ${str}`; //TODO select col and condition
        }

        // 显示出来
        $("#sql").html(`<code>${sql}</code>`);
    }

    // 标记有 class = change 的改变来动态修改SQL 语句
    // 主要就是几个 select 元素而已
    $("select.change").change(function () {
        // 切换语句类型前先将所有 checkbox 清空选择
        unCheckAll();
        
        if ($(this).val() === vmData.types[2].value) {
            $("input[type=checkbox]").removeClass("hidden");
        } else {
            $("input[type=checkbox]").addClass("hidden");
        }
        
        updateSQL();
    });

    // 通过最后手动点击来搜集填写的值
    $("#btn").click(function () {
        // 将 condition 标记清空
        resetCondition();

        // 通过 checkbox 来检测和设置哪些字段是条件(通过设置 "condition" 属性为 "true")
        // 每次都读取页面上填写完毕的值，并在此之前清空原先的数组内容
        vmData.checkedCondition.length = 0;
        $("input[type=checkbox].condition:checked").each(function () {
            let fieldName = $(this).attr("name");
            let fieldID = `i-${fieldName}`;

            $(`#${fieldID}`).attr("condition", "true");
        });

        // 每次都读取页面上填写完毕的值，并在此之前清空原先的数组内容
        vmData.checkedField.length = 0;
        $("input[type=text].field").each(function () {
            let fieldName = $(this).attr("name");
            let fieldValue = $(this).val();
            let fieldID = `i-${fieldName}`;
            if (!isEmptyString(fieldValue)) {
                // 如果设置了 "condition" 属性为 "true" 的话表示这个字段是条件(WHERE 后面的)
                if ($(`#${fieldID}`).attr("condition") === "true") {
                    vmData.checkedCondition.push({name: fieldName, value: fieldValue});
                } else {
                    vmData.checkedField.push({name: fieldName, value: fieldValue});
                }
            }
        });

        // 更新语句
        updateSQL();
    });

});
