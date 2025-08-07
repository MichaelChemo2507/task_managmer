module.exports = (dateInput) => {
    dateObj = new Date(dateInput);

    let day = dateObj.getDate();
    day = day < 10 ? "0" + day : day;

    let month = dateObj.getMonth() + 1;
    month = month < 10 ? "0" + month : month;

    const year = dateObj.getFullYear();

    return `${year}/${month}/${day}`;
}