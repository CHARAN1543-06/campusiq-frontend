'use client';
import Link from 'next/link';
import { College } from '@/lib/api';

interface Props {
  college: College;
  index?: number;
  compareMode?: boolean;
  isSelected?: boolean;
  onToggleCompare?: (id: number) => void;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      <span className="text-[#C8762A] text-sm">★</span>
      <span className="text-sm font-medium text-[#0F0F0F]">{rating.toFixed(1)}</span>
    </div>
  );
}

export default function CollegeCard({ college, index = 0, compareMode, isSelected, onToggleCompare }: Props) {
  const delayClass = `stagger-${Math.min(index + 1, 9)}`;

  return (
    <div className={`animate-fade-up ${delayClass}`}>
      <div
        className={`bg-white border rounded-xl overflow-hidden card-hover ${
          isSelected ? 'border-[#5C7A5C] ring-2 ring-[#5C7A5C]/20' : 'border-[#E2E0DB]'
        }`}
      >
        {/* Image */}
        <div className="relative h-40 bg-[#F5F3EE] overflow-hidden">
          <img
            src={college.image}
            alt={college.name}
            className="w-full h-full object-cover opacity-90"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          <div className="absolute top-3 left-3 flex gap-1.5">
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
              college.type === 'Government' ? 'bg-[#5C7A5C] text-white' :
              college.type === 'Deemed' ? 'bg-[#C8762A] text-white' :
              'bg-[#0F0F0F] text-white'
            }`}>
              {college.type}
            </span>
          </div>
          {college.nirfRank <= 10 && (
            <div className="absolute top-3 right-3 bg-[#C8762A] text-white text-xs font-bold px-2 py-0.5 rounded-full">
              NIRF #{college.nirfRank}
            </div>
          )}
          <div className="absolute bottom-3 left-3">
            <span className="text-2xl">{college.logo}</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="font-display font-semibold text-[#0F0F0F] text-base leading-tight line-clamp-2">
              {college.name}
            </h3>
          </div>
          <p className="text-[#6B6B6B] text-xs mb-3 flex items-center gap-1">
            <span>📍</span> {college.location}
          </p>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-2 py-3 border-y border-[#F5F3EE] mb-3">
            <div className="text-center">
              <StarRating rating={college.rating} />
              <p className="text-[10px] text-[#6B6B6B] mt-0.5">Rating</p>
            </div>
            <div className="text-center">
              <p className="text-sm font-semibold text-[#0F0F0F]">{college.feesDisplay}</p>
              <p className="text-[10px] text-[#6B6B6B] mt-0.5">Fees/yr</p>
            </div>
            <div className="text-center">
              <p className="text-sm font-semibold text-[#5C7A5C]">{college.placementPercent}%</p>
              <p className="text-[10px] text-[#6B6B6B] mt-0.5">Placed</p>
            </div>
          </div>

          {/* Courses */}
          <div className="flex flex-wrap gap-1 mb-3">
            {college.courses.slice(0, 3).map(c => (
              <span key={c} className="text-[10px] bg-[#F5F3EE] text-[#6B6B6B] px-2 py-0.5 rounded-full border border-[#E2E0DB]">
                {c}
              </span>
            ))}
            {college.courses.length > 3 && (
              <span className="text-[10px] text-[#6B6B6B] px-1">+{college.courses.length - 3}</span>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <Link
              href={`/college/${college.id}`}
              className="flex-1 text-center bg-[#0F0F0F] text-white text-xs font-medium py-2 rounded-lg hover:bg-[#3d5c3d] transition-colors"
            >
              View Details
            </Link>
            {compareMode && (
              <button
                onClick={() => onToggleCompare?.(college.id)}
                className={`px-3 py-2 rounded-lg text-xs font-medium border transition-all ${
                  isSelected
                    ? 'bg-[#5C7A5C] text-white border-[#5C7A5C]'
                    : 'bg-white text-[#6B6B6B] border-[#E2E0DB] hover:border-[#5C7A5C] hover:text-[#5C7A5C]'
                }`}
              >
                {isSelected ? '✓' : '+'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
