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
    <>
      <label className="mr-4 text-nowrap">Taxable</label>
      <input
        type="checkbox"
        id="taxable"
        checked={taxable}
        onChange={handleTaxableChange}
      />
    </>
  );
};

export default ReimbursableGas;
