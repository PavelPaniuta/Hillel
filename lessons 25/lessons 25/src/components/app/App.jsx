import React from "react";
import { Component } from "react";
import Header from "../header/Header";
import Smile from "../smile/Smile";
import BtnShowWinner from "../btnShowWinner/BtnShowWinner";
import DeleteRes from "../deleteRes/DeleteRes";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [
        { id: 1, smile: 0, content: "😀" },
        { id: 2, smile: 0, content: "🥰" },
        { id: 3, smile: 0, content: "😍" },
        { id: 4, smile: 0, content: "💘" },
        { id: 5, smile: 0, content: "😚" },
        { id: 6, smile: 0, content: "😇" },
      ],
    };
  }

  handleSmileClick = (id) => {
    this.setState((prevState) => ({
      items: prevState.items.map((item) =>
        item.id === id ? { ...item, smile: item.smile + 1 } : item
      ),
    }));
  };

  deleteAllInfo = () => {
    this.setState(() => ({
      items: [
        { id: 1, smile: 0, content: "😀" },
        { id: 2, smile: 0, content: "🥰" },
        { id: 3, smile: 0, content: "😍" },
        { id: 4, smile: 0, content: "💘" },
        { id: 5, smile: 0, content: "😚" },
        { id: 6, smile: 0, content: "😇" },
      ],
    }))
  }

  componentDidMount() {
    if (localStorage.getItem("smile") == null) {
      localStorage.setItem("smile", JSON.stringify(this.state.items));
    } else {
      const savedItems = JSON.parse(localStorage.getItem("smile"));
      this.setState({ items: savedItems });
    }
  }

  componentDidUpdate() {
    localStorage.setItem("smile", JSON.stringify(this.state.items));
  }

  render() {
    return (
      <div className="wrapper">
        <Header text={"Голосування за крутіщий смайл"} />
        <Smile
          item={this.state.items}
          handleSmileClick={this.handleSmileClick}
        />
        <BtnShowWinner item={this.state.items} />
        <DeleteRes deleteAllInfo={this.deleteAllInfo}/>
      </div>
    );
  }
}

export default App;
