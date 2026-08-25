import dynamic from "next/dynamic";

const TestimonialsLedger = dynamic(
  () => import("@/Components/TestimonialsLedger"),
  {
    loading: () => (
      <div
        className="mx-auto max-w-6xl min-h-[280px]"
        aria-busy="true"
        aria-label="Loading reviews"
      />
    ),
  }
);

export default function Testimonials() {
  return (
    <section
      className="py-20 bg-blue-50"
      role="region"
      aria-labelledby="testimonials-heading"
      id="testimonials"
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-14">
        <div className="text-center mb-10">
          <h2
            id="testimonials-heading"
            className="text-2xl lg:text-3xl font-bold text-black mb-4"
          >
            Loved by Thousands of Businesses
          </h2>
          <p className="text-xl text-black max-w-3xl mx-auto">
            See what our customers have to say about their experience with
            Emailverifier.io
          </p>
        </div>

        <TestimonialsLedger />
      </div>
    </section>
  );
}
