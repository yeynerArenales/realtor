import { Container } from "../atoms";

export default function Footer() {
  return (
    <footer className="bg-stone-100 text-stone-800 border-t border-stone-300">
      <Container className="py-6">
        <div className="flex flex-col items-center justify-center gap-2">
          <p className="text-sm text-stone-600">
            © {new Date().getFullYear()} Realtor. All rights reserved.
          </p>
          <p className="text-xs text-stone-500">
            Your trusted real estate partner
          </p>
        </div>
      </Container>
    </footer>
  );
}
