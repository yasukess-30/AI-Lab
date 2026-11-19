import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { flashcards, glossary, modules, projects, quizQuestions } from "../data/curriculum";
import { lessonDepth } from "../data/lesson-depth";
import { applicationDomains, applicationGroups } from "../data/application-domains";
import { learningResources } from "../data/learning-resources";
import { lessonGuides } from "../data/lesson-guides";
import { lessonLabs } from "../data/lesson-labs";
import { RunnableLab } from "../components/RunnableLab";
import {
  EMPTY_PROGRESS,
  isValidProgress,
  readProgress,
  writeProgress,
  type LearningProgress,
} from "../lib/progress";

export const Route = createFileRoute("/")({ component: AILab });

type Tab = "home" | "tracks" | "applications" | "lab" | "library" | "assessment";
const tabs: { id: Tab; label: string; symbol: string }[] = [
  { id: "home", label: "Visão geral", symbol: "⌂" },
  { id: "tracks", label: "Trilhas", symbol: "▤" },
  { id: "applications", label: "Áreas de aplicação", symbol: "◈" },
  { id: "lab", label: "Laboratório", symbol: "⌁" },
  { id: "library", label: "Biblioteca", symbol: "⌕" },
  { id: "assessment", label: "Avaliações", symbol: "◷" },
];

