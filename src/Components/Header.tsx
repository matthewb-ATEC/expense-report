import React from "react";

const Header: React.FC = () => {
  return (
    <div className="flex flex-col space-y-4 w-full items-center justify-center p-8 bg-white shadow-lg">
      <img
        className="h-16"
        src="/images/ATEC Pantone Colors-hort.png"
        alt="AdvanceTEC"
      />
      <div className="text-xl font-semibold">Expense Report Form</div>
      <div className="text-xs text-gray-500">
        Use this form to create and submit an expense report for approval.
      </div>
    </div>
  );
};

export default Header;
