import React, { useState } from "react";

const ShowWinnerBtn = ({items}) => {
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState("Відкрити переможця");

  const toggleVisibility = () => {
    setVisible((prevState) => !prevState);
  };

  const { maxItem, maxIndex } = items.reduce(
    (acc, item, index) => {
      if (item.smile > acc.maxItem.smile) {
        return { maxItem: item, maxIndex: index };
      }
      return acc;
    },
    { maxItem: items[0], maxIndex: 0 }
  );

  if (!items || items.length === 0 || maxItem.smile === 0) {
    return <p>Поки що немає переможця.</p>;
  }
  return (
    <div className="wrapper">
      {maxItem.smile ? (
        <button
          style={{ backgroundColor: "green", color: "white" }}
          onClick={() => toggleVisibility()}
        >
          {visible ? "Закрити інформаційне вікно" : title}
        </button>
      ) : null}

      {visible && maxItem.smile > 0 ? (
        <div>
          <h3>Результати голосування</h3>
          <p>Переможець:</p>
          <h1>{items[maxIndex].content}</h1>
          <p>Кількість голосів: {maxItem.smile}</p>
        </div>
      ) : null}
    </div>
  );
};

export default ShowWinnerBtn;
