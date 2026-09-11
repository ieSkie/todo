import type { FallbackProps } from "react-error-boundary";

export default function ErrorFallback({
  error,
  resetErrorBoundary,
}: FallbackProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <p className="text-red-500">Что-то пошло не так: {String(error)}</p>
      <button
        onClick={resetErrorBoundary}
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Попробовать снова
      </button>
    </div>
  );
}
