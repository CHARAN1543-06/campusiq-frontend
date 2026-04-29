import { Suspense } from 'react';
import ComparePage from './ComparePage';

export default function ComparePageWrapper() {
  return (
    <Suspense fallback={
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="h-8 bg-[#F5F3EE] rounded animate-pulse w-48 mb-4" />
        <div className="h-64 bg-[#F5F3EE] rounded-xl animate-pulse" />
      </div>
    }>
      <ComparePage />
    </Suspense>
  );
}
