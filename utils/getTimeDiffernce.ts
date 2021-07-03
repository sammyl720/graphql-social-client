

const getTimeDifference = (before:Date): {
  text: String;
  list: { [key: string]: number}[],
  result: { [key: string]: number }
} => {
  const now = Date.now()
  let differenceInMs = now - before.getTime()
  const second = 1000;
  const minute = 60 * second;
  const hour = 60 * minute;
  const day = 24 * hour;
  const week = 7 * day;
  const month = (4 * week) + Math.round(Math.random() * 3);
  let result = {
    month: 0,
    week: 0,
    day: 0,
    hour: 0,
    minute: 0
  }
  while(differenceInMs > (minute * 1.2)) {
    if(differenceInMs > month) {
      result.month++;
      differenceInMs -= month;
    } else if(differenceInMs > week){
      result.week++;
      differenceInMs -= week;
    } else if(differenceInMs > day){
      result.day++;
      differenceInMs -= day;
    } else if(differenceInMs > hour) {
      result.hour++;
      differenceInMs -= hour;
    } else if (differenceInMs > minute){
      differenceInMs -= minute;
      result.minute++;
    }
  }

  let text = ''
  let list: {[key:string]: number}[] = []
  Object.entries(result).map(([time, value]) => {
    if(value > 0){
      text += `${value} ${time}s, `
      list.push({ [time]: value })
    }
  })
  let rgx = /1[^\d]/
  text = text.split(',').slice(0,2).map(subtext => {
    if(rgx.test(subtext)){
      return subtext.slice(0,-1)
    }
    return subtext;
  }).join(',')
  if(/^[^,]+$/.test(text)){
    text = 'Just now'
  } else {
    let lastComma = text.lastIndexOf(',')
    text = text.slice(0,lastComma) + ' ago'
  }
  return {
    text,
    list,
    result
  }
}

export default getTimeDifference;