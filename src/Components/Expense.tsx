import React, { useState } from "react";
import { costCategories } from "../Data/costCategories";

interface Expense {
  // Define any props you expect to pass to this component
}

const Expense: React.FC<Expense> = (props) => {
  // State for the selected date, cost category, and cost code
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [costCode, setCostCode] = useState<string>("");
  const [cost, setCost] = useState<string>("0");

  // Reimbursable Gas specific fields
  const [taxable, setTaxable] = useState<boolean>(false);

  // Client Entertainment and Other specific fields
  const [description, setDescription] = useState<string>("");

  // Per Diem specific fields
  const [breakfast, setBreakfast] = useState<string>("0");
  const [lunch, setLunch] = useState<string>("0");
  const [dinner, setDinner] = useState<string>("0");

  // Milage specific fields
  const [purpose, setPurpose] = useState<string>("");
  const [fromLocation, setFromLocation] = useState<string>("");
  const [toLocation, setToLocation] = useState<string>("");
  const [milage, setMilage] = useState<string>("0");
  const [roundTrip, setRoundTrip] = useState<boolean>(false);

  // Handle category selection and update the cost code accordingly
  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const category = event.target.value;
    setSelectedCategory(category);

    // Find the cost code for the selected category
    const selectedCostCode =
      costCategories.find((item) => item.category === category)?.costCode || "";
    setCostCode(selectedCostCode);
  };

  // Check if the selected category has a cost code by default
  const hasDefaultCostCode = () => {
    return costCategories.find(
      (item) => item.category === selectedCategory && item.costCode
    );
  };

  return (
    <>
      {/* Date Picker */}
      <div>
        <label htmlFor="date">Date:</label>
        <input
          type="date"
          id="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </div>

      {/* Cost Category Dropdown */}
      <div>
        <label htmlFor="costCategory">Cost Category:</label>
        <select
          id="costCategory"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          <option value="" disabled>
            Select a category
          </option>
          {costCategories.map((costCategory, index) => (
            <option key={index} value={costCategory.category}>
              {costCategory.category}
            </option>
          ))}
        </select>
      </div>

      {/* Conditional Rendering for Cost Code */}
      {selectedCategory != "" && (
        <div>
          <label htmlFor="costCode">Cost Code:</label>
          {hasDefaultCostCode() ? (
            <div id="costCode">{costCode}</div>
          ) : (
            <input
              type="text"
              id="costCode"
              value={costCode}
              onChange={(e) => setCostCode(e.target.value)}
              placeholder="Enter cost code"
            />
          )}
        </div>
      )}

      {/*Conditional Rendering for Reimburable Gas*/}
      {selectedCategory === "Reimbursable Gas" && (
        <>
          <label>Taxable:</label>
          <input
            type="checkbox"
            id="taxable"
            checked={taxable}
            onChange={(e) => setTaxable(e.target.checked)}
          />
        </>
      )}

      {/*Conditional Rendering for Client Entertainment*/}
      {selectedCategory === "Client Entertainment" && (
        <>
          <label>Description:</label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </>
      )}

      {/*Conditional Rendering for Per Diem*/}
      {selectedCategory === "Per Diem" && (
        <>
          <label>Breakfast:</label>
          <input
            type="number"
            id="breakfast"
            value={breakfast}
            onChange={(e) => {
              const value = parseFloat(e.target.value);
              if (value >= 0) {
                setBreakfast(value.toFixed(2)); // Format to two decimal places
              }
            }}
          />

          <label>Lunch:</label>
          <input
            type="number"
            id="lunch"
            value={lunch}
            onChange={(e) => {
              const value = parseFloat(e.target.value);
              if (value >= 0) {
                setLunch(value.toFixed(2)); // Format to two decimal places
              }
            }}
          />

          <label>Dinner:</label>
          <input
            type="number"
            id="dinner"
            value={dinner}
            onChange={(e) => {
              const value = parseFloat(e.target.value);
              if (value >= 0) {
                setDinner(value.toFixed(2)); // Format to two decimal places
              }
            }}
          />
        </>
      )}

      {/* Conditional Rendering for Milage*/}
      {selectedCategory === "Milage" && (
        <>
          <label>Purpose:</label>
          <select
            id="purpose"
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
          >
            <option value="" disabled>
              Select a category
            </option>
            <option value="Business">Business</option>
            <option value="Personal">Personal</option>
          </select>

          <label>From:</label>
          <input
            type="text"
            id="from"
            value={fromLocation}
            onChange={(e) => setFromLocation(e.target.value)}
          />

          <label>To:</label>
          <input
            type="text"
            id="to"
            value={toLocation}
            onChange={(e) => setToLocation(e.target.value)}
          />

          <label>Milage:</label>
          <input
            type="number"
            id="milage"
            value={milage}
            onChange={(e) => {
              const value = Number(e.target.value);
              if (value >= 0) {
                setMilage(value.toString());
              }
            }}
          />

          <label>Round Trip</label>
          <input
            type="checkbox"
            id="roundTrip"
            checked={roundTrip}
            onChange={(e) => setRoundTrip(e.target.checked)}
          />
        </>
      )}

      {/*Conditional Rendering for Client Entertainment*/}
      {selectedCategory === "Other" && (
        <>
          <label>Description:</label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </>
      )}

      {/*Conditional Rendering for Job Site Description*/}
      {selectedCategory === "Job Site Material" && (
        <>
          <label>Description:</label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </>
      )}

      {selectedCategory != "" &&
        selectedCategory != "Milage" &&
        selectedCategory != "Per Diem" && (
          <>
            <label>Cost:</label>
            <input
              type="number"
              id="cost"
              value={cost}
              onChange={(e) => {
                const value = Number(e.target.value);
                if (value >= 0) {
                  setCost(value.toString());
                }
              }}
            />
          </>
        )}
    </>
  );
};

export default Expense;
