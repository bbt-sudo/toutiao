/**
 * 时间戳日期格式化
 * @param {Number || null} dateTime 时间戳
 * @param {string} fmt yyyy:mm:dd|yyyy:mm|yyyy年mm月dd日|yyyy年mm月dd日 hh时MM分等,可自定义组合 长度大于一的有前导零 准确到 年月日时分秒
 * @returns  string
 */
export function timeFormat(dateTime = null, fmt = "yy-mm-dd") {
    // 如果 dateTime 为null , 获取当前的时间
    if (!dateTime) dateTime = Number(new Date());
    // 如果时间戳的长度为10，就 *1000
    if (dateTime.toString().length === 10) dateTime *= 1000;
    let date = new Date(dateTime);
    let ret;
    let opt = {
        "y+": date.getFullYear().toString(), // 年
        "m+": (date.getMonth() + 1).toString(), // 月
        "d+": date.getDate().toString(), // 日
        "h+": date.getHours().toString(), // 时
        "M+": date.getMinutes().toString(), // 分
        "s+": date.getSeconds().toString() // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };

    for (let k in opt) {
        ret = new RegExp(`${k}`).exec(fmt); //检索 fmt的k值，返回找到的值，并确定其位置
        if (ret) {
            // 用于replace方法 把 fmt对应的值替换成ret[1]，并且根据fmt值的长度判断是否需要前导零，padStart字符串前填充
            fmt = fmt.replace(ret[0], ret[0].length === 1 ? (opt[k]) : (opt[k].padStart(ret[0].length, '0')))
        }
    }
    return fmt
}





/**
 * 时间戳转为多久之前
 * @param {String} dateTime 
 * @param {String || Boolam } format  如果为时间格式字符串，超出一定时间范围，返回固定的时间格式 || 如果为布尔值false，无论什么时间，都返回多久以前的格式
 * @returns 
 */
export function timeForm(dateTime = null, format = 'yyyy-mm-dd',startTimeStamp = Number(new Date())) {
    // 如果为null,则格式化当前时间
    if (!dateTime) dateTime = Number(new Date());
    // 如果dateTime长度为10或者13，则为秒和毫秒的时间戳，如果超过13位，则为其他的时间格式
    if (dateTime.toString().length === 10) dateTime *= 1000

    let timestamp = new Date(Number(dateTime))
    let timer = (startTimeStamp - timestamp) / 1000;

    // 如果小于5分钟,则返回"刚刚",其他以此类推
    let tips = '';
    switch (true) {
        case timer < 300:
            tips = '刚刚';
            break;
        case timer >= 300 && timer < 3600:
            tips = parseInt(timer / 60) + '分钟前';
            break;
        case timer >= 3600 && timer < 86400:
            tips = parseInt(timer / 3600) + '小时前';
            break;
        case timer >= 86400 && timer < 2592000:
            tips = parseInt(timer / 86400) + '天前';
            break;
        default:
            // 如果format为false，则无论什么时间戳，都显示xx之前
            if (format === false) {
                if (timer >= 2592000 && timer < 365 * 86400) {
                    tips = parseInt(timer / (86400 * 30)) + '个月前';
                } else {
                    tips = parseInt(timer / (86400 * 365)) + '年前';
                }
            } else {
                tips = timeFormat(timestamp, format);
            }
    }
    return tips;
}