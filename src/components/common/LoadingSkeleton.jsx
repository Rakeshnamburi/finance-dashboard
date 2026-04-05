function SkeletonPulse({ className }) {
  return (
    <div className={`relative overflow-hidden bg-bgTertiary/60 rounded-2xl ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent animate-shimmer bg-[length:200%_100%]" />
    </div>
  );
}

function SkeletonRow() {
  return (
    <div className="flex items-center gap-4 px-6 py-4 border-b border-borderSubtle/50">
      <SkeletonPulse className="!rounded-xl w-[44px] h-[44px] shrink-0" />
      <div className="flex-1 flex flex-col gap-2">
        <SkeletonPulse className="!rounded-lg h-[14px] w-[55%]" />
        <SkeletonPulse className="!rounded-lg h-[10px] w-[35%]" />
      </div>
      <div className="flex flex-col items-end gap-2">
        <SkeletonPulse className="!rounded-lg w-[80px] h-[16px]" />
        <SkeletonPulse className="!rounded-full w-[60px] h-[18px]" />
      </div>
    </div>
  );
}

export default function LoadingSkeleton() {
  return (
    <div className="animate-fade-in">
      {/* Stats Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        {[1, 2, 3, 4].map((i) => (
          <div className="glass-card p-5" key={i}>
            <div className="flex justify-between items-start mb-4">
              <SkeletonPulse className="!rounded-lg h-[12px] w-[80px]" />
              <SkeletonPulse className="!rounded-xl w-[48px] h-[48px]" />
            </div>
            <SkeletonPulse className="!rounded-lg h-[28px] w-[60%] mb-3" />
            <SkeletonPulse className="!rounded-full h-[20px] w-[40%]" />
          </div>
        ))}
      </div>

      {/* Charts Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-4 mb-4">
        <div className="glass-card p-6">
          <SkeletonPulse className="!rounded-lg h-[16px] w-[40%] mb-2" />
          <SkeletonPulse className="!rounded-lg h-[12px] w-[25%] mb-6" />
          <SkeletonPulse className="!rounded-xl h-[280px] w-full" />
        </div>
        <div className="glass-card p-6">
          <SkeletonPulse className="!rounded-lg h-[16px] w-[50%] mb-2" />
          <SkeletonPulse className="!rounded-lg h-[12px] w-[30%] mb-6" />
          <SkeletonPulse className="!rounded-full h-[200px] w-[200px] mx-auto" />
        </div>
      </div>

      {/* Transaction List Skeleton */}
      <div className="glass-card overflow-hidden">
        <div className="px-6 py-4 border-b border-borderSubtle/50 flex items-center justify-between">
          <SkeletonPulse className="!rounded-lg h-[20px] w-[180px]" />
          <SkeletonPulse className="!rounded-lg h-[24px] w-[60px]" />
        </div>
        {[1, 2, 3, 4, 5].map((i) => (
          <SkeletonRow key={i} />
        ))}
      </div>
    </div>
  );
}
