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
  const text = ITEMS.join("  ");

  return (
    <>
      <span>{text}</span>
      <span aria-hidden="true" className="ml-12">
        {text}
      </span>
    </>
  );
}
