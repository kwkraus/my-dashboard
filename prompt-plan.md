# User Conversion Dashboard Card Specification

## Purpose
Track and display the conversion rate from visitors to registered users

## Key Metrics
- **Primary**: Conversion rate percentage for the last 30 days
- **Secondary**: Trend indicator comparing to the previous 30-day period

## Visual Design
- **Layout**: Large prominent percentage with smaller trend indicator below
- **Icon**: Users icon (from Lucide React)
- **Title**: "User Conversion"
- **Style**: Follows existing dashboard card patterns using shadcn/ui components

## Data Structure
- Mock/placeholder data with realistic sample values
- Current period conversion rate (e.g., "2.5%")
- Trend comparison (e.g., "+0.3%" with up/down indicator)

## Technical Implementation
- Component added to `DashboardCards.tsx`
- Uses existing `DashboardStatCard` pattern for consistency
- Theme-aware styling following project conventions
- Mobile responsive design

## Implementation Details

### Time Periods
- **Current Period**: Last 30 days
- **Comparison Period**: Previous 30 days (for trend calculation)

### Display Format
- Main conversion rate displayed as percentage with 1 decimal place
- Trend indicator shows percentage point change with appropriate arrow icon
- Green color for positive trends, red for negative trends

### Data Requirements
- Total visitors count for last 30 days
- Total registered users count for last 30 days
- Total visitors count for previous 30 days
- Total registered users count for previous 30 days

### Mock Data Example
```typescript
{
  currentPeriod: {
    visitors: 10000,
    registrations: 250,
    conversionRate: 2.5
  },
  previousPeriod: {
    visitors: 9500,
    registrations: 209,
    conversionRate: 2.2
  },
  trend: {
    change: 0.3,
    direction: "up"
  }
}
```
