import React, { useState, useMemo } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadialBarChart,
  RadialBar
} from 'recharts';
import {
  Coins,
  TrendingUp,
  PieChart as PieChartIcon,
  BarChart3,
  Hotel,
  Car,
  Utensils,
  Ticket,
  ShoppingBag,
  ShieldAlert,
  Sliders,
  Sparkles,
  Info,
  DollarSign,
  ArrowRight
} from 'lucide-react';

interface CategoryCost {
  name: string;
  key: string;
  value: number;
  percentage: number;
  color: string;
  icon: any;
  perDay: number;
  perPerson: number;
  savingTip: string;
}

interface BudgetAnalyticsProps {
  totalBudget: number;
  daysCount: number;
  peopleCount: number;
  destinations: string[];
  accommodationType?: string;
  transportType?: string;
  onBudgetChange?: (newBudget: number) => void;
}

const CATEGORY_COLORS = {
  hotels: '#6366f1', // Indigo
  transport: '#10b981', // Emerald
  food: '#f59e0b', // Amber
  tickets: '#ec4899', // Pink
  shopping: '#8b5cf6', // Purple
  buffer: '#64748b' // Slate
};

export default function BudgetAnalytics({
  totalBudget,
  daysCount,
  peopleCount,
  destinations,
  accommodationType = 'Heritage Hotel',
  transportType = 'Car Rental',
  onBudgetChange
}: BudgetAnalyticsProps) {
  const [activeTab, setActiveTab] = useState<'donut' | 'bars' | 'tiers'>('donut');
  const [customBudget, setCustomBudget] = useState<number>(totalBudget || 35000);
  const [activeCategoryIndex, setActiveCategoryIndex] = useState<number | null>(null);

  const days = Math.max(1, daysCount || 5);
  const people = Math.max(1, peopleCount || 2);

  // Sync prop changes
  React.useEffect(() => {
    if (totalBudget && totalBudget !== customBudget) {
      setCustomBudget(totalBudget);
    }
  }, [totalBudget]);

  // Compute breakdown data
  const categoryBreakdown = useMemo(() => {
    // Standard percentage multipliers for Rajasthan travel
    const hotelRatio = accommodationType.includes('Palace') || accommodationType.includes('5-Star') ? 0.45 : 0.38;
    const transportRatio = transportType.includes('Flight') ? 0.25 : 0.22;
    const foodRatio = 0.20;
    const ticketsRatio = 0.08;
    const shoppingRatio = 0.07;
    const bufferRatio = 1 - (hotelRatio + transportRatio + foodRatio + ticketsRatio + shoppingRatio);

    const hotelVal = Math.round(customBudget * hotelRatio);
    const transportVal = Math.round(customBudget * transportRatio);
    const foodVal = Math.round(customBudget * foodRatio);
    const ticketsVal = Math.round(customBudget * ticketsRatio);
    const shoppingVal = Math.round(customBudget * shoppingRatio);
    const bufferVal = Math.round(customBudget * bufferRatio);

    const categories: CategoryCost[] = [
      {
        name: 'Accommodations & Heritage Stays',
        key: 'hotels',
        value: hotelVal,
        percentage: Math.round(hotelRatio * 100),
        color: CATEGORY_COLORS.hotels,
        icon: Hotel,
        perDay: Math.round(hotelVal / days),
        perPerson: Math.round(hotelVal / people),
        savingTip: 'Book heritage homestays or Haveli boutique hotels directly 3 weeks early for 15% off.'
      },
      {
        name: 'Inter-City Transport & Cabs',
        key: 'transport',
        value: transportVal,
        percentage: Math.round(transportRatio * 100),
        color: CATEGORY_COLORS.transport,
        icon: Car,
        perDay: Math.round(transportVal / days),
        perPerson: Math.round(transportVal / people),
        savingTip: 'Use Vande Bharat Express train for long routes (Jaipur-Udaipur) to save ₹2,500 vs taxi.'
      },
      {
        name: 'Dining & Royal Rajasthan Cuisine',
        key: 'food',
        value: foodVal,
        percentage: Math.round(foodRatio * 100),
        color: CATEGORY_COLORS.food,
        icon: Utensils,
        perDay: Math.round(foodVal / days),
        perPerson: Math.round(foodVal / people),
        savingTip: 'Enjoy iconic traditional Thali meals at local iconic dhabas like Laxmi Mishthan Bhandar.'
      },
      {
        name: 'Fort Entrance Tickets & Safaris',
        key: 'tickets',
        value: ticketsVal,
        percentage: Math.round(ticketsRatio * 100),
        color: CATEGORY_COLORS.tickets,
        icon: Ticket,
        perDay: Math.round(ticketsVal / days),
        perPerson: Math.round(ticketsVal / people),
        savingTip: 'Purchase the Rajasthan Tourism Composite Monument Pass (valid 2 days across 8 monuments).'
      },
      {
        name: 'Handicrafts & Souvenir Shopping',
        key: 'shopping',
        value: shoppingVal,
        percentage: Math.round(shoppingRatio * 100),
        color: CATEGORY_COLORS.shopping,
        icon: ShoppingBag,
        perDay: Math.round(shoppingVal / days),
        perPerson: Math.round(shoppingVal / people),
        savingTip: 'Shop at Govt Emporiums (Rajasthali) for fixed-rate authentic Blue Pottery & Block Prints.'
      },
      {
        name: 'Emergency & Miscellaneous Buffer',
        key: 'buffer',
        value: bufferVal,
        percentage: Math.round(bufferRatio * 100),
        color: CATEGORY_COLORS.buffer,
        icon: ShieldAlert,
        perDay: Math.round(bufferVal / days),
        perPerson: Math.round(bufferVal / people),
        savingTip: 'Keep cash handy for local auto-rickshaws and temple flower offerings.'
      }
    ];

    return categories;
  }, [customBudget, days, people, accommodationType, transportType]);

  // Comparison across Tour Tiers
  const tierComparisonData = useMemo(() => {
    return [
      {
        tier: 'Backpacker',
        Hotels: Math.round(15000 * 0.35),
        Transport: Math.round(15000 * 0.25),
        Food: Math.round(15000 * 0.25),
        Tickets: Math.round(15000 * 0.10),
        Shopping: Math.round(15000 * 0.05),
        Total: 15000
      },
      {
        tier: 'Current Plan',
        Hotels: categoryBreakdown[0].value,
        Transport: categoryBreakdown[1].value,
        Food: categoryBreakdown[2].value,
        Tickets: categoryBreakdown[3].value,
        Shopping: categoryBreakdown[4].value,
        Total: customBudget
      },
      {
        tier: 'Royal Luxury',
        Hotels: Math.round(85000 * 0.48),
        Transport: Math.round(85000 * 0.22),
        Food: Math.round(85000 * 0.18),
        Tickets: Math.round(85000 * 0.07),
        Shopping: Math.round(85000 * 0.05),
        Total: 85000
      }
    ];
  }, [categoryBreakdown, customBudget]);

  // Daily projected spending chart data
  const dailyProjectionData = useMemo(() => {
    const dailyCost = Math.round(customBudget / days);
    return Array.from({ length: days }, (_, i) => ({
      day: `Day ${i + 1}`,
      EstCost: dailyCost,
      Hotel: Math.round(categoryBreakdown[0].value / days),
      Transport: Math.round(categoryBreakdown[1].value / days),
      Food: Math.round(categoryBreakdown[2].value / days),
      Activities: Math.round((categoryBreakdown[3].value + categoryBreakdown[4].value) / days)
    }));
  }, [customBudget, days, categoryBreakdown]);

  const handleSliderChange = (val: number) => {
    setCustomBudget(val);
    if (onBudgetChange) onBudgetChange(val);
  };

  const costPerPersonPerDay = Math.round(customBudget / (days * people));

  return (
    <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-4 sm:p-6 lg:p-8 space-y-8 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 border-b border-slate-200 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-indigo-50 border border-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
            <PieChartIcon className="w-3.5 h-3.5 text-indigo-600" /> Interactive Cost Visualization
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Itinerary Budget Analytics & Distribution
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
            Visualized breakdown of your projected spending for {destinations.join(', ')} over {days} days for {people} traveler{people > 1 ? 's' : ''}.
          </p>
        </div>

        {/* Quick Summary Pill */}
        <div className="bg-gradient-to-r from-indigo-900 to-slate-900 text-white rounded-xl p-4 shadow-md flex items-center gap-4 shrink-0 w-full lg:w-auto justify-between">
          <div>
            <span className="text-[10px] text-indigo-300 font-bold uppercase tracking-wider block">Total Estimated Trip Cost</span>
            <span className="text-2xl font-extrabold text-amber-400 font-mono">₹{customBudget.toLocaleString('en-IN')}</span>
          </div>
          <div className="border-l border-indigo-700/60 pl-4 text-right">
            <span className="text-[10px] text-slate-300 block font-medium">Daily Cost / Person</span>
            <span className="text-sm font-bold text-white font-mono">₹{costPerPersonPerDay.toLocaleString('en-IN')}/day</span>
          </div>
        </div>
      </div>

      {/* Interactive Budget Adjuster Slider */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
            <Sliders className="w-4 h-4 text-indigo-600" /> Adjust Target Budget Slider
          </label>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500">Quick set:</span>
            {[15000, 35000, 60000, 100000].map(amt => (
              <button
                key={amt}
                onClick={() => handleSliderChange(amt)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                  customBudget === amt
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                ₹{(amt / 1000).toFixed(0)}k
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <input
            type="range"
            min={10000}
            max={150000}
            step={2500}
            value={customBudget}
            onChange={(e) => handleSliderChange(Number(e.target.value))}
            className="w-full accent-indigo-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
          />
          <span className="text-sm font-mono font-extrabold text-indigo-700 w-24 text-right">
            ₹{customBudget.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Analytics Visualization Tabs */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-3">
        <div className="flex items-center gap-2">
          {[
            { id: 'donut', label: 'Expense Distribution', icon: PieChartIcon },
            { id: 'bars', label: 'Daily Cost Trend', icon: BarChart3 },
            { id: 'tiers', label: 'Tour Tier Comparison', icon: TrendingUp }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* CHART VIEW 1: DONUT / PIE CHART & BREAKDOWN */}
      {activeTab === 'donut' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Recharts Pie Chart Container */}
          <div className="lg:col-span-6 bg-slate-50 border border-slate-200 rounded-2xl p-6 flex flex-col items-center justify-center relative min-h-[340px]">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5 self-start">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" /> Share of Total Spending
            </h4>

            <div className="w-full h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryBreakdown}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={105}
                    paddingAngle={4}
                    dataKey="value"
                    onMouseEnter={(_, index) => setActiveCategoryIndex(index)}
                    onMouseLeave={() => setActiveCategoryIndex(null)}
                  >
                    {categoryBreakdown.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.color}
                        stroke={activeCategoryIndex === index ? '#1e1b4b' : '#fff'}
                        strokeWidth={activeCategoryIndex === index ? 3 : 1.5}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(val: number) => [`₹${val.toLocaleString('en-IN')}`, 'Est Cost']}
                    contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', color: '#fff', fontSize: '12px', border: 'none' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Center Overlay info */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mt-4">
              <span className="text-[10px] uppercase font-bold text-slate-400">Total Budget</span>
              <span className="text-xl font-extrabold text-slate-900 font-mono">₹{customBudget.toLocaleString()}</span>
              <span className="text-[10px] font-semibold text-indigo-600">{days} Days / {people} Pax</span>
            </div>
          </div>

          {/* Category Cards Grid */}
          <div className="lg:col-span-6 space-y-3">
            {categoryBreakdown.map((cat, idx) => {
              const Icon = cat.icon;
              const isHovered = activeCategoryIndex === idx;

              return (
                <div
                  key={cat.key}
                  onMouseEnter={() => setActiveCategoryIndex(idx)}
                  onMouseLeave={() => setActiveCategoryIndex(null)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                    isHovered
                      ? 'border-indigo-500 bg-indigo-50/50 shadow-md translate-x-1'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="p-2.5 rounded-xl text-white shadow-xs"
                      style={{ backgroundColor: cat.color }}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">{cat.name}</h4>
                      <p className="text-[10px] text-slate-500">
                        ₹{cat.perDay}/day • ₹{cat.perPerson}/person
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-xs font-extrabold text-slate-900 font-mono block">
                      ₹{cat.value.toLocaleString()}
                    </span>
                    <span
                      className="text-[10px] font-bold px-2 py-0.5 rounded-full inline-block mt-0.5"
                      style={{ backgroundColor: `${cat.color}20`, color: cat.color }}
                    >
                      {cat.percentage}% of Total
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      )}

      {/* CHART VIEW 2: DAILY COST TREND BARS */}
      {activeTab === 'bars' && (
        <div className="space-y-4">
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 min-h-[350px]">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-4 flex items-center gap-1.5">
              <BarChart3 className="w-4 h-4 text-indigo-600" /> Daily Cost Allocation Trend ({days} Days)
            </h4>

            <div className="w-full h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dailyProjectionData} margin={{ top: 20, right: 30, left: 10, bottom: 5 }}>
                  <XAxis dataKey="day" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `₹${v}`} />
                  <Tooltip
                    formatter={(value: number) => [`₹${value.toLocaleString('en-IN')}`, '']}
                    contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                  />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                  <Bar dataKey="Hotel" stackId="a" fill={CATEGORY_COLORS.hotels} name="Hotel Stays" />
                  <Bar dataKey="Transport" stackId="a" fill={CATEGORY_COLORS.transport} name="Transport" />
                  <Bar dataKey="Food" stackId="a" fill={CATEGORY_COLORS.food} name="Dining & Food" />
                  <Bar dataKey="Activities" stackId="a" fill={CATEGORY_COLORS.tickets} name="Monuments & Tours" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* CHART VIEW 3: TOUR TIER COMPARISON */}
      {activeTab === 'tiers' && (
        <div className="space-y-4">
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 min-h-[350px]">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-4 flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-indigo-600" /> Budget Tier Comparison (Backpacker vs Current vs Royal Luxury)
            </h4>

            <div className="w-full h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={tierComparisonData} margin={{ top: 20, right: 30, left: 10, bottom: 5 }}>
                  <XAxis dataKey="tier" tick={{ fontSize: 12, fontWeight: 'bold' }} />
                  <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `₹${v / 1000}k`} />
                  <Tooltip
                    formatter={(value: number) => [`₹${value.toLocaleString('en-IN')}`, '']}
                    contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                  />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                  <Bar dataKey="Hotels" fill={CATEGORY_COLORS.hotels} name="Hotels" />
                  <Bar dataKey="Transport" fill={CATEGORY_COLORS.transport} name="Transport" />
                  <Bar dataKey="Food" fill={CATEGORY_COLORS.food} name="Food & Dining" />
                  <Bar dataKey="Tickets" fill={CATEGORY_COLORS.tickets} name="Monuments" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* Money Saving Recommendations Grid */}
      <div className="border-t border-slate-200 pt-6 space-y-4">
        <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-amber-500" /> Smart Money-Saving Advice for Your Itinerary
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categoryBreakdown.slice(0, 3).map((cat) => (
            <div key={cat.key} className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
              <div className="flex items-center gap-2">
                <cat.icon className="w-4 h-4 text-indigo-600" />
                <h4 className="text-xs font-bold text-slate-800">{cat.name}</h4>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">{cat.savingTip}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
