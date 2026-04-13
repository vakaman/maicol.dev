import { isValidElement, useEffect, type MouseEvent, type ReactNode } from "react";
import { useParams, Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import Navbar from "@/components/Navbar";
import { useLocale } from "@/contexts/LocaleContext";
import { getJourneyEntry } from "@/content/siteContent";
import { navigateToPreviousContext, type BackNavigationState } from "@/lib/navigation";
import { resolveMarkdownAssetPath } from "@/lib/content";
import MermaidDiagram from "@/components/MermaidDiagram";
import SeoHead from "@/components/SeoHead";
import { getLocalizedPath } from "@/lib/locale-routing";
import { getJourneyMetadata } from "@/lib/seo";

function getCodeLanguage(className?: string) {
  const match = className?.match(/language-([\w-]+)/);

  return match?.[1];
}

function getCodeText(children: ReactNode) {
  return String(children).replace(/\n$/, "");
}

function mergeClasses(...classNames: Array<string | undefined>) {
  return classNames.filter(Boolean).join(" ");
}

function shouldRenderParagraph(node: { children?: Array<{ tagName?: string; type?: string }> }, children: ReactNode) {
  if (node.children?.length === 1) {
    const onlyChild = node.children[0];

    if (onlyChild?.tagName === "img" || onlyChild?.type === "element") {
      if (onlyChild.tagName === "img") {
        return false;
      }
    }
  }

  return !(isValidElement(children) && (children.type === "img" || children.type === "figure"));
}

const JourneyDetail = () => {
  const { content, locale } = useLocale();
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const entry = id ? getJourneyEntry(locale, id) : undefined;
  const metadata = id ? getJourneyMetadata(locale, id) : null;
  const markdownPath = id ? `journey/${id}/detail/${locale}.md` : "";
  const navigationState = location.state as BackNavigationState | null;
  const homePath = getLocalizedPath(locale, "/");

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
  }, [location.pathname]);

  function handleBack(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    navigateToPreviousContext(navigate, navigationState, homePath);
  }

  if (!entry) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="font-mono text-muted-foreground mb-4">{content.journey.notFound}</p>
          <Link to="/" onClick={handleBack} className="text-primary font-mono text-sm hover:underline">
            {content.common.back}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {metadata ? <SeoHead metadata={metadata} /> : null}
      <Navbar />
      <div className="max-w-3xl mx-auto px-6 py-24 md:py-28">
        <Link
          to={homePath}
          onClick={handleBack}
          className="inline-flex items-center gap-2 text-sm font-mono text-muted-foreground hover:text-primary transition-colors mb-12"
        >
          <ArrowLeft className="w-4 h-4" />
          {content.common.back}
        </Link>

        <div className="mb-2 flex items-center gap-3">
          <span className="font-mono text-sm text-primary">{entry.year}</span>
          <span
            className={`text-xs font-mono px-2 py-0.5 rounded-sm ${
              entry.type === "professional"
                ? "bg-primary/10 text-primary"
                : "bg-secondary text-secondary-foreground"
            }`}
          >
            {entry.typeLabel}
          </span>
        </div>

        <h1 className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-8">
          {entry.title}
        </h1>

        <div className="max-w-none space-y-6 text-base leading-8 text-muted-foreground md:text-lg">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
            components={{
            h1: ({ node, ...props }) => (
              <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground md:text-4xl" {...props} />
            ),
            h2: ({ node, ...props }) => (
              <h2 className="font-heading text-2xl font-bold tracking-tight text-foreground md:text-3xl" {...props} />
            ),
            h3: ({ node, ...props }) => (
              <h3 className="font-heading text-xl font-semibold tracking-tight text-foreground md:text-2xl" {...props} />
            ),
            p: ({ node, children, ...props }) => {
              if (node && !shouldRenderParagraph(node, children)) {
                return <>{children}</>;
              }

              return (
                <p className="leading-8 text-muted-foreground" {...props}>
                  {children}
                </p>
              );
            },
            ul: ({ node, ...props }) => <ul className="list-disc space-y-2 pl-6" {...props} />,
            ol: ({ node, ...props }) => <ol className="list-decimal space-y-2 pl-6" {...props} />,
            li: ({ node, ...props }) => <li className="pl-1" {...props} />,
            hr: ({ node, ...props }) => <hr className="border-border/80 my-8" {...props} />,
            a: ({ node, ...props }) => <a className="text-primary underline underline-offset-4" {...props} />,
            img: ({ node, alt, src, title, ...props }) => {
              const resolvedSrc = src ? resolveMarkdownAssetPath(markdownPath, src) : "";

              return (
                <figure className="my-8 overflow-hidden rounded-md border border-primary/20 bg-black/30 shadow-[0_0_24px_rgba(0,0,0,0.18)]">
                  <img
                    alt={alt ?? ""}
                    className="block max-h-[32rem] w-full object-contain bg-black/50"
                    loading="lazy"
                    src={resolvedSrc}
                    title={title}
                    {...props}
                  />
                  {(title || alt) ? (
                    <figcaption className="border-t border-primary/10 px-4 py-3 font-mono text-xs text-primary/70">
                      {title ?? alt}
                    </figcaption>
                  ) : null}
                </figure>
              );
            },
            blockquote: ({ node, ...props }) => (
              <blockquote className="border-l-2 border-primary/50 pl-4 italic text-foreground/90" {...props} />
            ),
            code: ({ node, inline, className, children, ...props }) => {
              if (inline) {
                return (
                  <code
                    className="rounded-sm border border-primary/20 bg-primary/10 px-1.5 py-0.5 font-mono text-sm text-primary"
                    {...props}
                  >
                    {children}
                  </code>
                );
              }

              return (
                <code
                  className={mergeClasses(
                    className,
                    "block min-w-full bg-transparent p-0 font-mono text-sm leading-7",
                  )}
                  data-language={getCodeLanguage(className)}
                  {...props}
                >
                  {children}
                </code>
              );
            },
            pre: ({ node, children, ...props }) => {
              if (isValidElement(children)) {
                const language = getCodeLanguage(children.props.className);

                if (language === "mermaid") {
                  return <MermaidDiagram chart={getCodeText(children.props.children)} />;
                }
              }

              return (
                <pre
                  className="markdown-code-block my-6 overflow-x-auto rounded-md border border-primary/20 bg-[#282a36] p-4 shadow-[0_0_24px_rgba(0,0,0,0.22)]"
                  {...props}
                >
                  {children}
                </pre>
              );
            },
            }}
          >
            {entry.detail}
          </ReactMarkdown>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <span className="font-mono text-xs text-muted-foreground tracking-wider uppercase">
            {content.journey.skillsHeading}
          </span>
          <div className="flex flex-wrap gap-2 mt-3">
            {entry.skills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 text-sm font-mono border border-primary/30 text-primary/80 rounded-sm bg-primary/5"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JourneyDetail;
