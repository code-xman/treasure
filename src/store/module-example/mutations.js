export function someMutation (/* state */) {
}
/** 更新‘一个’数据 */
export const updateOneData = (state, data) => {
  state.oneData = data;
}
/** 更新hotData数据 */
export const updateHotData = (state, data) => {
  state.hotData = data;
}

/** 更新sayToday数据 */
export const updateSayToday = (state, data) => {
  state.sayTodayData = data;
}

/** 更新anniversariesData数据 */
export const updateAnniversariesData = (state, data) => {
  state.anniversariesData = data;
}