function localDay(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function AILab() {
  const [tab, setTab] = useState<Tab>("home");
  const [progress, setProgress] = useState<LearningProgress>(EMPTY_PROGRESS);
  const [ready, setReady] = useState(false);
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);
  const [selectedModuleId, setSelectedModuleId] = useState(modules[0].id);
  const [selectedApplicationId, setSelectedApplicationId] = useState(applicationDomains[0].id);
  const [applicationGroup, setApplicationGroup] = useState("Todas");
  const [applicationSearch, setApplicationSearch] = useState("");
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [libraryMode, setLibraryMode] = useState<"cards" | "glossary">("cards");
  const [librarySearch, setLibrarySearch] = useState("");
  const [cardIndex, setCardIndex] = useState(0);
  const [cardFlipped, setCardFlipped] = useState(false);
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizChoice, setQuizChoice] = useState<number | null>(null);
  const [quizRevealed, setQuizRevealed] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    let mounted = true;
    readProgress()
      .then((stored) => {
        if (mounted) setProgress(stored);
      })
      .catch(() => {
        if (mounted) setNotice("O armazenamento local não está disponível. Seu progresso ficará apenas nesta sessão.");
      })
      .finally(() => {
        if (mounted) setReady(true);
      });
    if ("serviceWorker" in navigator) {
      void navigator.serviceWorker.register("/sw.js").catch(() => undefined);
    }
    return () => { mounted = false; };
  }, []);

  const allLessons = useMemo(() => modules.flatMap((module) => module.lessons), []);
  const totalLessons = allLessons.length;
  const completedCount = progress.completedLessonIds.length;
  const percent = totalLessons ? Math.round((completedCount / totalLessons) * 100) : 0;
  const nextLesson = allLessons.find((lesson) => !progress.completedLessonIds.includes(lesson.id)) ?? allLessons[allLessons.length - 1];
  const activeLesson = allLessons.find((lesson) => lesson.id === activeLessonId) ?? null;
  const activeModule = activeLesson ? modules.find((module) => module.lessons.some((lesson) => lesson.id === activeLesson.id)) : null;
  const selectedModule = modules.find((module) => module.id === selectedModuleId) ?? modules[0];
  const selectedProject = projects.find((project) => project.id === selectedProjectId) ?? null;
  const quizQuestion = quizQuestions[quizIndex];
  const today = localDay();
  const studiedToday = progress.studyDays.includes(today);

  function commit(next: LearningProgress) {
    setProgress(next);
    void writeProgress(next).catch(() => setNotice("Não foi possível salvar no navegador. Exporte uma cópia do seu progresso."));
  }

  function openLesson(id: string) {
    setActiveLessonId(id);
    const next = { ...progress, lastLessonId: id };
    commit(next);
    setTab("tracks");
  }

  function markLessonComplete() {
    if (!activeLesson) return;
    const alreadyDone = progress.completedLessonIds.includes(activeLesson.id);
    const next: LearningProgress = {
      ...progress,
      completedLessonIds: alreadyDone ? progress.completedLessonIds : [...progress.completedLessonIds, activeLesson.id],
      lastLessonId: activeLesson.id,
      totalMinutes: progress.totalMinutes + (alreadyDone ? 0 : activeLesson.duration),
      studyDays: studiedToday ? progress.studyDays : [...progress.studyDays, today],
    };
    commit(next);
    const ordered = allLessons.findIndex((lesson) => lesson.id === activeLesson.id);
    const following = allLessons[ordered + 1];
    if (following) setActiveLessonId(following.id);
    setNotice("Aula concluída. Seu progresso foi atualizado neste dispositivo.");
  }

  function markProjectComplete(id: string) {
    const done = progress.completedProjectIds.includes(id);
    commit({
      ...progress,
      completedProjectIds: done ? progress.completedProjectIds.filter((item) => item !== id) : [...progress.completedProjectIds, id],
      studyDays: studiedToday || done ? progress.studyDays : [...progress.studyDays, today],
    });
  }

  function startQuiz() {
    setQuizIndex(0);
    setQuizChoice(null);
    setQuizRevealed(false);
    setQuizScore(0);
    setQuizFinished(false);
    setTab("assessment");
  }

  function chooseAnswer(index: number) {
    if (quizRevealed || !quizQuestion) return;
    setQuizChoice(index);
    setQuizRevealed(true);
    if (index === quizQuestion.answer) setQuizScore((score) => score + 1);
  }

  function nextQuestion() {
    if (quizIndex + 1 >= quizQuestions.length) {
      const finalScore = quizScore;
      setQuizFinished(true);
      commit({
        ...progress,
        bestQuizScore: Math.max(progress.bestQuizScore, Math.round((finalScore / quizQuestions.length) * 100)),
        studyDays: studiedToday ? progress.studyDays : [...progress.studyDays, today],
      });
      return;
    }
    setQuizIndex((index) => index + 1);
    setQuizChoice(null);
    setQuizRevealed(false);
  }

  function exportBackup() {
    const payload = { product: "AI LAB", schema: 1, exportedAt: new Date().toISOString(), progress };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "ai-lab-progresso.json";
    anchor.click();
    URL.revokeObjectURL(url);
    setNotice("Backup exportado. Guarde o arquivo para transferir seu progresso a outro dispositivo.");
  }

  async function importBackup(file: File | undefined) {
    if (!file) return;
    try {
      const parsed = JSON.parse(await file.text()) as { progress?: unknown };
      if (!isValidProgress(parsed.progress)) throw new Error("Arquivo incompatível");
      commit(parsed.progress);
      setNotice("Backup importado com sucesso.");
    } catch {
      setNotice("Não foi possível importar. Selecione um backup JSON criado pelo AI LAB.");
    }
  }

  const filteredGlossary = glossary.filter((item) => `${item.term} ${item.definition}`.toLowerCase().includes(librarySearch.toLowerCase()));
  const filteredCards = flashcards.filter((item) => `${item.front} ${item.back}`.toLowerCase().includes(librarySearch.toLowerCase()));
  const filteredApplications = applicationDomains.filter((domain) => (applicationGroup === "Todas" || domain.group === applicationGroup) && `${domain.name} ${domain.summary} ${domain.useCases.join(" ")} ${domain.group}`.toLowerCase().includes(applicationSearch.toLowerCase()));

  return (
    <div className="app-frame">
      <aside className="sidebar">
        <a className="brand-lockup" href="#inicio" onClick={() => setTab("home")} aria-label="AI LAB, início">
          <span className="brand-symbol"><BrandMark /></span>
          <span className="brand-copy"><strong>AI LAB</strong><small>ACADEMIA DE IA</small></span>
        </a>
        <div className="sidebar-caption">ESPAÇO DE ESTUDO</div>
        <nav className="side-nav" aria-label="Navegação principal">
          {tabs.map((item) => (
            <button key={item.id} className={`nav-item ${tab === item.id ? "is-active" : ""}`} onClick={() => { setTab(item.id); setActiveLessonId(null); setSelectedProjectId(null); }}>
              <span className="nav-symbol" aria-hidden="true">{item.symbol}</span><span>{item.label}</span>
              {item.id === "tracks" && <span className="nav-count">{modules.length}</span>}
            </button>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="sidebar-progress-head"><span>SEU PERCURSO</span><strong>{percent}%</strong></div>
          <div className="mini-progress"><span style={{ width: `${percent}%` }} /></div>
          <p>{completedCount} de {totalLessons} aulas concluídas</p>
          <div className="sidebar-note"><span className="note-mark">i</span><span>Aprenda no seu ritmo. O progresso fica salvo neste navegador.</span></div>
        </div>
      </aside>

      <main className="main-area" id="inicio">
        <header className="topbar">
          <div className="breadcrumb"><span>AI LAB</span><i>/</i><strong>{tabs.find((item) => item.id === tab)?.label ?? "Estudo"}</strong></div>
          <div className="topbar-actions"><span className={`save-state ${ready ? "is-ready" : ""}`}><i />{ready ? "SALVO LOCALMENTE" : "CARREGANDO"}</span><label className="backup-import" htmlFor="backup-import">Importar backup <span>↧</span></label><input id="backup-import" className="visually-hidden" type="file" accept="application/json,.json" onChange={(event) => { void importBackup(event.currentTarget.files?.[0]); event.currentTarget.value = ""; }} /><button className="topbar-backup" onClick={exportBackup}>Exportar progresso <span>↗</span></button></div>
        </header>

        {notice && <div className="notice" role="status"><span>{notice}</span><button onClick={() => setNotice("")} aria-label="Fechar aviso">×</button></div>}

        {tab === "home" && (
          <section className="page-content dashboard-page">
            <div className="hero-panel">
              <div className="hero-copy">
                <div className="eyebrow"><span className="eyebrow-line" /> CENTRO DE APRENDIZAGEM</div>
                <h1>Entenda a IA.<br /><em>Aplique na prática.</em></h1>
                <p>Uma formação técnica multidisciplinar para entender como a IA funciona, construir soluções e aplicá-las em ciência, saúde, indústria, agricultura, negócios, educação, arte e muito mais.</p>
                <div className="hero-actions"><button className="primary-action" onClick={() => openLesson(nextLesson.id)}>Continuar estudando <span>↗</span></button><button className="text-action" onClick={() => setTab("applications")}>Explorar aplicações <span>→</span></button></div>
                <div className="hero-meta"><span><b>08</b> TRILHAS</span><span><b>{totalLessons}</b> AULAS</span><span><b>30-60</b> MIN / DIA</span></div>
              </div>
              <div className="hero-visual" aria-label="Diagrama do fluxo entre dados, inteligência artificial e decisão de engenharia">
                <div className="diagram-topline"><span>FLUXO DE APLICAÇÃO</span><span>AI / ENG. 01</span></div>
                <WorkflowDiagram />
                <div className="diagram-caption"><span>01 / DADOS</span><span>02 / MODELO</span><span>03 / DECISÃO</span></div>
                <div className="diagram-foot">DA INFORMAÇÃO À AÇÃO TÉCNICA</div>
              </div>
            </div>

            <div className="section-heading"><div><span className="section-kicker">SEU PONTO DE PARTIDA</span><h2>Visão geral</h2></div><span className="heading-date">{new Date().toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" })}</span></div>
            <div className="stats-grid">
              <StatCard label="Aulas concluídas" value={`${completedCount}/${totalLessons}`} detail={`${percent}% do currículo`} progress={percent} symbol="↗" />
              <StatCard label="Tempo de estudo" value={`${Math.floor(progress.totalMinutes / 60)}h ${progress.totalMinutes % 60}m`} detail="Tempo registrado nas aulas" symbol="◷" />
              <StatCard label="Dias de estudo" value={String(progress.studyDays.length)} detail={studiedToday ? "Você estudou hoje" : "Sua próxima sessão começa hoje"} symbol="▦" />
              <StatCard label="Melhor avaliação" value={`${progress.bestQuizScore}%`} detail="Sua maior pontuação" symbol="◎" />
            </div>

            <div className="dashboard-columns">
              <section className="continue-card">
                <div className="card-overline"><span>PRÓXIMA ETAPA</span><span className="live-index">AULA {String(Math.max(1, allLessons.findIndex((lesson) => lesson.id === nextLesson.id) + 1)).padStart(2, "0")}</span></div>
                <div className="continue-main"><div><span className="module-tag">{modules.find((module) => module.lessons.some((lesson) => lesson.id === nextLesson.id))?.title}</span><h3>{nextLesson.title}</h3><p>{nextLesson.summary}</p></div><div className="duration-mark"><strong>{nextLesson.duration}</strong><small>MIN</small></div></div>
                <div className="continue-footer"><span>RITMO SUGERIDO: 30 A 60 MIN / DIA</span><button onClick={() => openLesson(nextLesson.id)}>Abrir aula <span>→</span></button></div>
              </section>
              <section className="daily-card">
                <div className="daily-head"><span className="daily-icon">✳</span><span>ROTINA DE ESTUDO</span></div>
                <h3>Uma sessão consistente vale mais que uma maratona.</h3>
                <div className="daily-steps"><div><b>10 min</b><span>Revisar conceitos</span></div><div><b>20 min</b><span>Estudar uma aula</span></div><div><b>10 min</b><span>Aplicar em um exemplo</span></div></div>
                <div className="daily-footer"><span>{studiedToday ? "SESSÃO REGISTRADA HOJE" : "40 MINUTOS PARA COMEÇAR"}</span><span className="daily-status">{studiedToday ? "✓" : "40:00"}</span></div>
              </section>
            </div>

            <div className="section-heading compact-heading"><div><span className="section-kicker">MAPA DE FORMAÇÃO</span><h2>Suas trilhas</h2></div><button className="heading-link" onClick={() => setTab("tracks")}>Ver todas <span>↗</span></button></div>
            <div className="track-overview-list">
              {modules.slice(0, 4).map((module, index) => {
                const done = module.lessons.filter((lesson) => progress.completedLessonIds.includes(lesson.id)).length;
                const modulePercent = Math.round((done / module.lessons.length) * 100);
                return <button className="track-overview-row" key={module.id} onClick={() => { setSelectedModuleId(module.id); setActiveLessonId(null); setTab("tracks"); }}><span className="track-index">0{index + 1}</span><span className="track-title"><strong>{module.title}</strong><small>{module.subtitle}</small></span><span className="track-progress-wrap"><span className="track-progress"><i style={{ width: `${modulePercent}%` }} /></span><small>{done}/{module.lessons.length}</small></span><span className="row-arrow">↗</span></button>;
              })}
            </div>
            <div className="home-bottom-grid"><button className="home-feature feature-lab" onClick={() => setTab("lab")}><span className="feature-index">PRÁTICA APLICADA</span><strong>Saia da teoria.<br />Construa um projeto.</strong><span className="feature-link">Abrir laboratório ↗</span><span className="feature-graphic">⌘</span></button><button className="home-feature feature-library" onClick={() => setTab("library")}><span className="feature-index">MEMÓRIA DE LONGO PRAZO</span><strong>Revisar também<br />é aprender.</strong><span className="feature-link">Abrir biblioteca ↗</span><span className="feature-graphic">▤</span></button></div>
          </section>
        )}

        {tab === "tracks" && (
          <section className="page-content">
            <PageIntro eyebrow="FORMAÇÃO PROGRESSIVA" title="Currículo de IA" description="Uma formação progressiva: dos fundamentos matemáticos e computacionais à pesquisa, construção, avaliação e aplicação profissional de sistemas de IA em diferentes setores." />
            {activeLesson ? (
              <div className="lesson-layout">
                <aside className="lesson-sidebar"><button className="back-link" onClick={() => setActiveLessonId(null)}>← Todas as trilhas</button><div className="lesson-side-title">{activeModule?.title}</div>{activeModule?.lessons.map((lesson, index) => <button key={lesson.id} className={`lesson-side-item ${activeLesson.id === lesson.id ? "selected" : ""}`} onClick={() => setActiveLessonId(lesson.id)}><span>{progress.completedLessonIds.includes(lesson.id) ? "✓" : String(index + 1).padStart(2, "0")}</span>{lesson.title}</button>)}</aside>
                <article className="lesson-article"><div className="lesson-meta"><span>{activeModule?.level}</span><span>{activeLesson.duration} MIN DE ESTUDO</span><span>{progress.completedLessonIds.includes(activeLesson.id) ? "CONCLUÍDA" : "EM ANDAMENTO"}</span></div><h2>{activeLesson.title}</h2><p className="lesson-lead">{activeLesson.summary}</p><div className="objectives-box"><strong>AO FINAL DESTA AULA, VOCÊ VAI:</strong>{activeLesson.objectives.map((objective) => <span key={objective}><i>✓</i>{objective}</span>)}</div>{lessonDepth[activeLesson.id] && <><section className="lesson-depth-panel beginner-panel"><div className="depth-kicker">01 / FUNDAMENTO · SEM PRÉ-REQUISITOS</div><h3>Comece do zero</h3><p>{lessonDepth[activeLesson.id].fromZero}</p></section><section className="lesson-depth-panel"><div className="depth-kicker">02 / CAMADA TÉCNICA</div><h3>Indo mais fundo</h3><p>{lessonDepth[activeLesson.id].deeper}</p></section></>}{activeLesson.sections.map((section) => <section className="lesson-section" key={section.heading}><h3>{section.heading}</h3><p>{section.body}</p>{section.bullets && <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}</section>)}{lessonDepth[activeLesson.id] && <><section className="lesson-depth-panel case-panel"><div className="depth-kicker">03 / APLICAÇÃO ORIENTADA</div><h3>Estudo de caso</h3><p>{lessonDepth[activeLesson.id].caseStudy}</p></section><section className="lesson-depth-panel caution-panel"><div className="depth-kicker">04 / PONTO DE ATENÇÃO</div><h3>Erro comum a evitar</h3><p>{lessonDepth[activeLesson.id].commonMistake}</p></section><section className="lesson-depth-panel terms-panel"><div className="depth-kicker">05 / VOCABULÁRIO ESSENCIAL</div><h3>Termos desta aula</h3><div className="lesson-term-grid">{lessonDepth[activeLesson.id].keyTerms.map((term) => <div className="lesson-term" key={term.term}><strong>{term.term}</strong><p>{term.meaning}</p></div>)}</div></section></>}<div className="example-box"><span>EXEMPLO APLICADO</span><p>{activeLesson.example}</p></div><div className="practice-box"><span>EXERCÍCIO DE FIXAÇÃO</span><p>{activeLesson.practice}</p><small>Tente responder antes de consultar o material novamente.</small></div><div className="checkpoint-box"><span>IDEIA-CHAVE</span><p>{activeLesson.checkpoint}</p></div>{lessonGuides[activeLesson.id] && <div className="lesson-guide"><div className="guide-header"><span className="section-kicker">CADERNO TÉCNICO · APROFUNDAMENTO</span><h2>Estudo em profundidade</h2><p>{lessonGuides[activeLesson.id].lead}</p></div>{lessonGuides[activeLesson.id].sections.map((section, index) => <section className="guide-section" key={section.title}><span className="depth-kicker">CAMADA TÉCNICA {String(index + 1).padStart(2,"0")}</span><h3>{section.title}</h3><p>{section.explanation}</p><ul>{section.points.map((point) => <li key={point}>{point}</li>)}</ul></section>)}{lessonGuides[activeLesson.id].equation && <div className="guide-equation"><span>MODELO MATEMÁTICO</span><code>{lessonGuides[activeLesson.id].equation}</code></div>}<section className="guide-lab"><span className="depth-kicker">APRENDIZAGEM ATIVA</span><h3>Laboratório guiado</h3><ol>{lessonGuides[activeLesson.id].lab.map((step) => <li key={step.step}><strong>{step.step}</strong><p>{step.detail}</p></li>)}</ol></section>{lessonGuides[activeLesson.id].code && <section className="guide-code"><h3>Esquema de implementação</h3><p>O trecho abaixo é um esquema didático. Adapte-o ao ambiente e às bibliotecas usadas no laboratório.</p><pre><code>{lessonGuides[activeLesson.id].code}</code></pre></section>}<section className="guide-assessment"><h3>Verifique sua compreensão</h3><ol>{lessonGuides[activeLesson.id].assessment.map((question) => <li key={question}>{question}</li>)}</ol></section><section className="guide-references"><h3>Fontes para aprofundamento</h3>{lessonGuides[activeLesson.id].references.map((reference) => <a key={reference.url} href={reference.url} target="_blank" rel="noreferrer">{reference.title} ↗</a>)}</section></div>}{lessonLabs[activeLesson.id] && <RunnableLab key={activeLesson.id} lab={lessonLabs[activeLesson.id]} />}<div className="lesson-actions"><button className="primary-action" onClick={markLessonComplete}>{progress.completedLessonIds.includes(activeLesson.id) ? "Concluída" : "Marcar aula como concluída"} <span>✓</span></button><button className="text-action" onClick={() => { const i = allLessons.findIndex((lesson) => lesson.id === activeLesson.id); if (allLessons[i + 1]) setActiveLessonId(allLessons[i + 1].id); }}>Próxima aula →</button></div></article>
              </div>
            ) : (
              <div className="curriculum-layout"><aside className="module-index"><div className="module-index-title">PERCURSO COMPLETO <strong>08</strong></div>{modules.map((module, index) => { const done = module.lessons.filter((lesson) => progress.completedLessonIds.includes(lesson.id)).length; return <button key={module.id} className={`module-index-item ${selectedModuleId === module.id ? "selected" : ""}`} onClick={() => setSelectedModuleId(module.id)}><span className="module-index-number">{String(index + 1).padStart(2, "0")}</span><span><strong>{module.title}</strong><small>{done} de {module.lessons.length} aulas</small></span><i>→</i></button>; })}</aside><div className="module-detail"><div className="module-detail-head"><div><span className="section-kicker">TRILHA {String(modules.findIndex((module) => module.id === selectedModule.id) + 1).padStart(2, "0")} / {selectedModule.level.toUpperCase()}</span><h2>{selectedModule.title}</h2><p>{selectedModule.description}</p></div><div className="module-duration"><strong>{selectedModule.duration}</strong><small>ESTIMATIVA</small></div></div><div className="module-progress-line"><span><i style={{ width: `${Math.round((selectedModule.lessons.filter((lesson) => progress.completedLessonIds.includes(lesson.id)).length / selectedModule.lessons.length) * 100)}%` }} /></span><small>{selectedModule.lessons.filter((lesson) => progress.completedLessonIds.includes(lesson.id)).length} / {selectedModule.lessons.length} concluídas</small></div><div className="lesson-list">{selectedModule.lessons.map((lesson, index) => { const done = progress.completedLessonIds.includes(lesson.id); return <button key={lesson.id} className="lesson-row" onClick={() => openLesson(lesson.id)}><span className={`lesson-row-index ${done ? "done" : ""}`}>{done ? "✓" : String(index + 1).padStart(2, "0")}</span><span className="lesson-row-copy"><strong>{lesson.title}</strong><small>{lesson.summary}</small></span><span className="lesson-row-time">{lesson.duration} min</span><span className="lesson-row-arrow">↗</span></button>; })}</div></div></div>
            )}
          </section>
        )}

        {tab === "applications" && (
          <section className="page-content">
            <PageIntro eyebrow="IA EM TODOS OS SETORES" title="Campos de aplicação" description="A mesma base técnica pode resolver problemas muito diferentes. Explore setores, problemas, métodos, dados, projetos e riscos antes de escolher uma especialização." />
            <div className="application-intro">
              <div className="application-flow"><span>Problema real</span><i>→</i><span>Dados confiáveis</span><i>→</i><span>Método adequado</span><i>→</i><span>Validação</span><i>→</i><span>Uso responsável</span></div>
              <p>Uma aplicação profissional não começa escolhendo a ferramenta da moda. Começa definindo a decisão que precisa melhorar, quem será afetado, quais dados existem e como o resultado será validado.</p>
            </div>
            <div className="application-toolbar">
              <label className="search-field"><span>⌕</span><input value={applicationSearch} onChange={(event) => setApplicationSearch(event.target.value)} placeholder="Buscar setor ou aplicação..." /></label>
              <div className="application-filters">{applicationGroups.map((group) => <button key={group} className={applicationGroup === group ? "selected" : ""} onClick={() => setApplicationGroup(group)}>{group}</button>)}</div>
            </div>
            <div className="application-grid">
              {filteredApplications.map((domain) => (
                <button key={domain.id} className={`application-card ${selectedApplicationId === domain.id ? "selected" : ""}`} onClick={() => setSelectedApplicationId(domain.id)}>
                  <span className="application-card-group">{domain.group}</span><strong>{domain.name}</strong><p>{domain.summary}</p><span className="application-card-link">Explorar aplicações ↗</span>
                </button>
              ))}
            </div>
            {(() => { const domain = filteredApplications.find((item) => item.id === selectedApplicationId) ?? filteredApplications[0]; return domain ? (
              <article className="application-detail">
                <div className="application-detail-head"><div><span className="section-kicker">DOS CONCEITOS À PRÁTICA · {domain.group.toUpperCase()}</span><h2>{domain.name}</h2><p>{domain.summary}</p></div><span className="application-count">{domain.useCases.length} frentes de aplicação</span></div>
                <div className="application-detail-grid">
                  <section><h3>Onde a IA pode ser aplicada</h3><ul>{domain.useCases.map((item) => <li key={item}>{item}</li>)}</ul></section>
                  <section><h3>Projeto de laboratório</h3><p>{domain.project}</p><h3>Métodos e tecnologias</h3><div className="application-tags">{domain.methods.map((method) => <span key={method}>{method}</span>)}</div></section>
                  <section><h3>Dados necessários</h3><p>{domain.data}</p><h3>Limitações e responsabilidade</h3><p>{domain.cautions}</p></section>
                </div>
              </article>
            ) : <div className="empty-state">Nenhuma área encontrada. Ajuste a busca ou o filtro.</div>; })()}
            <section className="reference-library">
              <div className="reference-heading"><span className="section-kicker">FONTES PARA ESTUDO</span><h2>Biblioteca técnica e científica</h2><p>Comece por materiais institucionais e documentação primária. Confira sempre a versão e a data de atualização antes de reproduzir um procedimento.</p></div>
              <div className="reference-grid">{learningResources.map((resource) => <a className="reference-card" key={resource.url} href={resource.url} target="_blank" rel="noreferrer"><span>{resource.kind} · {resource.institution}</span><strong>{resource.title}</strong><p>{resource.topics}</p><b>Consultar fonte ↗</b></a>)}</div>
            </section>
          </section>
        )}

        {tab === "lab" && (
          <section className="page-content">
            <PageIntro eyebrow="APRENDER FAZENDO" title="Laboratório prático" description="Projetos guiados para transformar conceitos em entregas demonstráveis. Comece pequeno, registre evidências e evolua." />
            {selectedProject ? <div className="project-detail"><button className="back-link" onClick={() => setSelectedProjectId(null)}>← Todos os projetos</button><div className="project-detail-head"><span className="section-kicker">FICHA DE PROJETO / {selectedProject.level.toUpperCase()}</span><h2>{selectedProject.title}</h2><p>{selectedProject.description}</p><div className="project-tags">{selectedProject.skills.map((skill) => <span key={skill}>{skill}</span>)}</div></div><div className="project-workspace"><div><span className="section-kicker">ROTEIRO DE EXECUÇÃO</span><h3>Etapas do trabalho</h3>{selectedProject.steps.map((step, index) => <div className="project-step" key={step}><span>{String(index + 1).padStart(2, "0")}</span><p>{step}</p></div>)}</div><aside className="deliverable-box"><span>ENTREGA ESPERADA</span><p>{selectedProject.deliverable}</p><small>Tempo estimado: {selectedProject.time}</small><button className={`project-complete ${progress.completedProjectIds.includes(selectedProject.id) ? "completed" : ""}`} onClick={() => markProjectComplete(selectedProject.id)}>{progress.completedProjectIds.includes(selectedProject.id) ? "Projeto concluído ✓" : "Marcar projeto concluído"}</button></aside></div></div> : <div className="project-grid">{projects.map((project, index) => <button className="project-card" key={project.id} onClick={() => setSelectedProjectId(project.id)}><div className="project-card-top"><span>PROJETO 0{index + 1}</span><span>{progress.completedProjectIds.includes(project.id) ? "✓ CONCLUÍDO" : project.level.toUpperCase()}</span></div><h3>{project.title}</h3><p>{project.description}</p><div className="project-card-tags">{project.skills.map((skill) => <span key={skill}>{skill}</span>)}</div><div className="project-card-bottom"><span>{project.time}</span><strong>Abrir ficha ↗</strong></div></button>)}</div>}
          </section>
        )}

        {tab === "library" && (
          <section className="page-content">
            <PageIntro eyebrow="REVISÃO E CONSULTA" title="Biblioteca de conhecimento" description="Consolide conceitos com cartões de memória e consulte um glossário técnico que cresce junto com seu repertório." />
            <div className="library-toolbar"><div className="library-switch"><button className={libraryMode === "cards" ? "selected" : ""} onClick={() => setLibraryMode("cards")}>Flashcards <span>{flashcards.length}</span></button><button className={libraryMode === "glossary" ? "selected" : ""} onClick={() => setLibraryMode("glossary")}>Glossário <span>{glossary.length}</span></button></div><label className="search-field"><span>⌕</span><input value={librarySearch} onChange={(event) => setLibrarySearch(event.target.value)} placeholder="Buscar conceito..." /></label></div>
            {libraryMode === "cards" ? <div className="flashcard-area"><div className="flashcard-counter">CARTÃO {String(cardIndex + 1).padStart(2, "0")} / {String(flashcards.length).padStart(2, "0")}</div>{filteredCards.length ? <button className={`flashcard ${cardFlipped ? "flipped" : ""}`} onClick={() => setCardFlipped((value) => !value)}><span className="flashcard-side">{cardFlipped ? "RESPOSTA" : "PERGUNTA"}</span><strong>{cardFlipped ? filteredCards[cardIndex % filteredCards.length].back : filteredCards[cardIndex % filteredCards.length].front}</strong><small>{cardFlipped ? "Toque para voltar à pergunta" : "Toque para revelar a resposta"}</small></button> : <div className="empty-state">Nenhum cartão corresponde à busca.</div>}<div className="flashcard-controls"><button onClick={() => { setCardIndex((index) => (index - 1 + Math.max(filteredCards.length, 1)) % Math.max(filteredCards.length, 1)); setCardFlipped(false); }}>← Anterior</button><button className="primary-action" onClick={() => { setCardIndex((index) => (index + 1) % Math.max(filteredCards.length, 1)); setCardFlipped(false); }}>Próximo cartão <span>→</span></button></div></div> : <div className="glossary-list">{filteredGlossary.map((item) => <article className="glossary-row" key={item.term}><h3>{item.term}</h3><p>{item.definition}</p></article>)}{!filteredGlossary.length && <div className="empty-state">Nenhum termo encontrado.</div>}</div>}
          </section>
        )}

        {tab === "assessment" && (
          <section className="page-content">
            <PageIntro eyebrow="VERIFICAÇÃO DE APRENDIZADO" title="Avalie o que aprendeu" description="Responda sem consultar o material. Cada questão traz uma explicação para reforçar o raciocínio." />
            {!quizFinished ? <div className="quiz-panel"><div className="quiz-progress-head"><span>QUESTÃO {String(quizIndex + 1).padStart(2, "0")} DE {String(quizQuestions.length).padStart(2, "0")}</span><span>{quizScore} acertos até agora</span></div><div className="quiz-progress"><i style={{ width: `${((quizIndex + 1) / quizQuestions.length) * 100}%` }} /></div><h2>{quizQuestion.question}</h2><div className="quiz-options">{quizQuestion.options.map((option, index) => { const correct = quizRevealed && index === quizQuestion.answer; const wrong = quizRevealed && quizChoice === index && index !== quizQuestion.answer; return <button key={option} className={`quiz-option ${correct ? "correct" : ""} ${wrong ? "wrong" : ""}`} onClick={() => chooseAnswer(index)} disabled={quizRevealed}><span>{String.fromCharCode(65 + index)}</span>{option}{correct && <b>✓</b>}{wrong && <b>×</b>}</button>; })}</div>{quizRevealed && <div className="quiz-explanation"><strong>{quizChoice === quizQuestion.answer ? "Resposta correta" : "Vamos revisar"}</strong><p>{quizQuestion.explanation}</p></div>}<div className="quiz-footer"><span>Escolha uma alternativa para conferir a explicação.</span>{quizRevealed && <button className="primary-action" onClick={nextQuestion}>{quizIndex + 1 === quizQuestions.length ? "Ver resultado" : "Próxima questão"} <span>→</span></button>}</div></div> : <div className="quiz-result"><span className="result-symbol">{Math.round((quizScore / quizQuestions.length) * 100) >= 70 ? "✓" : "↗"}</span><span className="section-kicker">AVALIAÇÃO FINALIZADA</span><h2>{quizScore} de {quizQuestions.length} respostas corretas</h2><p>Você acertou {Math.round((quizScore / quizQuestions.length) * 100)}% das questões. Revise os temas em que teve dúvida e tente novamente quando quiser.</p><button className="primary-action" onClick={startQuiz}>Refazer avaliação <span>↻</span></button></div>}
          </section>
        )}

        <footer className="site-footer"><span>AI LAB / ACADEMIA DE INTELIGÊNCIA ARTIFICIAL</span><span>ESTUDO CONTÍNUO. APLICAÇÃO REAL.</span></footer>
      </main>

      <nav className="mobile-nav" aria-label="Navegação móvel">{tabs.map((item) => <button key={item.id} className={tab === item.id ? "active" : ""} onClick={() => { setTab(item.id); setActiveLessonId(null); setSelectedProjectId(null); }}><span>{item.symbol}</span><small>{item.label === "Visão geral" ? "Início" : item.label}</small></button>)}</nav>
    </div>
  );
}

function BrandMark() {
  return <svg viewBox="0 0 48 48" aria-hidden="true"><path d="M8 36 22.8 7h2.4L40 36h-7.2l-8.8-18.3L15.2 36H8Z" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round"/><path d="M17 29h14M24 7v-3M39 36l4 3" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/><circle cx="24" cy="29" r="2.4" fill="currentColor"/></svg>;
}

function WorkflowDiagram() {
  return <svg className="workflow-svg" viewBox="0 0 520 310" role="img" aria-labelledby="workflow-title workflow-desc"><title id="workflow-title">Fluxo de aplicação de IA na engenharia</title><desc id="workflow-desc">Dados de sensores e documentos alimentam um modelo que apoia uma decisão técnica revisada por uma pessoa.</desc><defs><linearGradient id="flow-line" x1="0" x2="1"><stop offset="0" stopColor="#98584F" stopOpacity=".18"/><stop offset="1" stopColor="#98584F"/></linearGradient></defs><path d="M91 153H205M315 153H427" fill="none" stroke="url(#flow-line)" strokeWidth="2.5" strokeDasharray="5 6"/><path d="m197 146 9 7-9 7M419 146l9 7-9 7" fill="none" stroke="#98584F" strokeWidth="2"/><g transform="translate(22 74)"><rect width="126" height="158" rx="8" fill="#FBFCFA" stroke="#D5DAD4"/><rect x="14" y="15" width="98" height="8" rx="2" fill="#DDE2DC"/><path d="M18 53h16l8-17 12 35 11-26 10 8h22" fill="none" stroke="#98584F" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M18 91h88M18 105h72M18 119h82" stroke="#D5DAD4" strokeWidth="4" strokeLinecap="round"/><text x="16" y="145" fontSize="10" fill="#53605C" fontFamily="monospace">SENSORES / DADOS</text></g><g transform="translate(196 74)"><rect width="126" height="158" rx="8" fill="#202927"/><circle cx="63" cy="63" r="31" fill="none" stroke="#C58A7E" strokeWidth="1.5"/><circle cx="63" cy="63" r="18" fill="none" stroke="#C58A7E" strokeOpacity=".65"/><circle cx="63" cy="63" r="5" fill="#C58A7E"/><path d="M63 24v15M63 87v15M24 63h15M87 63h15M36 36l11 11M79 79l11 11M90 36 79 47M47 79 36 90" stroke="#C58A7E" strokeWidth="1.5" strokeLinecap="round"/><text x="63" y="128" textAnchor="middle" fontSize="10" fill="#FBFCFA" fontFamily="monospace">MODELO DE IA</text><text x="63" y="141" textAnchor="middle" fontSize="8" fill="#AAB5AE" fontFamily="monospace">PADRÕES / PREVISÃO</text></g><g transform="translate(374 74)"><rect width="126" height="158" rx="8" fill="#FBFCFA" stroke="#D5DAD4"/><path d="M63 23 91 39v32L63 87 35 71V39l28-16Z" fill="#F1E4E1" stroke="#98584F" strokeWidth="1.5"/><path d="m51 55 8 8 17-19" fill="none" stroke="#98584F" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M18 104h90M18 118h76" stroke="#D5DAD4" strokeWidth="4" strokeLinecap="round"/><text x="16" y="145" fontSize="10" fill="#53605C" fontFamily="monospace">DECISÃO HUMANA</text></g><path d="M85 55v-20h350v20" fill="none" stroke="#D5DAD4" strokeWidth="1.2" strokeDasharray="3 5"/><text x="260" y="22" textAnchor="middle" fontSize="10" letterSpacing="2" fill="#53605C" fontFamily="monospace">CICLO DE CONHECIMENTO</text><text x="260" y="281" textAnchor="middle" fontSize="10" letterSpacing="1.2" fill="#53605C" fontFamily="monospace">MEDIR  /  INTERPRETAR  /  VALIDAR</text></svg>;
}

function StatCard({ label, value, detail, progress, symbol }: { label: string; value: string; detail: string; progress?: number; symbol: string }) {
  return <div className="stat-card"><div className="stat-top"><span>{label}</span><i>{symbol}</i></div><strong>{value}</strong><small>{detail}</small>{progress !== undefined && <div className="stat-progress"><i style={{ width: `${progress}%` }} /></div>}</div>;
}

function PageIntro({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return <div className="page-intro"><span className="section-kicker">{eyebrow}</span><h1>{title}</h1><p>{description}</p></div>;
}
