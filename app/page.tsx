import { Heading, Container } from "./components/atoms";

export default function Home() {
  return (
    <Container className="py-8 sm:py-12">
      <Heading as="h1" variant="display">
        Properties
      </Heading>
    </Container>
  );
}
