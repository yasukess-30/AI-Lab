import { modules } from "../src/data/curriculum";
import { lessonLabs } from "../src/data/lesson-labs";

const lessonIds = new Set(modules.flatMap((module) => module.lessons.map((lesson) => lesson.id)));
const labEntries = Object.entries(lessonLabs);
const errors: string[] = [];

for (const [lessonId, lab] of labEntries) {
  if (!lessonIds.has(lessonId)) {
    errors.push(`${lessonId}: ID não existe no currículo`);
    continue;
  }

  const rows = lab.datasetCsv.trim().split(/\r?\n/);
  if (rows.length < 2 || !rows[0].includes(",")) {
    errors.push(`${lessonId}: CSV sem cabeçalho ou sem linhas de dados`);
  }

  const output: unknown[][] = [];
  try {
    const execute = new Function("console", lab.code) as (consoleLike: { log: (...values: unknown[]) => void }) => void;
    execute({ log: (...values) => output.push(values) });
    if (output.length === 0) errors.push(`${lessonId}: exemplo não produziu saída`);
  } catch (error) {
    errors.push(`${lessonId}: ${error instanceof Error ? error.message : String(error)}`);
  }
}

const uncovered = [...lessonIds].filter((id) => !Object.hasOwn(lessonLabs, id));
console.log(`Laboratórios validados: ${labEntries.length}`);
console.log(`Aulas sem laboratório interativo nesta etapa: ${uncovered.length}`);
if (errors.length) {
  console.error(errors.join("\n"));
  throw new Error(`Falha na validação de ${errors.length} item(ns).`);
}
console.log("Todos os exemplos JavaScript executaram e produziram saída.");
