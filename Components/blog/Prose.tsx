type ProseProps = {
  html: string;
  className?: string;
};

export function Prose({ html, className = "" }: ProseProps) {
  return (
    <div
      className={`blog-prose ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
