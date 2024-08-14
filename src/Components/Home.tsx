import React from 'react';
import Project from './Project';
import Expense from './Expense';

interface HomeProps {
  // Define any props you expect to pass to this component
}

const Home: React.FC<HomeProps> = (props) => {
  // You can define any state or handlers here

  const projects = [
    {id: 0},
    {id: 1},
    {id: 2},
    {id: 3},
  ]

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle form submission logic
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" />
      </div>
    
      {projects.map((project) => (
        <div key={project.id}>
          <Project />
        </div>
      ))}

    </form>
  );
};

export default Home;
