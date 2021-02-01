class Util {
    parseDate(date) {
        const month = date.getMonth() + 1;
        const dateObj = date.getDate();
        const hours = date.getHours();
        const minutes = date.getMinutes();

        const formattedDate = date.getFullYear() + '-' + (month > 9 ? month : '0' + month) +
            '-' + (dateObj > 9 ? dateObj : '0' + dateObj) + 'T' +
            (hours > 9 ? hours : '0' + hours) + ':' +
            (minutes > 9 ? minutes : '0' + minutes) + ':00';

        return formattedDate;
    }
}

export default new Util()
