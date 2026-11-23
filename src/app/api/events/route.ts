import { NextRequest, NextResponse } from 'next/server';
import { fetchSeoulCulturalEvents } from '@/lib/seoulApi';
import { SAMPLE_EVENTS } from '@/data/mockEvents';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const district = searchParams.get('district');
  const category = searchParams.get('category');
  const freeOnly = searchParams.get('free') === 'true';
  const weekendOnly = searchParams.get('weekend') === 'true';
  const audience = searchParams.get('audience'); // couple, family, all
  const query = searchParams.get('q')?.toLowerCase();

  // 데이터 로드 (실 API 연결 시도 후 fallback)
  let events = await fetchSeoulCulturalEvents(1, 30);
  if (!events || events.length === 0) {
    events = SAMPLE_EVENTS;
  }

  // 필터링 적용
  let filtered = events.filter((e) => {
    if (district && district !== 'all' && e.district !== district) return false;
    if (category && category !== 'all' && e.category !== category) return false;
    if (freeOnly && !e.isFree) return false;
    if (weekendOnly && !e.isWeekend) return false;
    if (audience && audience !== 'all' && e.targetAudience !== 'all' && e.targetAudience !== audience) {
      return false;
    }
    if (query) {
      const matchTitle = e.title.toLowerCase().includes(query);
      const matchPlace = e.place.toLowerCase().includes(query);
      const matchTags = e.tags.some(t => t.toLowerCase().includes(query));
      if (!matchTitle && !matchPlace && !matchTags) return false;
    }
    return true;
  });

  return NextResponse.json({
    success: true,
    count: filtered.length,
    data: filtered,
  });
}
