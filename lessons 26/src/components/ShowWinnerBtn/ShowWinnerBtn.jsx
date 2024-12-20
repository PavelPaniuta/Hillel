import React, { useState } from "react";

const ShowWinnerBtn = (props) => {
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState("Відкрити переможця");

  const toggleVisibility = () => {
    setVisible((prevState) => !prevState);
  };

  const { maxItem, maxIndex } = props.items.reduce(
    (acc, item, index) => {
      if (item.smile > acc.maxItem.smile) {
        return { maxItem: item, maxIndex: index };
      }
      return acc;
    },
    { maxItem: props.items[0], maxIndex: 0 }
  );

  if (!props.items || props.items.length === 0 || maxItem.smile === 0) {
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
          <h1>{props.items[maxIndex].content}</h1>
          <p>Кількість голосів: {maxItem.smile}</p>
        </div>
      ) : null}
    </div>
  );
};

export default ShowWinnerBtn;
