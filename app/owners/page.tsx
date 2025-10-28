import { Heading, Container } from "../components/atoms";

export default function OwnersPage() {
  return (
    <Container className="py-8 sm:py-12">
      <Heading as="h1" variant="display" className="mb-4">
        Owners
      </Heading>
    </Container>
  );
}
