import { Link } from "react-router-dom";

interface NavButtonProps {
  to?: string;
  label: string;
  direction?: "left" | "right";
  ariaLabel?: string;
  className?: string;
  disabled?: boolean;
}

export default function NavButton({
  to,
  label,
  direction = "right",
  ariaLabel,
  className = "",
  disabled = false,
}: NavButtonProps) {
  const content = (
    <>
      {direction === "left" && <span className="arrow">&lt;</span>}
      <span className="label">{label}</span>
      {direction === "right" && <span className="arrow">&gt;</span>}
    </>
  );

  if (disabled) {
    return (
      <span
        className={`nav-button ${className} ${direction} disabled`}
        role="link"
        aria-disabled="true"
        tabIndex={-1}
      >
        {content}
      </span>
    );
  }

  return (
    <Link
      className={`nav-button ${className} ${direction}`}
      to={to || "#"}
      aria-label={ariaLabel || label}
    >
      {content}
    </Link>
  );
}
