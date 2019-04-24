export default {
  // 处理题目信息
  quesDetailParser(quesDetail) {
    const fixedQuesDetail = {
      ...quesDetail,
    };
    // 单选多选需要解析选项
    if (quesDetail.tx == 2 || quesDetail.tx == 3) {
      fixedQuesDetail.tmTitle = quesDetail.tm.split('<br/>')[0];
      const options = quesDetail.tm.split('<br/>').slice(1);
      fixedQuesDetail.options = options;
    } else if (quesDetail.tx == 1) { // 判断题不需解析,但为了保持一致
      fixedQuesDetail.tmTitle = quesDetail.tm;
      fixedQuesDetail.options = ['A、正确', 'B、错误'];
    }
    // 处理图片url
    if (quesDetail.tp) {
      fixedQuesDetail.url = this.imgUrlParser(quesDetail.tp);
    }
    return fixedQuesDetail;
  },
  // 处理图片url
  imgUrlParser(url) {
    let fixedUrl = url;
    if (url.indexOf('/SU/') > -1) {
      fixedUrl = url.replace('/SU/', 'https://sucimg.itc.cn/sblog/large/');
    }
    console.log('fixedUrl', `%c ${fixedUrl}`, 'color:#00ff00');
    return fixedUrl;
  },
};
