const ITEMS = [
  "Expert Tutoring",
  "*",
  "Online Classes",
  "*",
  "Mathematics",
  "*",
  "Physics",
  "*",
  "Chemistry",
  "*",
  "Computer Science",
  "*",
  "Flexible Scheduling",
  "*",
  "Verified Tutors",
  "*",
  "Book Now",
  "*",
];

export default function MarqueeHero() {
  return (
    <>
      <div className="flex items-center gap-12 pr-12">
        {ITEMS.map((item, index) => (
          <span key={`a-${index}`}>{item}</span>
        ))}
      </div>
      <div className="flex items-center gap-12 pr-12" aria-hidden="true">
        {ITEMS.map((item, index) => (
          <span key={`b-${index}`}>{item}</span>
        ))}
      </div>
    </>
  );
}
