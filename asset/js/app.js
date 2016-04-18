/**
 * Created by kernel on 2016/4/17.
 */
var isEmptyString = function (str) {
    var str2 = str.trim();
    if (str2 === "")
        return true;
    if (str2 === null)
        return true;
    if (str2 === undefined)
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
var unCheckAll = function () {
    $("input[type=checkbox]").each(function () {
        if (this.checked) {
            this.checked = false;
        }
    });
}
