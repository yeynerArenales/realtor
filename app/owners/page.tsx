import { Heading, Container } from "../components/atoms";
import { OwnersContent } from "../components/organisms";

export default function OwnersPage() {
  return (
    <Container className="py-6 sm:py-8">
      <Heading as="h1" variant="display" className="mb-8">
        Owners
      </Heading>

      <OwnersContent />
    </Container>
  );
}
