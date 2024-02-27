export const formatter = (number) => {
    if (!number) return 0;
    return `${Math.round(Number(number))}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`);
}