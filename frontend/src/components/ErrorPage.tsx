const ErrorPage = () => {
  return (
    <div className="flex flex-col flex-grow justify-center items-center">
      <div className="p-8 text-3xl font-bold text-black">Oops!</div>
      <div className="p-4 text-black">
        Sorry, an unexpected error has occurred.
      </div>
      <div className="p-4 italic text-gray-400">Not Found</div>
    </div>
  );
};

export default ErrorPage;
