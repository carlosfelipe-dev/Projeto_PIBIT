import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import {
  BookOpen,
  ClipboardList,
  FileText,
  LayoutGrid,
  Mail,
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
  Phone,
  ShieldAlert,
  Users,
} from "lucide-react";

interface HomeProps {
  targetSection?: string;
}

const NAV = [
  { id: "inicio", label: "Página inicial", icon: LayoutGrid },
  { id: "fundamentos", label: "Material teórico", icon: BookOpen },
  { id: "apoio", label: "Material de apoio", icon: FileText },
  { id: "questionarios", label: "Questionários", icon: ClipboardList },
  { id: "sobre", label: "Sobre", icon: Users },
  { id: "contato", label: "Contato", icon: Mail },
] as const;

function ScrollToTarget({ targetSection }: { targetSection?: string }) {
  useEffect(() => {
    if (targetSection) {
      document.getElementById(targetSection)?.scrollIntoView({ behavior: "smooth" });
    }
  }, [targetSection]);
  return null;
}

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <nav aria-label="Menu principal" className="space-y-1">
      {NAV.map((item) => {
        const Icon = item.icon;
        return (
          <Link
            key={item.id}
            href={`/${item.id}`}
            onClick={() => onNavigate?.()}
            className={cn(
              "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium",
              "text-sidebar-foreground/80 hover:text-sidebar-foreground",
              "hover:bg-sidebar-accent/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            )}
          >
            <Icon className="h-4 w-4 opacity-80 group-hover:opacity-100" aria-hidden="true" />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

export default function Home({ targetSection }: HomeProps) {
  const isMobile = useIsMobile();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const year = useMemo(() => new Date().getFullYear(), []);

  return (
    
    <div className="min-h-screen bg-background text-foreground">
      <a
        href="#conteudo"
        className={cn(
          "sr-only focus:not-sr-only",
          "fixed left-3 top-3 z-[60] rounded-md bg-background px-3 py-2",
          "border border-border shadow-sm"
        )}
      >
        Pular para o conteúdo
      </a>

      <ScrollToTarget targetSection={targetSection} />

      {/* Topbar */}
      <header
        className={cn(
          "sticky top-0 z-50 border-b border-border/80 bg-background/85",
          "backdrop-blur supports-[backdrop-filter]:bg-background/60"
        )}
      >
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary text-primary-foreground shadow-sm">
              <ShieldAlert className="h-5 w-5" aria-hidden="true" />
            </div>
            <div className="leading-tight">
              <p className="font-display text-lg font-extrabold tracking-tight">Análise Psicossocial</p>
              <p className="text-xs text-muted-foreground">Riscos psicossociais no ambiente de trabalho</p>
            </div>
          </div>

          <div className="ml-auto flex items-center gap-2">
            {!isMobile ? (
              <Button
                variant="outline"
                size="icon"
                onClick={() => setSidebarCollapsed((v) => !v)}
                aria-label={sidebarCollapsed ? "Expandir barra lateral" : "Recolher barra lateral"}
              >
                {sidebarCollapsed ? (
                  <PanelLeftOpen className="h-4 w-4" />
                ) : (
                  <PanelLeftClose className="h-4 w-4" />
                )}
              </Button>
            ) : (
              <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" aria-label="Abrir menu">
                    <Menu className="h-4 w-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80 bg-sidebar text-sidebar-foreground">
                  <SheetHeader>
                    <SheetTitle className="font-display">Menu</SheetTitle>
                  </SheetHeader>
                  <div className="mt-4">
                    <NavLinks onNavigate={() => setMobileOpen(false)} />
                  </div>
                  <Separator className="my-4 bg-sidebar-border" />
                  <p className="text-xs text-sidebar-foreground/70">
                    Dica: você pode navegar pelas seções sem sair da página.
                  </p>
                </SheetContent>
              </Sheet>
            )}

            <Button asChild>
              <Link href="/questionarios">Acessar questionário</Link>
            </Button>

            <li className="idiomas_botao">
              <a href="idioma-title">Idiomas </a>
              <ul className="dropDown">
                <li className="item"><a href="#">Inglês</a></li>
                <li className="item"><a href="#">Espanhol</a></li>
                <li className="item"><a href="#">Português</a></li>
              </ul> 
            </li>
              
          </div>
        </div>
      </header>

      {/* Layout */}
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-0 lg:grid-cols-[auto_1fr]">
        {/* Sidebar (desktop) */}
        {!isMobile && (
          <aside
            className={cn(
              "sticky top-[68px] h-[calc(100dvh-68px)] border-r border-border/70 bg-sidebar",
              sidebarCollapsed ? "w-16" : "w-72"
            )}
            aria-label="Barra lateral"
          >
            <div className={cn("p-4", sidebarCollapsed && "px-2")}> 
              <div className={cn("mb-4", sidebarCollapsed && "sr-only")}> 
                <p className="text-sm font-semibold">Navegação</p>
                <p className="text-xs text-sidebar-foreground/70">
                  Estrutura de leitura rápida e materiais.
                </p>
              </div>

              {sidebarCollapsed ? (
                <nav aria-label="Menu principal" className="space-y-1">
                  {NAV.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.id}
                        href={`/${item.id}`}
                        className={cn(
                          "flex h-10 w-10 items-center justify-center rounded-lg",
                          "text-sidebar-foreground/80 hover:text-sidebar-foreground",
                          "hover:bg-sidebar-accent/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        )}
                        aria-label={item.label}
                        title={item.label}
                      >
                        <Icon className="h-4 w-4" aria-hidden="true" />
                      </Link>
                    );
                  })}
                </nav>
              ) : (
                <NavLinks />
              )}

              <Separator className="my-5 bg-sidebar-border" />

              <div className={cn("rounded-xl border border-sidebar-border bg-sidebar-accent/25 p-4", sidebarCollapsed && "hidden")}>
                <p className="text-xs font-semibold">Objetivo</p>
                <p className="mt-1 text-xs text-sidebar-foreground/70">
                  Apoiar a identificação e o entendimento de riscos psicossociais e orientar ações
                  preventivas.
                </p>
              </div>
            </div>
          </aside>
        )}

        {/* Main */}
        <main id="conteudo" className="min-w-0 px-4 py-10">
          {/* Hero */}
          <section id="inicio" className="relative overflow-hidden rounded-3xl border border-border bg-hero p-8 md:p-12">
            <div className="absolute inset-0 opacity-30" aria-hidden="true">
              <div className="hero-grid" />
            </div>

            <div className="relative">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="secondary" className="bg-secondary/70">
                  Guia inicial
                </Badge>
                <Badge variant="outline" className="border-border/80">
                  Foco em prevenção
                </Badge>
                <Badge variant="outline" className="border-border/80">
                  Acessível em qualquer tela
                </Badge>
              </div>

              <h1 className="mt-5 font-display text-4xl font-black leading-[1.05] tracking-tight md:text-6xl">
                Riscos psicossociais <span className="text-accent">não são “invisíveis”</span>.
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
                Esta página reúne fundamentos, materiais e acesso rápido a questionários para apoiar
                a análise psicossocial no ambiente de trabalho — com navegação clara e layout responsivo.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Button asChild size="lg">
                  <Link href="/questionarios">Começar pelos questionários</Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/fundamentos">Ver material teórico</Link>
                </Button>
              </div>

              <p className="mt-4 text-xs text-muted-foreground">
                Observação: esta página é informativa e não substitui avaliação técnica especializada.
              </p>
            </div>
          </section>

          {/* Destaques */}
          <section className="mt-10">
            <h2 className="font-display text-2xl font-extrabold tracking-tight md:text-3xl">
              O que você encontra aqui
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Uma estrutura enxuta para orientar a leitura e facilitar o acesso às próximas etapas.
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <Card className="bg-card/80">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-display">
                    <BookOpen className="h-5 w-5 text-accent" />
                    Fundamentos
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Conceitos, definições e fatores comuns (demanda excessiva, baixo controle, assédio,
                  conflitos, insegurança, etc.).
                </CardContent>
              </Card>

              <Card className="bg-card/80">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-display">
                    <FileText className="h-5 w-5 text-accent" />
                    Materiais
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Materiais de apoio organizados para consulta rápida, incluindo orientações de boas
                  práticas.
                </CardContent>
              </Card>

              <Card className="bg-card/80">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-display">
                    <ClipboardList className="h-5 w-5 text-accent" />
                    Questionários
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Acesso centralizado aos instrumentos de coleta (ponto de partida para análises e
                  discussões).
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Seções de conteúdo */}
          <section id="fundamentos" className="mt-14 scroll-mt-24">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <h2 className="font-display text-2xl font-extrabold tracking-tight md:text-3xl">
                Material teórico
              </h2>
              <Button asChild variant="outline" size="sm">
                <Link href="/questionarios">Ir para questionários</Link>
              </Button>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="font-display">Definição prática</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Riscos psicossociais são condições do trabalho e da organização que podem afetar
                  saúde mental, bem-estar e desempenho — por exemplo: sobrecarga, baixa autonomia,
                  comunicação falha, violência/assédio e falta de suporte.
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="font-display">Sinais de alerta</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Aumento de afastamentos, conflitos, rotatividade, queda de qualidade, queixas de
                  fadiga, ansiedade e distúrbios do sono podem indicar problemas psicossociais.
                </CardContent>
              </Card>
            </div>
          </section>

          <section id="apoio" className="mt-14 scroll-mt-24">
            <h2 className="font-display text-2xl font-extrabold tracking-tight md:text-3xl">
              Material de apoio
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Sugestão de organização para quando você for anexar seus arquivos (PDFs, guias, vídeos,
              etc.).
            </p>

            <div className="mt-6 grid gap-4 lg:grid-cols-3">
              {[
                {
                  title: "Boas práticas",
                  desc: "Comunicação clara, previsibilidade, gestão de demandas, participação e suporte.",
                },
                {
                  title: "Fluxo de ação",
                  desc: "Identificar → medir → discutir → planejar → acompanhar → reavaliar.",
                },
                {
                  title: "Orientações",
                  desc: "Como conduzir devolutivas sem exposição individual e com foco em melhorias sistêmicas.",
                },
              ].map((x) => (
                <Card key={x.title} className="bg-card/80">
                  <CardHeader>
                    <CardTitle className="font-display">{x.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">{x.desc}</CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section id="questionarios" className="mt-14 scroll-mt-24">
            <h2 className="font-display text-2xl font-extrabold tracking-tight md:text-3xl">
              Questionários
            </h2>
            <div className="mt-5 rounded-3xl border border-border bg-card p-6 md:p-8">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold">Acesso rápido</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Conecte aqui os links reais para formulários, PDFs ou páginas internas.
                  </p>
                </div>
                <Button>
                  <Link to="/copsoq"><Button> Abrir COPSOQ </Button></Link>
                </Button>
                <Button>
                  <Link to="/nasatlx"><Button> Abrir NASA TLX </Button></Link>
                </Button>
              </div>
              <Separator className="my-6" />
              <ul className="grid gap-3 text-sm text-muted-foreground md:grid-cols-2">
                <li className="rounded-xl border border-border/70 bg-background/60 p-4">
                  <p className="font-medium text-foreground">Instrumento 1</p>
                  <p className="mt-1">Descrição curta do objetivo e público-alvo.</p>
                </li>
                <li className="rounded-xl border border-border/70 bg-background/60 p-4">
                  <p className="font-medium text-foreground">Instrumento 2</p>
                  <p className="mt-1">Descrição curta do objetivo e público-alvo.</p>
                </li>
              </ul>
            </div>
          </section>

          <section id="sobre" className="mt-14 scroll-mt-24">
            <h2 className="font-display text-2xl font-extrabold tracking-tight md:text-3xl">Sobre</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-[1.1fr_0.9fr]">
              <Card>
                <CardHeader>
                  <CardTitle className="font-display">Contexto</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Este site tem como foco a página inicial de um sistema de análise psicossocial no
                  trabalho, reunindo conteúdo introdutório e atalhos para materiais e questionários.
                  
                  <div className="mt-4 rounded-xl border border-border/70 bg-background/60 p-4">
                    <p className="text-xs font-semibold text-foreground">Sugestão de próximos passos</p>
                    <p className="mt-1 text-xs">
                      Inserir links reais, adicionar página “Material teórico” detalhada e incluir um
                      breve FAQ.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="font-display">Instituição</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Programa Institucional de Bolsas de Iniciação em Desenvolvimento Tecnológico e
                  Inovação (PIBIT) — exemplo de texto institucional.
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Footer / contato */}
          <footer id="contato" className="mt-16 scroll-mt-24">
            <div className="rounded-3xl border border-border bg-footer p-6 md:p-8">
              <div className="flex flex-wrap items-start justify-between gap-6">
                <div>
                  <p className="font-display text-xl font-extrabold">Contato</p>
                  <p className="mt-2 max-w-md text-sm text-muted-foreground">
                    Se quiser sugerir melhorias, enviar materiais ou relatar dificuldades de uso,
                    entre em contato.
                  </p>
                </div>

                <div className="grid gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-accent" aria-hidden="true" />
                    <a className="underline-offset-4 hover:underline" href="mailto:carlos.santos@gmail.com">
                      carlos.santos@gmail.com
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-accent" aria-hidden="true" />
                    <span className="text-muted-foreground">(xx) xxxx-xxxx</span>
                  </div>
                </div>
              </div>

              <Separator className="my-6" />

              <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
                <p>© {year} — Página inicial de análise psicossocial</p>
                <p className="flex items-center gap-2">
                  <span className="inline-flex h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
                  Conteúdo em construção (adicione seus arquivos e links)
                </p>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}
