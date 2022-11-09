import { colors, colorValues } from "src/data/base";
import { randomIndex } from "src/utils/base";

const random = randomIndex(colorValues.length);

const getBgColor = (i) => colorValues[i];

const oneDay = 24 * 60 * 60 * 1000;

const nationalDayArr = [
  {
    key: "guoqing",
    name: "国庆",
    happenDate: "1949/10/01",
    text: "中华人民共和国国庆节。",
    bgColor: "#f44336",
    action1: `“国庆”一词，本指国家喜庆之事，最早见于西晋。
    西晋的文学家陆机在《五等诸侯论》一文中就曾有“国庆独飨其利，
    主忧莫与其害”的记载。在中国的封建时代，国家喜庆的大事，莫大过于帝王的登基、诞辰等。
    因而中国古代把皇帝即位、诞辰称为“国庆”。今天称国家建立的纪念日为国庆节。`,
    action2: `生在红旗下，长在春风里，人民有信仰，国家有力量，目光所至皆为华夏，五星闪耀皆为信仰！`,
  },
  {
    key: "gjgjr",
    type: 'sad',
    name: "国家公祭日",
    happenDate: "2014/12/13",
    text: "南京大屠杀死难者国家公祭日",
    bgColor: "#795548",
    action1: `2014年2月27日，十二届全国人大常委会第七次会议通过决定，
    以立法形式将12月13日设立为南京大屠杀死难者国家公祭日。决议的通过，
    使得对南京大屠杀遇难者的纪念上升为国家层面，
    表明了中国人民反对侵略战争、捍卫人类尊严、维护世界和平的坚定立场。`,
    action2: `勿忘国耻，牢记使命。振兴中华，吾辈自强。`,
  },
  {
    key: "918",
    type: 'sad',
    name: "九·一八",
    happenDate: "1931/09/18",
    text: "日本帝国主义侵华的开端",
    bgColor: "#607d8b",
    action1: `九·一八事变，又称奉天事变、柳条湖事件。
    是1931年9月18日日本驻中国东北地区的关东军突然袭击沈阳，以武力侵占东北的事件。
    九·一八事变是由日本蓄意制造并发动的侵华战争，是日本帝国主义企图以武力征服中国的开端，
    是中国抗日战争的起点，标志着中国局部抗战的开始，揭开了第二次世界大战东方战场的序幕。
    九一八事变后，中国人民的局部抗战也标志着世界反法西斯战争的起点。`,
    action2: `勿忘国耻，牢记使命。振兴中华，吾辈自强。`,
  },
];

const brithArr = [
  // {
  //   key: "ljy",
  //   name: "七",
  //   happenDate: "1997/04/30",
  //   text: "一些简单的描述",
  //   bgColor: "",
  // },
  // {
  //   key: "yj",
  //   name: "GAI",
  //   happenDate: "1995/09/28",
  //   text: "一些简单的描述",
  //   bgColor: "",
  // },
  // {
  //   key: "now",
  //   type: 'sad',
  //   name: "today",
  //   happenDate: "1996/10/12",
  //   text: "一些简单的描述",
  //   bgColor: "",
  // },
];

export const dayData = [...nationalDayArr, ...brithArr];

/** 计算天数 */
const getDays = (times) => {
  return Math.ceil(times / oneDay);
};
/** 计算下一次天数 */
const getNextOnceDays = (happenDate) => {
  const brithArr = happenDate.split("/");
  const nowDate = new Date();
  const year = nowDate.getFullYear();
  const thisYearBirth = `${year}/${brithArr[1]}/${brithArr[2]}`;
  const thisYearDiffer = new Date(thisYearBirth).getTime() - nowDate.getTime();

  if (thisYearDiffer < -oneDay) {
    const nextYearBirth = `${year + 1}/${brithArr[1]}/${brithArr[2]}`;
    const nextYearDiffer =
      new Date(nextYearBirth).getTime() - nowDate.getTime();
    const days = getDays(nextYearDiffer);
    return days;
  }
  if (thisYearDiffer > 0) {
    const days = getDays(thisYearDiffer);
    return days;
  }
  return 0;
};
/** 是否是sadDay， 如果是则会 grayscale */
let isSadDay = false;

/** 处理数据 */
export const handleDayData = (List) => {
  const res = List.map((item, index) => {
    const i = (random + index) % colorValues.length;
    const bgColor = item.bgColor || getBgColor(i);
    const nextOnce = getNextOnceDays(item.happenDate);
    if (!isSadDay && nextOnce === 0 && item.type === 'sad') {
      isSadDay = true;
    }
    return {
      ...item,
      bgColor,
      nextOnce: nextOnce,
    };
  })
  return res;
}

// export const dayData = handleDayData([...nationalDayArr, ...brithArr]);
/** TODO: 临时处理，后续优化sadDay */
handleDayData(nationalDayArr)
export const anniversariesData = { isSadDay };
