import { ExtrasList } from '../components/ExtrasList'

export function HomePage() {
  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <h1 className="text-3xl font-bold text-slate-900">Welcome to Gecko Hostel</h1>
        <p className="max-w-2xl text-slate-600">
          Manage your hostel reservations and extras with a modern workflow integrated with
          Lodgify.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-slate-900">Available extras</h2>
        <ExtrasList />
      </section>
    </div>
  )
}
