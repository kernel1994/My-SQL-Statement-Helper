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
