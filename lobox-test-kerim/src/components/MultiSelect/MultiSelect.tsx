import './MultiSelect.scss';
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';

type Category = {
  label: string;
  emoji: string;
};

type Props = {
  categories: Category[];
  setCategories: (categories: Category[]) => void;
};

export const MultiSelect: React.FC<Props> = ({ categories, setCategories }) => {
  const [inputValue, setInputValue] = useState('');
  const [openToggler, setOpenToggler] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const onCategoriesHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const onSubmitHandler = (e: FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() !== '') {
      setCategories([...categories, { label: inputValue, emoji: '' }]);
      setInputValue('');
    }
  };

  const onTogglerHandler = () => {
    setOpenToggler(!openToggler);
  };

  const onSelectCategory = (category: Category) => {
    setSelectedCategory(category);
    setInputValue(category.label);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setOpenToggler(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="multi-select" ref={wrapperRef}>
      <form onSubmit={onSubmitHandler}>
        <label>
          <input
            onClick={onTogglerHandler}
            value={inputValue}
            onChange={onCategoriesHandler}
            type="text"
            placeholder="Enter a type"
          />
          <div className={`arrow ${openToggler ? 'down' : 'up'}`} onClick={onTogglerHandler}></div>
        </label>
      </form>

      {openToggler && (
        <div className="multi-select-section">
          {categories.map((category, index) => (
            <p
              key={index}
              onClick={() => onSelectCategory(category)}
              className={selectedCategory?.label === category.label ? 'active' : ''}
            >
              {category.label} {category.emoji}
              {selectedCategory?.label === category.label && (
                <span className="checkmark">✔️</span>
              )}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};
