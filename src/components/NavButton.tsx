import { Link } from "react-router-dom";

interface NavButtonProps {
  to: string;
  label: string;
  direction?: "left" | "right";
  ariaLabel?: string;
  className?: string;
}

export default function NavButton({
  to,
  label,
  direction = "right",
  ariaLabel,
  className = "",
}: NavButtonProps) {
  return (
    <Link
      className={`nav-button ${className} ${direction}`}
      to={to}
      aria-label={ariaLabel || label}
    >
      {direction === "left" && <span className="arrow">←</span>}
      <span className="label">{label}</span>
      {direction === "right" && <span className="arrow">→</span>}
    </Link>
  );
}
