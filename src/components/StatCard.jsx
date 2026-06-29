function StatCard({ title, value }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
      <p className="text-slate-500 text-sm">{title}</p>

      <h2 className="text-3xl font-bold mt-2">{value}</h2>
    </div>
  );
}

export default StatCard;