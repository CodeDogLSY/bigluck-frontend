/**
 * 获取某年某月有多少天
 * @param {*} year 
 * @param {*} month 
 * @returns 
 */
export function getDaysInMonth (year, month) {
    return new Date(year, month + 1, 0).getDate()
}