import React from "react";
import { Component } from "react";

class BtnShowWinner extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isVisible: false,
      title: "Відкрити переможця",
    };
  }

  toggleVisibility = () => {
    this.setState((prevState) => ({ isVisible: !prevState.isVisible }));
  };

  render() {
    const { maxItem, maxIndex } = this.props.item.reduce(
      (acc, item, index) => {
        if (item.smile > acc.maxItem.smile) {
          return { maxItem: item, maxIndex: index };
        }
        return acc;
      },
      { maxItem: this.props.item[0], maxIndex: 0 }
    );
    return (
      <div className="wrapper">

        {maxItem.smile ? (<button
          style={{ backgroundColor: "green", color: "white" }}
          onClick={() => this.toggleVisibility()}
        >
          {this.state.isVisible
            ? "Закрити інформаційне вікно"
            : this.state.title}
        </button>) : null}
         

        {this.state.isVisible && (maxItem.smile > 0)? (
          <div>
            <h3>Результати голосування</h3>
            <p>Переможець:</p>
            <h1>{this.props.item[maxIndex].content}</h1>
            <p>Кількість голосів: {maxItem.smile}</p>
          </div>
        ) : null}
      </div>
    );
  }
}

export default BtnShowWinner;
