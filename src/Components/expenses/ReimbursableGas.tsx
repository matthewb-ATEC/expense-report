import React, { useState } from "react";

interface ReimbursableGasProps {
  onUpdate: (updatedData: { taxable: boolean }) => void;
}

const ReimbursableGas: React.FC<ReimbursableGasProps> = ({ onUpdate }) => {
  const [taxable, setTaxable] = useState<boolean>(false);

  const handleTaxableChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedTaxable = e.target.checked;
    setTaxable(updatedTaxable);
    onUpdate({ taxable: updatedTaxable });
  };

  return (
    <div className="flex w-full justify-between">
      <label className="text-gray-600">Taxable</label>
      <input
        type="checkbox"
        id="taxable"
        checked={taxable}
        onChange={handleTaxableChange}
      />
    </div>
  );
};

export default ReimbursableGas;
