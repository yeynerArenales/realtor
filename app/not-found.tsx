import { CustomButton, Heading } from "./components/atoms";
import { ErrorLayout } from "./components/organisms";

export default function NotFound() {
  return (
    <ErrorLayout
      title="404 Page Not Found"
      subtitle="Sorry, the page you are looking for doesn't exist or has been moved."
    >
      <CustomButton href="/">Go Back Home</CustomButton>
    </ErrorLayout>
  );
}
