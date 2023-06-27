
export function getKorDate() {
  const curr = new Date();

  const utc = curr.getTime();

  // const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
  return new Date(utc);
}

export function getStringDate(date: Date) {
    console.log(date);
  let dd = date.getDate();
  let mm = date.getMonth() + 1; //January is 0!
  let year: string;
  let month: string;
  let day: string;

  let yyyy = date.getFullYear();
  if (dd < 10) {
    year = "0" + dd;
  }
  if (mm < 10) {
    month = "0" + mm.toString();
  }

  year = yyyy.toString();
  month = mm.toString();
  day = dd.toString();
  return `${year}-${month}-${day}`;
}
