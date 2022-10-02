export default function generateDate(toFormat?: Date) {
  const date = toFormat || new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const dateFormated = `${year}/${month}/${day > 10 ? day : `0${day}`}`;
  return dateFormated;
}
