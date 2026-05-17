import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function DocRenderer({ content }: { content: string }) {
  return (
    <article className="max-w-none space-y-5 text-[15px] leading-7 text-[var(--text-secondary)]">
      <ReactMarkdown
        components={{
          h1: ({ children }) => <h1 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-[var(--text-primary)]">{children}</h1>,
          h2: ({ children }) => <h2 className="mt-8 text-2xl font-semibold tracking-[-0.03em] text-[var(--text-primary)]">{children}</h2>,
          h3: ({ children }) => <h3 className="mt-6 text-xl font-semibold text-[var(--text-primary)]">{children}</h3>,
          p: ({ children }) => <p className="text-[15px] leading-7 text-[var(--text-secondary)]">{children}</p>,
          ul: ({ children }) => <ul className="list-disc space-y-2 pl-6 text-[var(--text-secondary)]">{children}</ul>,
          ol: ({ children }) => <ol className="list-decimal space-y-2 pl-6 text-[var(--text-secondary)]">{children}</ol>,
          li: ({ children }) => <li className="leading-7">{children}</li>,
          strong: ({ children }) => <strong className="font-semibold text-[var(--text-primary)]">{children}</strong>,
          hr: () => <hr className="my-8 border-[var(--border)]" />,
          table: ({ children }) => (
            <div className="my-6 overflow-x-auto rounded-[18px] border border-[var(--border)]">
              <table className="min-w-full border-collapse bg-white text-left text-sm">{children}</table>
            </div>
          ),
          thead: ({ children }) => <thead className="bg-[var(--panel-muted)] text-[var(--text-primary)]">{children}</thead>,
          th: ({ children }) => <th className="border-b border-[var(--border)] px-4 py-3 font-semibold">{children}</th>,
          td: ({ children }) => <td className="border-b border-[var(--border)] px-4 py-3 align-top text-[var(--text-secondary)]">{children}</td>,
          code: ({ children, className }) => (
            <code className={`rounded-md bg-[var(--panel-muted)] px-1.5 py-0.5 font-mono text-[13px] text-[var(--text-primary)] ${className ?? ""}`.trim()}>
              {children}
            </code>
          ),
          pre: ({ children }) => (
            <pre className="my-5 overflow-x-auto rounded-[18px] bg-[#0b1727] p-4 text-sm text-slate-100">
              {children}
            </pre>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-[var(--accent)] bg-[var(--panel-muted)] px-4 py-3 italic text-[var(--text-secondary)]">
              {children}
            </blockquote>
          ),
          a: ({ children, href }) => (
            <a className="font-medium text-[var(--accent)] underline underline-offset-4 hover:text-[var(--accent-hover)]" href={href}>
              {children}
            </a>
          ),
        }}
        remarkPlugins={[remarkGfm]}
      >
        {content}
      </ReactMarkdown>
    </article>
  );
}
