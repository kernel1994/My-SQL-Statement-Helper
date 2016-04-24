/**
 * Created by kernel on 2016/4/17.
 */
const isEmptyString = (str) => {
    str = str.trim();
    if (str === "")
        return true;
    if (str === null)
        return true;
    if (str === undefined)
        return true;
};

// 根本不需要删除 vmData.checkedField 和 vmData.checkedCondition 中的元素
// 因为每次点击 btn 都会将两个数组置空，再计算填充元素
// 所以这个方法废弃，权当学习删除数组中特定元素例子
// var deleteEle = function (arr, eleName) {
//     arr.forEach(function (e, i, a) {
//         if (e.name === eleName) {
//             return arr.splice(i, 1);
//         }
//     });
// };

/**
* 将所有checkbox 呈未选中状态
*/
const unCheckAll = () => {
    $("input[type=checkbox]").each(function () {
        if (this.checked) {
            this.checked = false;
        }
    });
}

/**
* 将 是否为条件的标记初始化为 false
*/
const resetCondition = () => {
    $("input[type=text].field").each(function () {
        $(this).attr("condition", "false");
    });
}
