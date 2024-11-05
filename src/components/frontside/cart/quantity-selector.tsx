import { useState } from 'react';

interface QuantitySelectorProps {
  initialQuantity?: number;
  min?: number;
  max?: number;
  onChange: (quantity: number) => void;
}
const QuantitySelector = ({ initialQuantity = 1, min = 1, max = 99, onChange }: QuantitySelectorProps) => {
  const [quantity, setQuantity] = useState(initialQuantity);

  const handleDecrease = () => {
    if (quantity > min) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      onChange(newQuantity);
    }
  };

  const handleIncrease = () => {
    if (quantity < max) {
      const newQuantity = quantity + 1;
      setQuantity(newQuantity);
      onChange(newQuantity);
    }
  };

  return (
    <div className="flex h-9 flex-row items-center rounded-full  border-neutral-200 dark:border-neutral-700 border ">
      <button onClick={handleDecrease} disabled={quantity <= min} className="px-2 py-1 ">
        -
      </button>
      <input type="text" value={quantity} readOnly className="w-12 text-center bg-white dark:bg-gray-900 " />
      <button onClick={handleIncrease} disabled={quantity >= max} className="px-2 py-1 ">
        +
      </button>
    </div>
  );
};

export default QuantitySelector;
