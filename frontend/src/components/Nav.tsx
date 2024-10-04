import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <div className="p-4 w-full flex space-x-8 justify-end bg-ATECblue text-white">
      <Link to={`/report`}>Expense Report</Link>
      <Link to={`/settings`}>Settings</Link>
    </div>
  );
};

export default Nav;
