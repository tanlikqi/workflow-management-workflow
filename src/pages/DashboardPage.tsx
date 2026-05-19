import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { FlowsDistribution } from "@/components/dashboard/FlowsDistribution";
import { CallDistribution } from "@/components/dashboard/CallDistribution";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { LastConversations } from "@/components/dashboard/LastConversations";
import { CallsHandled } from "@/components/dashboard/CallsHandled";
import { TotalDuration } from "@/components/dashboard/TotalDuration";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { AiBanner } from "@/components/dashboard/AiBanner";
import { flowsDistribution } from "@/data/mock";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-4 pb-6">
      <DashboardHeader />

      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 lg:col-span-5">
          <FlowsDistribution />
        </div>
        <div className="col-span-12 lg:col-span-7">
          <CallDistribution />
        </div>

        {flowsDistribution.map((flow) => (
          <div key={flow.key} className="col-span-12 sm:col-span-6 lg:col-span-3">
            <MetricCard
              label={flow.label}
              count={flow.count}
              trend={flow.trend}
            />
          </div>
        ))}

        <div className="col-span-12 lg:col-span-5">
          <LastConversations />
        </div>
        <div className="col-span-12 lg:col-span-7">
          <CallsHandled />
        </div>

        <div className="col-span-12 lg:col-span-7">
          <TotalDuration />
        </div>
        <div className="col-span-12 sm:col-span-6 lg:col-span-3">
          <QuickActions />
        </div>
        <div className="col-span-12 sm:col-span-6 lg:col-span-2">
          <AiBanner />
        </div>
      </div>
    </div>
  );
}
