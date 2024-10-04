/**
 * @file ErrorPage.tsx - ./frontend/src/components
 * @description The `ErrorPage` component provides a user-friendly interface for displaying error messages when an unexpected issue occurs in the application. It serves as a fallback UI for cases such as 404 errors or other unforeseen errors, guiding users with a clear message about the problem.
 * @author matthewb
 * @date Created: 2024-10-01 | Last Modified: 2024-10-01
 * @version 1.0.0
 * @license MIT
 * @usage Use this component as a fallback error page in your React Router configuration or when catching errors in your application. Example usage:
 *        `<Route path="*" element={<ErrorPage />} />`
 * @dependencies React for creating functional components.
 * @relatedFiles This component may be related to other error handling components, such as `NotFound.tsx` or global error handlers.
 */

const ErrorPage = () => {
  return (
    <div className="h-screen flex flex-col flex-grow justify-center items-center">
      <div className="p-8 text-3xl font-bold text-black">Oops!</div>
      <div className="p-4 text-black">
        Sorry, an unexpected error has occurred.
      </div>
      <div className="p-4 italic text-gray-400">Not Found</div>
    </div>
  );
};

export default ErrorPage;
