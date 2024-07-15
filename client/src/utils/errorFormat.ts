export const errorFormat = (error: any): string => {
  // Check for axios response error
  if (
    typeof error === "object" &&
    error !== null &&
    "response" in error &&
    typeof error.response === "object" &&
    error.response !== null &&
    "data" in error.response &&
    typeof error.response.data === "object" &&
    error.response.data !== null
  ) {
    const responseData = error.response.data;
    if ("message" in responseData) {
      return (responseData as { message: string }).message;
    }
    if ("error" in responseData) {
      return (responseData as { error: string }).error;
    }
  }

  // Check if error is an instance of Error
  if (error instanceof Error) {
    return error.message;
  }

  // Check if error has a message property
  if (typeof error === "object" && error !== null && "message" in error) {
    return (error as { message: string }).message;
  }

  // Check for fetch API errors
  if (typeof error === "object" && error !== null && "statusText" in error) {
    return (error as { statusText: string }).statusText;
  }

  // Check for string errors
  if (typeof error === "string") {
    return error;
  }

  // Default error message
  return "Something went wrong!";
};
