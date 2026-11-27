import { useState } from "react";
import { Meeting } from "../../api/getAllMeeting";

const tabs = [
  { id: 1, value: "summary", label: "AI Summary" },
  { id: 2, value: "note", label: "Note" },
  { id: 3, value: "comments", label: "Comments" },
] as const;

export type Tab = (typeof tabs)[number]["value"];

export default function MeetingTabs({ meeting }: { meeting: Meeting }) {
  const [activeTab, setActiveTab] = useState<Tab>("summary");

  return (
    <div className="space-y-6">
      <div className="border-b">
        <ul className="flex items-center gap-6">
          {tabs.map((tab) => (
            <li key={tab.id}>
              <button
                type="button"
                onClick={() => setActiveTab(tab.value)}
                className={`relative cursor-pointer pb-3 font-medium transition-colors ${
                  activeTab === tab.value
                    ? "text-blue-700"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.label}

                {activeTab === tab.value && (
                  <span className="absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-blue-700" />
                )}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        {activeTab === "summary" && (
          <div>
            {meeting.summary ? (
              <div className="space-y-5">
                <div>
                  <h3 className="mb-3 text-lg font-semibold text-gray-900">
                    AI Summary
                  </h3>
                  <p className="text-sm leading-7 text-gray-600">
                    {meeting.summary.summary}
                  </p>
                </div>

                <div>
                  <h3 className="mb-3 font-semibold text-red-700">
                    Potential Risks
                  </h3>
                  <ul className="list-disc space-y-2 pl-5 text-sm text-gray-700">
                    {meeting.summary.risks.map((risk, index) => (
                      <li key={index}>{risk}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="mb-3 font-semibold text-blue-700">
                    Next Steps
                  </h3>
                  <ul className="list-disc space-y-2 pl-5 text-sm text-gray-700">
                    {meeting.summary.next_steps.map((step, index) => (
                      <li key={index}>{step}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <p className="py-8 text-center text-sm text-gray-500">
                No AI summary available for this meeting yet.
              </p>
            )}
          </div>
        )}
        {activeTab === "note" && <p>Note content</p>}

        {activeTab === "comments" && <p>Comments content</p>}
      </div>
    </div>
  );
}
