import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Submission Confirmed",
  description: "Query or feedback submission confirmation page.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function QueriesFeedbackConfirmedLayout({ children }: { children: React.ReactNode }) {
  return children;
}
