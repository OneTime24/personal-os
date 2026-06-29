import { useEffect, useState } from "react";

import Card from "../components/Card";
import PageHeader from "../components/PageHeader";

function Settings() {
  const [name, setName] = useState("");
  const [goal, setGoal] = useState(5);

  useEffect(() => {
    const savedName = localStorage.getItem("displayName") || "";
    const savedGoal = localStorage.getItem("dailyGoal") || 5;

    setName(savedName);
    setGoal(savedGoal);
  }, []);

  function saveSettings() {
    localStorage.setItem("displayName", name);
    localStorage.setItem("dailyGoal", goal);

    alert("Settings saved successfully!");
  }

  function exportData() {
    const data = {
      schedules: JSON.parse(localStorage.getItem("schedules") || "[]"),
      dailyCompletions: JSON.parse(
        localStorage.getItem("dailyCompletions") || "{}"
      ),
      displayName: localStorage.getItem("displayName") || "",
      dailyGoal: localStorage.getItem("dailyGoal") || 5,
    };

    const blob = new Blob(
      [JSON.stringify(data, null, 2)],
      {
        type: "application/json",
      }
    );

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;
    a.download = "personal-os-backup.json";

    a.click();

    URL.revokeObjectURL(url);
  }

  function importData(event) {
    const file = event.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {
      const data = JSON.parse(e.target.result);

      if (data.schedules)
        localStorage.setItem(
          "schedules",
          JSON.stringify(data.schedules)
        );

      if (data.dailyCompletions)
        localStorage.setItem(
          "dailyCompletions",
          JSON.stringify(data.dailyCompletions)
        );

      if (data.displayName)
        localStorage.setItem(
          "displayName",
          data.displayName
        );

      if (data.dailyGoal)
        localStorage.setItem(
          "dailyGoal",
          data.dailyGoal
        );

      alert("Import successful! Refresh the page.");
    };

    reader.readAsText(file);
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Settings"
        subtitle="Customize your PersonalOS."
      />

      <Card>
        <h2 className="text-xl font-semibold mb-4">
          Profile
        </h2>

        <input
          className="w-full border rounded-lg p-3 mb-4"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="number"
          className="w-full border rounded-lg p-3"
          placeholder="Daily Goal"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
        />

        <button
          onClick={saveSettings}
          className="mt-5 bg-blue-600 text-white px-5 py-2 rounded-lg"
        >
          Save Settings
        </button>
      </Card>

      <Card>
        <h2 className="text-xl font-semibold mb-4">
          Backup
        </h2>

        <div className="flex gap-4 flex-wrap">
          <button
            onClick={exportData}
            className="bg-green-600 text-white px-5 py-2 rounded-lg"
          >
            Export Data
          </button>

          <label className="bg-slate-700 text-white px-5 py-2 rounded-lg cursor-pointer">
            Import Data

            <input
              type="file"
              accept=".json"
              hidden
              onChange={importData}
            />
          </label>
        </div>
      </Card>
    </div>
  );
}

export default Settings;