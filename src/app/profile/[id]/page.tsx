export default function UserProfile({ params }: Props) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Profile</h1>
      <hr />
      <p>Profile {params.id}</p>
    </main>
  );
}
