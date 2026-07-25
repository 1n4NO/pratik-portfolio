export function PostBody({ content }: { content: string }) {
  const paragraphs = content.split("\n\n");

  return (
    <div className="space-y-5 max-w-2xl">
      {paragraphs.map((para, i) => (
        <p key={i} className="text-ink-soft leading-relaxed">
          {para}
        </p>
      ))}
    </div>
  );
}
