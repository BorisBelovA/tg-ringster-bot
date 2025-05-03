export const timeValid = (inputtedTime: string) => {
    if (!inputtedTime) {
        return false;
    }
    const [hours, minutes] = inputtedTime?.split(':');
    if (isNaN(+hours) || isNaN(+minutes)) {
        return false;
    }
    if (+hours < 0 && +hours > 23 || +minutes < 0 && +minutes > 59) {
        return false;
    }
    return true;
}