export interface ErrorPageProps {
  code: number;
  message: string;
}

export default function ErrorPage({ code, message }: ErrorPageProps) {
  return (
    <div className="space-y-3">
      <h1 className="text-2xl font-semibold">{code}</h1>
      <p className="text-muted-foreground">{message}</p>
    </div>
  );
}
