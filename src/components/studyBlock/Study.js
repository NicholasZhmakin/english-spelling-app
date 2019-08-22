import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Hint from "./Hint";
import { checkWord } from "../../actions/wordActions/checkWord";

class Study extends Component {
  state = {
    shuffleArray: null,
    currentWord: null,
    userAnswer: "",
    originWord: "",
    correctSpelling: false,
    isHintOn: false,
    result: "",
    resultType: "",
    activeBtn: true,
    isLearnt: null
  };

  handleChange = e => {
    this.setState({
      userAnswer: e.target.value
    });
  };

  shuffle = array => {
    let currentIndex = array.length;
    let temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    if (array[0] !== undefined) {
      this.setState({
        shuffleArray: array,
        currentWord: array[0],
        isLearnt: array[0].isLearnt
      });
    } else {
      this.setState({
        shuffleArray: array,
        currentWord: array[0]
      });
    }
  };

  checkingAnswer = e => {
    e.preventDefault();
    const currentWord = this.state.currentWord.origin.toUpperCase();
    const userAnswer = this.state.userAnswer.toUpperCase();
    const arrayFromWord = currentWord.split("");
    const arrayFromAnswer = userAnswer.split("");
    this.setState(
      {
        correctSpelling: this.compareArray(arrayFromWord, arrayFromAnswer)
      },
      () => this.nextWord()
    );
  };

  compareArray = (arr1, arr2) => {
    if (arr1.length !== arr2.length) return false;
    for (var i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) return false;
    }

    return true;
  };

  nextWord = () => {
    if (this.state.correctSpelling) {
      this.setState(
        {
          originWord: this.state.currentWord.origin,
          result: "good for you",
          resultType: "right",
          isHintOn: false,
          activeBtn: false
        },
        () => {
          setTimeout(() => {
            this.hideLetter();
            let newArray = this.state.shuffleArray.slice(1);
            if (newArray[0] !== undefined) {
              this.setState({
                shuffleArray: newArray,
                currentWord: newArray[0],
                isLearnt: newArray[0].isLearnt,
                userAnswer: "",
                originWord: "",
                result: "",
                resultType: "",
                activeBtn: true
              });
            } else {
              this.setState({
                shuffleArray: newArray,
                currentWord: newArray[0],
                userAnswer: "",
                originWord: "",
                result: "",
                resultType: "",
                activeBtn: true
              });
            }
          }, 2000);
        }
      );
    } else {
      this.setState(
        {
          userAnswer: "",
          result: "wrong, pls try again",
          resultType: "wrong"
        },
        () => {
          setTimeout(() => {
            this.setState({
              result: "",
              resultType: ""
            });
          }, 1500);
        }
      );
    }
  };

  skipWord = () => {
    this.setState(
      {
        originWord: this.state.shuffleArray[0].origin,
        result: "remember next time",
        resultType: "remember",
        isHintOn: false,
        activeBtn: false
      },
      () => {
        setTimeout(() => {
          this.hideLetter();
          let newArray = this.state.shuffleArray.slice(1);
          if (newArray[0] !== undefined) {
            this.setState({
              shuffleArray: newArray,
              currentWord: newArray[0],
              isLearnt: newArray[0].isLearnt,
              userAnswer: "",
              originWord: "",
              result: "",
              resultType: "",
              activeBtn: true
            });
          } else {
            this.setState({
              shuffleArray: newArray,
              currentWord: newArray[0],
              userAnswer: "",
              originWord: "",
              result: "",
              resultType: "",
              activeBtn: true
            });
          }
        }, 3000);
      }
    );
  };

  showHint = () => {
    this.setState({
      isHintOn: !this.state.isHintOn
    });
  };

  hideLetter = () => {
    const element = document.querySelectorAll(".hint__letter-front");
    element.forEach(el => {
      el.classList.remove("hint__showLetter");
    });
  };

  handleCheck = () => {
    this.setState(
      {
        isLearnt: !this.state.isLearnt
      },
      () => {
        this.props.checkWord(this.props.category.id, this.state.currentWord.id);
      }
    );
  };

  render() {
    let mainBox;
    if (this.state.currentWord === undefined) {
      mainBox = (
        <div className="study__title study__content">
          <h1>All words was succesfully learned</h1>
          <Link to="/categories">back to categories</Link>
        </div>
      );
    } else if (this.state.currentWord === null) {
      mainBox = (
        <div className="study__title study__content">
          <h1>{this.props.category.name}</h1>
          <button onClick={() => this.shuffle(this.props.wordsToStudy)}>
            start
          </button>
        </div>
      );
    } else {
      mainBox = (
        <div className="study__process study__content">
          <Link
            className="study__stop-btn"
            to={"/categories/" + this.props.category.id}
          >
            <i className="fas fa-times" />
          </Link>

          <button
            disabled={!this.state.activeBtn}
            className="study__skip-btn"
            onClick={this.skipWord}
          >
            <span className="study__skip-tooltip">skip</span>
            <i className="fas fa-chevron-right" />
            <i className="fas fa-chevron-right" />
          </button>

          <label className="details__checkbox study__checkbox">
            <input
              onChange={this.handleCheck}
              type="checkbox"
              checked={this.state.isLearnt || false}
            />
            <span className="study__checkbox-tooltip">
              Check it if you already memorized this word
            </span>
          </label>

          <h1>{this.state.currentWord.translation}</h1>
          <h1>{this.state.originWord}</h1>
          <form disabled={!this.state.activeBtn} onSubmit={this.checkingAnswer}>
            <input
              onChange={this.handleChange}
              type="text"
              autoComplete="off"
              value={this.state.userAnswer}
            />
            <button
              disabled={!this.state.activeBtn}
              className="study__check-btn"
              onClick={this.checkingAnswer}
            >
              check
            </button>
          </form>

          <Hint
            isHintOn={this.state.isHintOn}
            origin={this.state.currentWord.origin}
            showHint={this.showHint}
          />

          <p className={`study__result ${this.state.resultType} `}>
            {this.state.result}
          </p>
        </div>
      );
    }

    return <section className="study">{mainBox}</section>;
  }
}

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.category_id;
  return {
    wordsToStudy: state.mainR.categories
      .find(el => el.id === id)
      .words.filter(word => word.isLearnt !== true),
    category: state.mainR.categories.find(el => el.id === id)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    checkWord: (categoryId, wordId) => dispatch(checkWord(categoryId, wordId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Study);
