import { useEffect, useId, useMemo, useState } from "react";
import { Code2, Eye, Maximize2, Minus, Plus, RotateCcw } from "lucide-react";
import { useLocale } from "@/contexts/LocaleContext";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

let mermaidInitialized = false;

const MIN_ZOOM = 0.25;
const MAX_ZOOM = 2;
const ZOOM_STEP = 0.25;

interface MermaidDiagramProps {
  chart: string;
}

function getScaledSvgMarkup(svgMarkup: string, zoom: number) {
  if (!svgMarkup || typeof DOMParser === "undefined") {
    return svgMarkup;
  }

  const documentFragment = new DOMParser().parseFromString(svgMarkup, "image/svg+xml");
  const svgElement = documentFragment.querySelector("svg");

  if (!svgElement) {
    return svgMarkup;
  }

  const viewBox = svgElement
    .getAttribute("viewBox")
    ?.split(/\s+/)
    .map((value) => Number.parseFloat(value));

  const parsedWidth = Number.parseFloat(svgElement.getAttribute("width") ?? "");
  const parsedHeight = Number.parseFloat(svgElement.getAttribute("height") ?? "");

  const baseWidth =
    viewBox && Number.isFinite(viewBox[2]) && viewBox[2] > 0 ? viewBox[2] : parsedWidth;
  const baseHeight =
    viewBox && Number.isFinite(viewBox[3]) && viewBox[3] > 0 ? viewBox[3] : parsedHeight;

  if (Number.isFinite(baseWidth) && baseWidth > 0) {
    svgElement.setAttribute("width", `${baseWidth * zoom}`);
  } else {
    svgElement.setAttribute("width", `${zoom * 100}%`);
  }

  if (Number.isFinite(baseHeight) && baseHeight > 0) {
    svgElement.setAttribute("height", `${baseHeight * zoom}`);
  }

  const currentStyle = svgElement.getAttribute("style");
  const styleParts = [currentStyle, "display:block", "max-width:none"].filter(Boolean);
  svgElement.setAttribute("style", styleParts.join(";"));

  return svgElement.outerHTML;
}

