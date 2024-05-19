import { useState } from 'react';
import './App.css';
import { MultiSelect } from './components/MultiSelect/MultiSelect';

export const App = () => {
  const [selectItem, setSelectItem] = useState([
    { label: "Education", emoji: "🎓" },
    { label: "Yeeeah, science!", emoji: "🧪" },
    { label: "Art", emoji: "🎨" },
    { label: "Sport", emoji: "⚽" },
    { label: "Games", emoji: "🎮" },
    { label: "Health", emoji: "🏥" }
  ]);

  return (
    <div className="App">
      <MultiSelect
        categories={selectItem}
        setCategories={setSelectItem}
      />
    </div>
  );
};
