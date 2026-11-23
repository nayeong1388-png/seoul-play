import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://qiixziflwfzcwbkgwnng.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_joW6tBX00XtPdIXDDQGlLQ_Xx_g_GJn';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * 1. 찜한 행사 (user_bookmarks) 연동 함수
 */
export async function getBookmarks(userId: string = 'demo-user') {
  const { data, error } = await supabase
    .from('user_bookmarks')
    .select('*')
    .eq('user_id', userId);
  if (error) {
    console.error('Error fetching bookmarks:', error);
    return [];
  }
  return data;
}

export async function addBookmark(eventId: string, userId: string = 'demo-user') {
  const { data, error } = await supabase
    .from('user_bookmarks')
    .insert([{ user_id: userId, event_id: eventId }]);
  return { data, error };
}

export async function removeBookmark(eventId: string, userId: string = 'demo-user') {
  const { data, error } = await supabase
    .from('user_bookmarks')
    .delete()
    .eq('user_id', userId)
    .eq('event_id', eventId);
  return { data, error };
}

/**
 * 2. 나들이 동선 및 알림 (user_schedules) 연동 함수
 */
export async function getSchedules(userId: string = 'demo-user') {
  const { data, error } = await supabase
    .from('user_schedules')
    .select('*')
    .eq('user_id', userId)
    .order('order_index', { ascending: true });
  return data || [];
}

export async function addSchedule(
  eventId: string,
  eventTitle: string,
  place: string,
  userId: string = 'demo-user',
  phone: string = ''
) {
  const { data, error } = await supabase
    .from('user_schedules')
    .insert([{
      user_id: userId,
      event_id: eventId,
      event_title: eventTitle,
      place: place,
      phone: phone,
      is_alert_enabled: Boolean(phone)
    }]);
  return { data, error };
}

/**
 * 3. 지난 나들이 활동 내역 및 후기 (tour_reviews) 연동 함수
 */
export async function getReviews(userId: string = 'demo-user') {
  const { data, error } = await supabase
    .from('tour_reviews')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  return data || [];
}
