import Link from "next/link";

const columns = [
  {
    title: "Explore",
    links: [
      { href: "/characters", label: "Characters" },
      { href: "/stories", label: "Stories" },
      { href: "/games", label: "Games" },
    ],
  },
  {
    title: "Community",
    links: [
      { href: "/schools", label: "Schools" },
      { href: "/creators", label: "Creators" },
      { href: "/join-us", label: "Join Us" },
    ],
  },
  {
    title: "About",
    links: [{ href: "/about", label: "Our Story" }],
  },
];

/** Site footer with a hand-stitched phulkari-pattern top border. */
export function Footer() {
  return (
    <footer className="mt-auto bg-navy text-paper">
      {/* Phulkari-inspired stitched border */}
      <div
        className="h-3 w-full"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, var(--color-terracotta) 0 10px, var(--color-marigold) 10px 20px, var(--color-leaf) 20px 30px)",
        }}
        aria-hidden
      />

      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <p className="font-display text-2xl font-bold text-marigold">Ajjo Khediye</p>
          <p className="mt-2 text-sm text-paper/70 max-w-xs">
            A living Punjabi storybook, building a digital home for language,
            culture, and play.
          </p>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <p className="font-display font-semibold text-sm uppercase tracking-wide text-leaf-soft">
              {col.title}
            </p>
            <ul className="mt-3 space-y-2">
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-paper/80 hover:text-marigold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="max-w-6xl mx-auto px-6 pb-8 text-xs text-paper/50">
        © {new Date().getFullYear()} Ajjo Khediye · ਅੱਜੋ ਖੇਡੀਏ
      </div>
    </footer>
  );
}
