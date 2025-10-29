import { Heading, Container } from "./components/atoms";

export default function Home() {
  return (
    <Container className="py-6 sm:py-8">
      <Heading as="h1" variant="display">
        Properties
      </Heading>
    </Container>
  );
}
