import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import Smile from "../Smile/Smile";
import ShowWinnerBtn from "../ShowWinnerBtn/ShowWinnerBtn";
import DeleteRes from "../DeleteRes/DeleteRes";

const App = () => {
  const [items, setItems] = useState(() => {
    const savedItems = localStorage.getItem("smile");
    return savedItems
      ? JSON.parse(savedItems)
      : [
          { id: 1, smile: 0, content: "😀" },
          { id: 2, smile: 0, content: "🥰" },
          { id: 3, smile: 0, content: "😍" },
          { id: 4, smile: 0, content: "💘" },
          { id: 5, smile: 0, content: "😚" },
          { id: 6, smile: 0, content: "😇" },
        ];
  });

  const handleSmileClick = (id) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, smile: item.smile + 1 } : item
      )
    );
  };

  const deleteAllInfo = () => {
    setItems([
      { id: 1, smile: 0, content: "😀" },
      { id: 2, smile: 0, content: "🥰" },
      { id: 3, smile: 0, content: "😍" },
      { id: 4, smile: 0, content: "💘" },
      { id: 5, smile: 0, content: "😚" },
      { id: 6, smile: 0, content: "😇" },
    ]);
  };

  useEffect(() => {
    const savedItems = localStorage.getItem("smile");

    if (savedItems) {
      setItems(JSON.parse(savedItems));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("smile", JSON.stringify(items));
  }, [items]);

  return (
    <div className="wrapper">
      <Header text="Голосування за крутіщий смайл" />
      <Smile items={items} handleSmileClick={handleSmileClick} />
      <ShowWinnerBtn items={items} />
      <DeleteRes deleteAllInfo={deleteAllInfo} />
    </div>
  );
};

export default App;
