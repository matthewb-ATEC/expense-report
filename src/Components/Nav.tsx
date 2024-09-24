import { useState } from "react";

const Nav = () => {
    const [selected, setSelected] = useState<String>("Expense Report");

    const handleSelectedChange = (selection: String) => {
        console.log(selection);
        setSelected(selection);
    }

    return (
    <div className="flex space-x-8 text-white text-center p-8">
        <button onClick={() => handleSelectedChange("Expense Report")}><div>Expense Report</div></button>
        <button onClick={() => handleSelectedChange("Report Approval")}><div>Report Approval</div></button>
        <button onClick={() => handleSelectedChange("Unpaid Expenses")}><div>Unpaid Expenses</div></button>
        <button onClick={() => handleSelectedChange("Expense History")}><div>Expense History</div></button>
    </div>);
}

export default Nav;