import React from "react";
import { useLocation } from "react-router-dom";

const headers: Record<string, string> = {
  "/": "Expense Report",
  "/report": "Expense Report",
  "/settings": "Settings",
};

const subheaders: Record<string, string> = {
  "/": "File an expense report using the form below.",
  "/report": "File an expense report using the form below.",
  "/settings": "View and edit the parameters underlying expense calculations.",
};

const Header: React.FC = () => {
  const location = useLocation();

  return (
    <div className="flex flex-col space-y-4 w-full items-center justify-center p-8 bg-white shadow-lg">
      <img
        className="h-16"
        src="/images/ATEC Pantone Colors-hort.png"
        alt="AdvanceTEC"
      />
      <div className="flex flex-col text-center space-y-2">
        <div className="text-2xl font-semibold">
          {headers[location.pathname]}
        </div>
        <div className="text-sm text-gray-500">
          {subheaders[location.pathname]}
        </div>
      </div>
    </div>
  );
};

export default Header;
