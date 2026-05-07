interface Props {
  size?: "sm" | "md" | "lg";
  tone?: "dark" | "light";
}

export function SophyLogo({ size = "md", tone = "dark" }: Props) {
  const big =
    size === "lg" ? "text-4xl" : size === "sm" ? "text-xl" : "text-2xl";
  const small = size === "lg" ? "text-sm" : "text-[10px]";
  const main = tone === "light" ? "text-white" : "text-[#cf4e71]";
  const sub = tone === "light" ? "text-white/80" : "text-[#dc8494]";

  return (
    <div className="leading-none flex flex-col">
      <span
        className={`font-logo ${big} ${main}`}
        style={{ fontWeight: 600, letterSpacing: "0.02em" }}
      >
        Sophy
      </span>
      <span
        className={`${small} ${sub} tracking-[0.35em] uppercase mt-1 ml-0.5`}
        style={{
          fontFamily: "Inter, sans-serif",
          fontWeight: 500,
        }}
      >
        Presentes
      </span>
    </div>
  );
}