export default function MermaidDiagram({ chart }: MermaidDiagramProps) {
  const { locale } = useLocale();
  const diagramId = useId().replace(/:/g, "");
  const [svg, setSvg] = useState("");
  const [hasError, setHasError] = useState(false);
  const [activeView, setActiveView] = useState<"preview" | "code">("preview");
  const [zoom, setZoom] = useState(1);
  const [isExpanded, setIsExpanded] = useState(false);

  const labels =
    locale === "pt-br"
      ? {
          code: "Código",
          diagram: "Diagrama Mermaid",
          error: "Falha ao renderizar o diagrama.",
          fullscreen: "Tela inteira",
          fullscreenDescription: "Visualização ampliada do diagrama Mermaid com preview e código.",
          preview: "Preview",
          rendering: "Renderizando diagrama...",
          resetZoom: "Resetar zoom",
          zoomIn: "Aumentar zoom",
          zoomOut: "Diminuir zoom",
        }
      : {
          code: "Code",
          diagram: "Mermaid diagram",
          error: "Failed to render the diagram.",
          fullscreen: "Fullscreen",
          fullscreenDescription: "Expanded Mermaid diagram view with preview and source code.",
          preview: "Preview",
          rendering: "Rendering diagram...",
          resetZoom: "Reset zoom",
          zoomIn: "Zoom in",
          zoomOut: "Zoom out",
        };

  useEffect(() => {
    let isMounted = true;

    async function renderDiagram() {
      try {
        const mermaid = (await import("mermaid")).default;

        if (!mermaidInitialized) {
          mermaid.initialize({
            securityLevel: "strict",
            startOnLoad: false,
            theme: "dark",
          });
          mermaidInitialized = true;
        }

        const { svg: renderedSvg } = await mermaid.render(`mermaid-${diagramId}`, chart);

        if (!isMounted) {
          return;
        }

        setSvg(renderedSvg);
        setHasError(false);
      } catch (error) {
        if (!isMounted) {
          return;
        }

        console.error("Failed to render mermaid diagram", error);
        setHasError(true);
      }
    }

    setSvg("");
    setHasError(false);
    setActiveView("preview");
    setZoom(1);
    setIsExpanded(false);
    void renderDiagram();

    return () => {
      isMounted = false;
    };
  }, [chart, diagramId]);

  const displaySvg = useMemo(() => getScaledSvgMarkup(svg, zoom), [svg, zoom]);
  const canZoomIn = zoom < MAX_ZOOM;
  const canZoomOut = zoom > MIN_ZOOM;
  const isPreviewVisible = activeView === "preview";

  function renderToolbar() {
    return (
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-primary/15 bg-black/30 px-4 py-3">
        <div className="flex flex-wrap items-center gap-2">
          <Button
            aria-pressed={activeView === "preview"}
            className={cn(
              "h-8 border-primary/20 font-mono text-xs uppercase tracking-[0.2em]",
              activeView === "preview" && "border-primary/40 bg-primary/10 text-primary",
            )}
            onClick={() => setActiveView("preview")}
            size="sm"
            type="button"
            variant="outline"
          >
            <Eye className="h-3.5 w-3.5" />
            {labels.preview}
          </Button>
          <Button
            aria-pressed={activeView === "code"}
            className={cn(
              "h-8 border-primary/20 font-mono text-xs uppercase tracking-[0.2em]",
              activeView === "code" && "border-primary/40 bg-primary/10 text-primary",
            )}
            onClick={() => setActiveView("code")}
            size="sm"
            type="button"
            variant="outline"
          >
            <Code2 className="h-3.5 w-3.5" />
            {labels.code}
          </Button>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button
            aria-label={labels.zoomOut}
            className="h-8 w-8 border-primary/20 text-primary"
            disabled={!isPreviewVisible || !canZoomOut || hasError || !svg}
            onClick={() => setZoom((currentZoom) => Math.max(MIN_ZOOM, currentZoom - ZOOM_STEP))}
            size="icon"
            type="button"
            variant="outline"
          >
            <Minus className="h-3.5 w-3.5" />
          </Button>
          <span className="min-w-12 text-center font-mono text-xs text-primary/80">{zoom.toFixed(2)}x</span>
          <Button
            aria-label={labels.zoomIn}
            className="h-8 w-8 border-primary/20 text-primary"
            disabled={!isPreviewVisible || !canZoomIn || hasError || !svg}
            onClick={() => setZoom((currentZoom) => Math.min(MAX_ZOOM, currentZoom + ZOOM_STEP))}
            size="icon"
            type="button"
            variant="outline"
          >
            <Plus className="h-3.5 w-3.5" />
          </Button>
          <Button
            aria-label={labels.resetZoom}
            className="h-8 border-primary/20 font-mono text-xs uppercase tracking-[0.2em] text-primary"
            disabled={zoom === 1}
            onClick={() => setZoom(1)}
            size="sm"
            type="button"
            variant="outline"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            1x
          </Button>
          <Button
            aria-label={labels.fullscreen}
            className="h-8 border-primary/20 font-mono text-xs uppercase tracking-[0.2em] text-primary"
            onClick={() => setIsExpanded(true)}
            size="sm"
            type="button"
            variant="outline"
          >
            <Maximize2 className="h-3.5 w-3.5" />
            {labels.fullscreen}
          </Button>
        </div>
      </div>
    );
  }

  function renderPanel(expanded: boolean) {
    return (
      <div
        className={cn(
          "overflow-auto rounded-md border border-primary/20 bg-[#050805]/90 shadow-[0_0_24px_rgba(0,0,0,0.28)]",
          expanded ? "min-h-0 flex-1 p-5" : "p-4",
        )}
      >
        {isPreviewVisible ? (
          hasError ? (
            <div className="rounded-md border border-destructive/30 bg-black/60 p-4 font-mono text-sm text-destructive">
              <p className="mb-3">{labels.error}</p>
              <code className="whitespace-pre-wrap break-words">{chart}</code>
            </div>
          ) : !svg ? (
            <div className="font-mono text-sm text-primary/80">{labels.rendering}</div>
          ) : (
            <div className="min-w-fit">
              <div
                aria-label="Mermaid diagram"
                className="inline-block"
                dangerouslySetInnerHTML={{ __html: displaySvg }}
                role="img"
              />
            </div>
          )
        ) : (
          <pre className="whitespace-pre-wrap break-words font-mono text-sm leading-7 text-primary/85">
            <code>{chart}</code>
          </pre>
        )}
      </div>
    );
  }

  return (
    <>
      <section
        className="my-6 overflow-hidden rounded-md border border-primary/20 bg-black/40"
        data-testid="mermaid-diagram-block"
      >
        {renderToolbar()}

        <div className="p-4">{renderPanel(false)}</div>
      </section>

      <Dialog open={isExpanded} onOpenChange={setIsExpanded}>
        <DialogContent className="flex h-[92vh] w-[96vw] max-w-none flex-col gap-4 border-primary/25 bg-[#040604] p-0 sm:rounded-lg">
          <DialogHeader className="border-b border-primary/15 px-6 py-4">
            <DialogTitle className="font-mono text-sm uppercase tracking-[0.24em] text-primary">
              {labels.diagram}
            </DialogTitle>
            <DialogDescription className="font-mono text-xs text-primary/60">
              {labels.fullscreenDescription}
            </DialogDescription>
          </DialogHeader>
          <div className="flex min-h-0 flex-1 flex-col px-6 pb-6">
            {renderToolbar()}
            {renderPanel(true)}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
