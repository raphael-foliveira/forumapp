export const parseDate = (dateString: string) => {
    const dateNumber = Date.parse(dateString);
    const dateObj = new Date(dateNumber);
    const formattedString = `${dateObj.getDate()}/${
        dateObj.getMonth() + 1
    }/${dateObj.getFullYear()}`;
    return formattedString;
};
