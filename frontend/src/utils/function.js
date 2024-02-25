export const formatTime = (date) => {
    try {
        const time = new Date(date);
        return `${time.getFullYear()}-${time.getMonth()}-${time.getDate()} ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`;
    }
    catch (e) {
        return ``
    }
}