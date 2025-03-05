"use client";
import React, { useState } from "react";

interface TodoItem {
  type: "Fruit" | "Vegetable";
  name: string;
}

const initialDatas: TodoItem[] = [
  { type: "Fruit", name: "Apple" },
  { type: "Vegetable", name: "Broccoli" },
  { type: "Vegetable", name: "Mushroom" },
  { type: "Fruit", name: "Banana" },
  { type: "Vegetable", name: "Tomato" },
  { type: "Fruit", name: "Orange" },
  { type: "Fruit", name: "Mango" },
  { type: "Fruit", name: "Pineapple" },
  { type: "Vegetable", name: "Cucumber" },
  { type: "Fruit", name: "Watermelon" },
  { type: "Vegetable", name: "Carrot" },
];

const Home: React.FC = () => {
  const [mainList, setMainList] = useState<TodoItem[]>(initialDatas);
  const [fruits, setFruits] = useState<TodoItem[]>([]);
  const [vegetables, setVegetables] = useState<TodoItem[]>([]);
  const timeouts: { [key: string]: NodeJS.Timeout } = {};
console.log('timeouts>>>',timeouts);

  const moveToColumn = (item: TodoItem) => {
    setMainList((prev) => prev.filter((todo) => todo !== item));
    updateColumn(item, true);
    const timeoutId = setTimeout(() => moveBackToMain(item), 5000);
    timeouts[item.name] = timeoutId;
  };

  const moveBackToMain = (item: TodoItem) => {
    if (timeouts[item.name]) {
      clearTimeout(timeouts[item.name]);
      delete timeouts[item.name];
    }
    updateColumn(item, false);
    setMainList((prev) => [...prev, item]);
  };

  const updateColumn = (item: TodoItem, add: boolean) => {
    if (item.type === "Fruit") {
      setFruits((prev) =>
        add ? [...prev, item] : prev.filter((fruit) => fruit !== item)
      );
    } else {
      setVegetables((prev) =>
        add ? [...prev, item] : prev.filter((veg) => veg !== item)
      );
    }
  };

  const handleImmediateReturn = (item: TodoItem) => {
    moveBackToMain(item);
  };

  return (
    <div className="p-6 grid grid-cols-3 gap-4">
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">List</h2>
        <div>
          {mainList.map((item, index) => (
            <button
              key={index}
              className="w-full mb-2 border p-2"
              onClick={() => moveToColumn(item)}
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Fruits</h2>
        {fruits.map((item, index) => (
          <button
            key={index}
            className="w-full mb-2 border p-2"
            onClick={() => handleImmediateReturn(item)}
          >
            {item.name}
          </button>
        ))}
      </div>

      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Vegetables</h2>
        {vegetables.map((item, index) => (
          <button
            key={index}
            className="w-full mb-2 border p-2"
            onClick={() => handleImmediateReturn(item)}
          >
            {item.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Home;
