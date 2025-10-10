export function getTimeAgo(value: unknown): string {
  try {
    // Handle different types of date values
    let dateValue: string | number | Date;
    
    if (value instanceof Date) {
      dateValue = value;
    } else if (typeof value === 'string' || typeof value === 'number') {
      dateValue = value;
    } else {
      return '';
    }
    
    const d = new Date(dateValue);
    if (isNaN(d.getTime())) return '';
    const now = new Date();
    const diffInMs = now.getTime() - d.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return 'Yesterday';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
    if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`;
    return `${Math.floor(diffInDays / 365)} years ago`;
  } catch {
    return '';
  }
}

export function formatDate(date: string | Date): string {
  try {
    const d = new Date(date);
    if (isNaN(d.getTime())) return '';
    return d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  } catch {
    return '';
  }
}

export function formatDateRange(startDate?: string, endDate?: string, isCurrent?: boolean): string {
  const start = startDate ? formatDate(startDate) : '';
  const end = isCurrent ? 'Present' : (endDate ? formatDate(endDate) : '');
  
  if (!start && !end) return '';
  if (!start) return end;
  if (!end) return start;
  
  return `${start} - ${end}`;
}
