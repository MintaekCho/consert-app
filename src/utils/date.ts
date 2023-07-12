export function getKorDate() {
  const curr = new Date();

  const korDate = curr.getTime()

  return new Date(korDate);
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

export function getStringSelectDate(date: Date): string {
  console.log(date);
  let yyyy = date.getFullYear();
  let mm = date.getMonth() + 1; //January is 0!
  let dd = date.getDate();

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
  return `${year}-${month}-${day}`;
}

export function getWeekday(day: number): string {
  switch (day) {
    case 0:
      return "일";
    case 1:
      return "월";
    case 2:
      return "화";
    case 3:
      return "수";
    case 4:
      return "목";
    case 5:
      return "금";
    case 6:
      return "토";
    default:
      throw new Error("잘못된 값이 들어왔습니다.");
  }
}

// 특정 달의 첫 번째 요일을 가져옴 (0: 일요일, 1: 월요일, ..., 6: 토요일)
export const getFirstDayOfMonth = (year: number, month: number) => {
  return new Date(year, month, 1).getDay();
};

// 특정 달의 총 일수를 가져옴
export const getDaysInMonth = (year: number, month: number) => {
  if (month === 12) month = 11;
  return new Date(year, month + 1, 0).getDate();
};
