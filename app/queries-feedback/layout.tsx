import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Queries and Feedback",
  description:
    "Submit your treatment-related query or share feedback with Sai Jagruthi Homeopathy Clinic. Our team responds promptly.",
  alternates: {
    canonical: "/queries-feedback",
  },
};

export default function QueriesFeedbackLayout({ children }: { children: React.ReactNode }) {
  return children;
}
