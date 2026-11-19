import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { type ReactNode } from "react";
import appCss from "../styles.css?url";
import appMetaJson from "../app-meta.json";

type AppMeta = {
  og_title?: string | null;
  og_description?: string | null;
  og_image_url?: string | null;
  favicon_url?: string | null;
};

const appMeta = appMetaJson as AppMeta;
const DEFAULT_TITLE = "AI LAB | Academia de Inteligência Artificial";
const DEFAULT_DESCRIPTION = "Uma academia multidisciplinar para compreender, desenvolver, avaliar e aplicar inteligência artificial em ciência, engenharia, negócios, saúde, educação e cultura.";

function buildHead(meta: AppMeta) {
  const title = meta.og_title || DEFAULT_TITLE;
  const description = meta.og_description || DEFAULT_DESCRIPTION;
  const image = meta.og_image_url || "/og.png";
  const favicon = meta.favicon_url || "/favicon.svg";
  return {
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { title },
      { name: "description", content: description },
      { name: "theme-color", content: "#F0F2EE" },
      { name: "apple-mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-status-bar-style", content: "default" },
      { name: "apple-mobile-web-app-title", content: "AI LAB" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:image", content: image },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: image },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: favicon, type: "image/svg+xml" },
      { rel: "icon", href: "/favicon.ico", sizes: "16x16 32x32 48x48", type: "image/x-icon" },
      { rel: "icon", href: "/icons/icon-16.png", sizes: "16x16", type: "image/png" },
      { rel: "icon", href: "/icons/icon-32.png", sizes: "32x32", type: "image/png" },
      { rel: "apple-touch-icon", href: "/icons/apple-touch-icon.png" },
      { rel: "icon", href: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { rel: "icon", href: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
      { rel: "manifest", href: "/site.webmanifest" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" as const },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=Outfit:wght@400;500;600;700;800&display=swap" },
    ],
  };
}

function NotFoundComponent() {
  return (
    <main className="system-page">
      <span className="system-code">AI LAB / 404</span>
      <h1>Esta página não existe.</h1>
      <a href="/">Voltar ao início ↗</a>
    </main>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <main className="system-page">
      <span className="system-code">AI LAB / ERRO</span>
      <h1>Algo não saiu como esperado.</h1>
      <p>Atualize a página para tentar novamente. Seu progresso salvo neste dispositivo permanece preservado.</p>
      <button onClick={() => { router.invalidate(); reset(); }}>Tentar novamente</button>
    </main>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => buildHead(appMeta),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" data-theme="ai-lab">
      <head><HeadContent /></head>
      <body className="app-body">{children}<Scripts /></body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return <QueryClientProvider client={queryClient}><Outlet /></QueryClientProvider>;
}
