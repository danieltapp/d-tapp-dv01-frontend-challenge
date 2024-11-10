import React from "react";

interface ErrorMessageProps {
  errorType?: "generic" | "no-data";
}

/**
 * ErrorMessage component displays an error message based on the provided error type.
 *
 * @component
 * @param {ErrorMessageProps} props - The properties for the ErrorMessage component.
 * @param {string} props.errorType - The type of error to display. Can be "generic", "no-data", or any other string for a default error message.
 * @returns {JSX.Element} A div containing the appropriate error message.
 */
const ErrorMessage: React.FC<ErrorMessageProps> = ({ errorType }) => {
  const getMessage = () => {
    switch (errorType) {
      case "generic":
        return "An error has occurred. Please try again. 😞";
      case "no-data":
        return "No data available for the selected filters. Please try resetting the filters or choose a different combination. 😊";
      default:
        return "Something went wrong. 😢";
    }
  };
  const message = getMessage();
  return (
    <div
      data-testid="error-message"
      className="space-y-6 w-full max-w-full"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      {message}
    </div>
  );
};

export default ErrorMessage;
