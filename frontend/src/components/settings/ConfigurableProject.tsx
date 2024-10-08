interface ProjectProps {
  name: string;
  number: string;
  isAdmin: boolean;
  onChange: (newValue: number) => void;
}

const ConfigurableProject: React.FC<ProjectProps> = ({
  name,
  value,
  isAdmin,
  onChange,
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [newValue, setNewValue] = useState<string>(String(value));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("New value", e.target.value);
    const value = parseFloat(e.target.value);
    setNewValue(e.target.value);
    onChange(value);
  };
  return (
    <div className="w-full">
      {!isAdmin ? (
        <div className="flex justify-between space-x-4">
          <div>
            {project.number} - {project.name}
          </div>
          <button
            className="text-ATECblue transform transition-transform duration-300 ease-in-out hover:scale-105"
            onClick={() => {
              console.log("Edit");
            }}
          >
            Edit
          </button>
        </div>
      ) : (
        <div>
          {project.number} - {project.name}
        </div>
      )}
    </div>
  );
};

export default ConfigurableProject;
