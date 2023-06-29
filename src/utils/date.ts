export function getKorDate() {
  const curr = new Date();

  const utc = curr.getTime();

  const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
  return new Date(utc);
}

export function getStringDate() {
  const date = getKorDate();
  console.log(date);
  let yyyy = date.getFullYear();
  let dd = date.getDate();
  let mm = date.getMonth() + 1; //January is 0!
  let hour = date.getHours();
  let minute = date.getMinutes();
  let second = date.getSeconds();
  let year: string;
  let month: string;
  let day: string;

  if (dd < 10) {
    day = "0" + dd.toString();
  } else day = dd.toString();
  if (mm < 10) {
    month = "0" + mm.toString();
  } else month = mm.toString();

  year = yyyy.toString();
  return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}
