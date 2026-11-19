import { useMemo, useState } from "react";
import type { LessonLab } from "../data/lesson-labs";

function buildSandboxDocument(code: string): string {
  const safeCode = code.replace(/<\/script/gi, "<\\/script");
  return `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src 'unsafe-inline'; style-src 'unsafe-inline'; connect-src 'none'; img-src data:; font-src 'none'; form-action 'none'; base-uri 'none';">
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
  body{margin:0;padding:14px;background:#17221b;color:#e4eee5;font:12px/1.6 ui-monospace,monospace}
  .label{color:#9cb19e;font-size:10px;letter-spacing:.1em;text-transform:uppercase;margin-bottom:8px}
  pre{margin:0;white-space:pre-wrap;overflow-wrap:anywhere}
  .error{color:#ffb6a8}
</style>
</head>
<body>
<div class="label">Saída da execução local</div><pre id="output">Executando…</pre>
<script>
(() => {
  const output = document.getElementById("output");
  const lines = [];
  const format = (value) => {
    if (typeof value === "string") return value;
    try { return JSON.stringify(value, null, 2); } catch { return String(value); }
  };
  const originalLog = console.log.bind(console);
  console.log = (...values) => {
    lines.push(values.map(format).join(" "));
    output.textContent = lines.join("\\n");
  };
  try {
    ${safeCode}
    if (!lines.length) output.textContent = "Execução concluída sem mensagens no console.";
  } catch (error) {
    output.classList.add("error");
    output.textContent = "Erro: " + (error && error.message ? error.message : String(error));
  }
})();
</script>
</body>
</html>`;
}

export function RunnableLab({ lab }: { lab: LessonLab }) {
  const [code, setCode] = useState(lab.code);
  const [runId, setRunId] = useState(0);
  const [executedCode, setExecutedCode] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const documentHtml = useMemo(() => executedCode !== null ? buildSandboxDocument(executedCode) : "", [executedCode]);

  function downloadDataset() {
    const blob = new Blob([lab.datasetCsv + "\\n"], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = window.document.createElement("a");
    anchor.href = url;
    anchor.download = lab.datasetName;
    anchor.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <section className="runnable-lab" aria-labelledby="runnable-lab-title">
      <div className="runnable-lab-head">
        <div>
          <span className="depth-kicker">OFICINA DE EXPERIMENTAÇÃO · CÓDIGO EXECUTÁVEL</span>
          <h3 id="runnable-lab-title">{lab.title}</h3>
          <p>{lab.goal}</p>
        </div>
        <div className="runnable-lab-meta"><span>{lab.level}</span><span>{lab.minutes} MIN</span></div>
      </div>

      <div className="runnable-lab-resources">
        <div><span>CONJUNTO DE DADOS</span><strong>{lab.datasetName}</strong><p>Dados sintéticos para estudo, sem representar equipamentos reais.</p></div>
        <button type="button" className="lab-secondary-action" onClick={downloadDataset}>Baixar CSV ↓</button>
      </div>

      <label className="lab-editor-label" htmlFor={`lab-code-${lab.datasetName}`}>EDITOR JAVASCRIPT · EDITE O CÓDIGO E EXECUTE</label>
      <textarea
        id={`lab-code-${lab.datasetName}`}
        className="lab-code-editor"
        spellCheck={false}
        autoCapitalize="off"
        autoComplete="off"
        value={code}
        onChange={(event) => setCode(event.target.value)}
      />
      <div className="lab-run-toolbar">
        <button type="button" className="primary-action" onClick={() => { setExecutedCode(code); setRunId((value) => value + 1); }}>Executar código <span>▶</span></button>
        <button type="button" className="lab-secondary-action" onClick={() => setCode(lab.code)}>Restaurar exemplo</button>
        <button type="button" className="lab-secondary-action" onClick={copyCode}>{copied ? "Copiado ✓" : "Copiar código"}</button>
      </div>

      {runId > 0 ? (
        <iframe key={runId} className="lab-output-frame" title={`Resultado: ${lab.title}`} sandbox="allow-scripts" srcDoc={documentHtml} />
      ) : (
        <div className="lab-output-placeholder">A saída aparecerá aqui. O código roda dentro de um quadro isolado no seu navegador, sem enviar o conteúdo a um servidor.</div>
      )}

      <div className="lab-learning-grid">
        <div><span>RESULTADO ESPERADO</span><p>{lab.expected}</p></div>
        <div><span>DESAFIO DE EXTENSÃO</span><p>{lab.challenge}</p></div>
      </div>
      <details className="lab-hint"><summary>Ver pista conceitual</summary><p>{lab.hint}</p></details>
      <p className="lab-safety-note">Ambiente didático local: não cole senhas, dados pessoais, documentos privados ou código de origem desconhecida. O executor não tem acesso ao armazenamento da aplicação e bloqueia conexões de rede.</p>
    </section>
  );
}
