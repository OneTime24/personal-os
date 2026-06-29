import Card from "../components/Card";
import Button from "../components/Button";

function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">
          Good Morning 👋
        </h1>

        <p className="text-slate-500 mt-2">
          Welcome back to PersonalOS.
        </p>
      </div>

      <Card>
        <h2 className="text-xl font-semibold">
          Today's Progress
        </h2>

        <p className="mt-4 text-slate-500">
          No tasks yet.
        </p>
        <div className="mt-6">
        <Button>Add Schedule</Button>
        </div>
      </Card>

      <Card>
        <h2 className="text-xl font-semibold">
          Upcoming Tasks
        </h2>

        <p className="mt-4 text-slate-500">
          Your schedule will appear here.
        </p>
      </Card>
    </div>

    
    
    
  );
}

export default Dashboard;