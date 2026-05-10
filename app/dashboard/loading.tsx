import SkeletonCard from "@/components/SkeletonCard";

export default function DashboardLoading() {
  return (
    <div className="flex-1 flex flex-col items-center py-12 px-4 w-full">
      <div className="w-full max-w-7xl flex flex-col gap-10">
        <div className="border-b border-gray-800/50 pb-6 mb-4">
          <div className="w-64 h-12 bg-[#111] rounded-lg animate-pulse mb-3"></div>
          <div className="w-48 h-6 bg-[#111] rounded-lg animate-pulse"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 flex flex-col gap-8">
            <SkeletonCard />
            <SkeletonCard />
          </div>
          <div className="lg:col-span-1 flex flex-col gap-8">
            <SkeletonCard />
          </div>
        </div>
      </div>
    </div>
  );
}
