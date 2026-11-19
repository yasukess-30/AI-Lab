export type LearningProgress = {
  completedLessonIds: string[];
  completedProjectIds: string[];
  studyDays: string[];
  lastLessonId: string | null;
  totalMinutes: number;
  bestQuizScore: number;
};

export const EMPTY_PROGRESS: LearningProgress = {
  completedLessonIds: [],
  completedProjectIds: [],
  studyDays: [],
  lastLessonId: null,
  totalMinutes: 0,
  bestQuizScore: 0,
};

const DB_NAME = "ai-lab-learning";
const STORE_NAME = "progress";
const RECORD_KEY = "main";

function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof indexedDB === "undefined") {
      reject(new Error("IndexedDB indisponível neste navegador."));
      return;
    }
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = () => {
      const database = request.result;
      if (!database.objectStoreNames.contains(STORE_NAME)) {
        database.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error ?? new Error("Não foi possível abrir o armazenamento local."));
  });
}

export async function readProgress(): Promise<LearningProgress> {
  const database = await openDatabase();
  return new Promise((resolve, reject) => {
    const transaction = database.transaction(STORE_NAME, "readonly");
    const request = transaction.objectStore(STORE_NAME).get(RECORD_KEY);
    request.onsuccess = () => {
      const value = request.result as LearningProgress | undefined;
      resolve(value ? { ...EMPTY_PROGRESS, ...value } : EMPTY_PROGRESS);
    };
    request.onerror = () => reject(request.error ?? new Error("Não foi possível ler o progresso."));
    transaction.oncomplete = () => database.close();
  });
}

export async function writeProgress(value: LearningProgress): Promise<void> {
  const database = await openDatabase();
  return new Promise((resolve, reject) => {
    const transaction = database.transaction(STORE_NAME, "readwrite");
    transaction.objectStore(STORE_NAME).put(value, RECORD_KEY);
    transaction.oncomplete = () => {
      database.close();
      resolve();
    };
    transaction.onerror = () => reject(transaction.error ?? new Error("Não foi possível salvar o progresso."));
  });
}

export function isValidProgress(value: unknown): value is LearningProgress {
  if (!value || typeof value !== "object") return false;
  const item = value as Record<string, unknown>;
  return Array.isArray(item.completedLessonIds)
    && Array.isArray(item.completedProjectIds)
    && Array.isArray(item.studyDays)
    && typeof item.totalMinutes === "number"
    && typeof item.bestQuizScore === "number";
}
