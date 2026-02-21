import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type Props = {
  searchParams?: {
    type?: string;
  };
};

export default function QueriesFeedbackConfirmedPage({ searchParams }: Props) {
  const type = (searchParams?.type ?? "").toLowerCase();
  const isQuery = type === "query";

  return (
    <>
      <Navbar />
      <main className="container-max py-12">
        <div className="mx-auto max-w-2xl rounded-2xl border border-sage/60 bg-white p-8 shadow-soft">
          <h1 className="text-3xl font-semibold text-charcoal" style={{ fontFamily: "var(--font-playfair)" }}>
            {isQuery ? "Query Submitted Successfully" : "Feedback Submitted Successfully"}
          </h1>
          <p className="mt-4 text-charcoal/80">
            {isQuery
              ? "Our team will respond to your query as soon as possible."
              : "Thank you for your valuable feedback. We appreciate your support."}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/" className="btn-primary">
              Back to Home
            </Link>
            <Link href="/queries-feedback" className="btn-outline">
              Submit Another
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
