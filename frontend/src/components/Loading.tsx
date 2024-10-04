/**
 * @file Loading.tsx - frontend/src/components
 * @description This component is displayed when the main component cannot load yet as it requires a response from the server to render
 * @author matthewb
 * @date Created: 2024-10-04 | Last Modified: 2024-10-04
 * @version 1.0.0
 * @license MIT
 * @usage [Add usage information here]
 * @dependencies [Add dependencies here]
 * @relatedFiles [Add related files here]
 */

const Loading = () => {
  return (
    <div className="h-full flex flex-col flex-grow justify-center items-center">
      <div className="p-8 text-3xl font-bold text-black">Loading</div>
      <div className="p-4 text-black">Waiting for response from server...</div>
      <div className="p-4 italic text-gray-400">Not Found</div>
    </div>
  );
};

export default Loading;
