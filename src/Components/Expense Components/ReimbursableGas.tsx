import React, { useState } from "react";

const ReimbursableGas: React.FC = () => {
  // Reimbursable Gas specific fields
  const [taxable, setTaxable] = useState<boolean>(false);

  return (
    <>
      <label>Taxable:</label>
      <input
        type="checkbox"
        id="taxable"
        checked={taxable}
        onChange={(e) => setTaxable(e.target.checked)}
      />
    </>
  );
};

export default ReimbursableGas;
