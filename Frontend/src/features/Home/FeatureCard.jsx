const FeatureCard = ({ icon, title, description, badge, color }) => {
const colorVariants = {
  violet: {
    bg: "bg-violet-dim",
    border: "border-violet-border",
    text: "text-violet-text",
    topBorder: "hover:border-t-violet",
    shadow: "hover:shadow-[0_0_40px_rgba(124,106,247,0.12)]",
  },
  coral: {
    bg: "bg-coral-dim",
    border: "border-coral-border",
    text: "text-coral-text",
    topBorder: "hover:border-t-coral",
    shadow: "hover:shadow-[0_0_40px_rgba(247,130,106,0.12)]",
  },
  teal: {
    bg: "bg-teal-dim",
    border: "border-teal-border",
    text: "text-teal-text",
    topBorder: "hover:border-t-teal",
    shadow: "hover:shadow-[0_0_40px_rgba(106,247,200,0.12)]",
  },
  purple: {
    bg: "bg-purple-dim",
    border: "border-purple-border",
    text: "text-purple-text",
    topBorder: "hover:border-t-purple",
    shadow: "hover:shadow-[0_0_40px_rgba(196,106,247,0.12)]",
  },
};
  const styles = colorVariants[color] ?? colorVariants.violet;
  return (
    <div
className={`group
  relative
  overflow-hidden
  rounded-3xl
  border border-line
  bg-surface/80
  p-7
  transition-all duration-300
  hover:border-l-transparent
  hover:border-r-transparent
  hover:border-b-transparent
  ${styles.topBorder}
  hover:-translate-y-1
  cursor-pointer
  ${styles.shadow}`}
    >
      {/* subtle glow */}
      <div
        className="
          absolute inset-0
          bg-[radial-gradient(circle_at_top_left,rgba(124,106,247,0.12),transparent_45%)]
          opacity-70
        "
      />

      {/* content */}
      <div className="relative z-10">
        {/* icon */}
        <div
          className={` flex h-14 w-14 items-center justify-center
            rounded-2xl
            ${styles.bg}
    ${styles.border}
            mb-8`}
        >
          <span className="text-2xl">{icon}</span>
        </div>

        {/* title */}
        <h3
          className="
            text-2xl
            font-bold
            text-ink
            font-display
            mb-4
          "
        >
          {title}
        </h3>

        {/* description */}
        <p
          className="
            text-muted
            
            text-[15px]
            mb-8
          "
        >
          {description}
        </p>

        {/* badge */}
        <div>
          <span
            className={`
  inline-flex items-center
  rounded-full  
  border
  px-4 py-1
  text-sm
  font-medium
  ${styles.bg}
    ${styles.border}
    ${styles.text}
`}
          >
            {badge}
          </span>
        </div>
      </div>
    </div>
  );
};

export default FeatureCard;
