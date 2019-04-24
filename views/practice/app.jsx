import React, { Component } from 'react';
import utils from '../../public/js/utils';
import './app.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tmList: [
        {
          baseId: 'f1903',
          da: '错',
          errRate: 0.030191,
          know: '1019,1111',
          sortId: 1501,
          star: 1,
          stfx: '《中华人民共和国道路交通安全法》第四十八条规定：在没有中心隔离设,施或者没有中心线的道路上，夜间会车应当在距相对方向来车150米以外改用近光,灯。途中车辆并没有在150米外切换近光灯，距离这么近仍是远光灯，因此是错误,的行为。',
          tk: 'kmy',
          tm: '轮胎气压过低时，高速行驶轮胎会出现波浪变形温度升高而导致什么？<br/>A、气压不稳<br/>B、气压更低<br/>C、行驶阻力增大<br/>D、爆胎',
          tp: '/SU/o9d85b9bfce065b74a9e9fab423a5e9eb',
          tx: 1,
        },
      ],
      nowIndex: 0,
    };
  }

  render() {
    const { tmList, nowIndex } = this.state;
    const tmDetail = tmList[nowIndex];
    const fixedTmDetail = utils.quesDetailParser(tmDetail);
    return (
      <div className="app">
        <QuestionDetail tmDetail={fixedTmDetail} />
        <QuestionList tmList={tmList} />
      </div>
    );
  }
}

/**
 * 题目详情
 */
class QuestionDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.props,
      uAnswer: '',
    };
    this.handleRadio = this.handleRadio.bind(this);
  }

  // 处理单选型(单选/判断)
  handleRadio(uAnswer) {
    console.log('uAnswer', uAnswer, this);
    this.setState({
      uAnswer,
    });
  }

  render() {
    const { tmDetail, uAnswer } = this.state;
    return (
      <div className="question-detail">
        <div className="ques-title">
          {tmDetail.tmTitle}
        </div>
        {tmDetail.url ? <img className="pic" src={tmDetail.url} alt="试题图片" /> : null }
        {uAnswer ? <StaticAnswer tmDetail={tmDetail} uAnswer={uAnswer} />
          : <AnswerBtn tmDetail={tmDetail} handleRadio={this.handleRadio} />}
      </div>
    );
  }
}

/**
 * 选项按钮
 */
class AnswerBtn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.props,
    };
    this.handleRadio = this.handleRadio.bind(this);
  }

  // 处理单选型(单选/判断)
  handleRadio(uAnswer) {
    const { handleRadio } = this.props;
    console.log(this);
    handleRadio(uAnswer);
  }

  render() {
    const { tmDetail } = this.state;
    let options = null;
    if (tmDetail.tx == 1) {
      options = tmDetail.options.map((option, index) => <div className="radio" key={index} onClick={this.handleRadio.bind(this, option)}>{option}</div>);
    } else if (tmDetail.tx == 2) {
      options = tmDetail.options.map((option, index) => <div className="radio" key={index} onClick={this.handleRadio.bind(this, option)}>{option}</div>);
    } else if (tmDetail.tx == 3) {

    }
    return (
      <div className="answer-btn">
        {tmDetail.tx == 1 ? (
          <div className="judge">
            {options}
          </div>
        ) : null}
        {tmDetail.tx == 2 ? (
          <div className="radios">
            {options}
          </div>
        ) : null}
        {tmDetail.tx == 3 ? (
          <div className="judge">
            <div className="judge-t">正确</div>
            <div className="judge-f">错误</div>
          </div>
        ) : null}
      </div>
    );
  }
}

/**
 * 静态展示已回答选项
 */
class StaticAnswer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.props,
      stateClassName: {
        0: 'normal', // 未选择前状态
        1: 'right', // 正确
        2: 'error', // 错误
        3: 'miss', // 漏选
      },
      optionStates: [],
    };
  }

  componentDidMount() {
    this.compareAnswer();
  }

  // 比较正确答案
  compareAnswer() {
    const { uAnswer, tmDetail } = this.state;
    const answer = tmDetail.da;
    console.log(tmDetail, uAnswer);
  }

  render() {
    const { tmDetail, optionStates, stateClassName } = this.state;
    let options = null;
    if (tmDetail.tx == 1) {
      options = tmDetail.options.map((option, index) => <div className={`judge-t ${stateClassName[optionStates[0]]}`} key={index}>{option}</div>);
    } else if (tmDetail.tx == 2) {
      options = tmDetail.options.map((option, index) => <div className={`radio ${stateClassName[optionStates[index]]}`} key={index}>{option}</div>);
    } else if (tmDetail.tx == 3) {

    }
    return (
      <div className="answer-btn">
        {tmDetail.tx == 1 ? (
          <div className="judge">
            {options}
          </div>
        ) : null}
        {tmDetail.tx == 2 ? (
          <div className="radios">
            {options}
          </div>
        ) : null}
        {tmDetail.tx == 3 ? (
          <div className="judge">
            <div className="judge-t">正确</div>
            <div className="judge-f">错误</div>
          </div>
        ) : null}
      </div>
    );
  }
}

/**
 * 答题卡
 */
class QuestionList extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div className="ques-title">
        1.测试测试测试测试
      </div>
    );
  }
}

export default App;
