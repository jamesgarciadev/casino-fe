export function Notice({ title, message }: { title: string; message: string }) {
  return (
    <div className="card px-6 py-10 text-center">
      <p className="text-sm font-semibold">{title}</p>
      <p className="mt-1 text-sm text-muted">{message}</p>
    </div>
  );
}

export function ApiErrorNotice({ errors }: { errors: { message: string }[] }) {
  const unauthorized = errors.some((e) => e.message === "This action is unauthorized.");

  return unauthorized ? (
    <Notice title="Access restricted" message="Your role does not include permission to view this section." />
  ) : (
    <Notice title="Could not load data" message={errors[0]?.message ?? "Unknown error."} />
  );
}
