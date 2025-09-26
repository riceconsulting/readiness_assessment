import React, { useState } from 'react';

interface CategoryScoreData {
  score: number;
  maxScore: number;
}

interface RadarChartProps {
  scores: Record<string, CategoryScoreData>;
  onWhyClick: (category: string) => void;
  isMounted: boolean;
}

const categoryOrder = [
    'Strategi & Visi',
    'Kesiapan Data',
    'SDM & Budaya',
    'Teknologi & Infrastruktur',
    'Proses Bisnis',
    'Tata Kelola & Etika',
    'Investasi & ROI',
];

const RadarLabel: React.FC<{ x: number; y: number; textAnchor: React.CSSProperties['textAnchor']; label: string }> = ({ x, y, textAnchor, label }) => {
    const parts = label.split(' ');
    // If only one word, or a short label, don't split.
    if (parts.length <= 2 && label.length < 12) {
        return (
            <text x={x} y={y} dy="0.3em" textAnchor={textAnchor} className="text-[8px] fill-slate-600 dark:fill-slate-400 font-medium">
                {label}
            </text>
        );
    }
    // Split into two lines
    const midIndex = Math.ceil(parts.length / 2);
    const line1 = parts.slice(0, midIndex).join(' ');
    const line2 = parts.slice(midIndex).join(' ');
    return (
        <text x={x} y={y} textAnchor={textAnchor} className="text-[8px] fill-slate-600 dark:fill-slate-400 font-medium">
            <tspan x={x} dy="-0.3em">{line1}</tspan>
            <tspan x={x} dy="1.2em">{line2}</tspan>
        </text>
    );
};


const RadarChart: React.FC<RadarChartProps> = ({ scores, onWhyClick, isMounted }) => {
  const [tooltip, setTooltip] = useState<{
    visible: boolean;
    category: string;
    score: number;
    maxScore: number;
    x: number;
    y: number;
  } | null>(null);

  const size = 320;
  const center = size / 2;
  const numLevels = 4;
  const radius = center * 0.58;
  const numAxes = categoryOrder.length;
  const angleSlice = (Math.PI * 2) / numAxes;

  const getCoordinates = (index: number, value: number) => {
    const angle = angleSlice * index - Math.PI / 2;
    const x = center + radius * value * Math.cos(angle);
    const y = center + radius * value * Math.sin(angle);
    return `${x},${y}`;
  };

  const scorePoints = categoryOrder
    .map((category, i) => {
      const data = scores[category];
      if (!data) return getCoordinates(i, 0);
      const value = data.score / data.maxScore;
      return getCoordinates(i, value);
    })
    .join(' ');
    
  return (
    <div className="flex flex-col items-center justify-center p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg shadow-inner">
       <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-4">Profil Kesiapan Anda</h3>
      <svg width="100%" height="auto" viewBox={`0 0 ${size} ${size}`}>
        <g>
          {/* Level polygons */}
          {[...Array(numLevels)].map((_, levelIndex) => (
            <polygon
              key={levelIndex}
              points={[...Array(numAxes)]
                .map((_, i) => getCoordinates(i, (numLevels - levelIndex) / numLevels))
                .join(' ')}
              className="fill-slate-200/50 dark:fill-slate-700/50 stroke-slate-300 dark:stroke-slate-600"
              strokeWidth="1"
            />
          ))}

          {/* Axes lines */}
          {[...Array(numAxes)].map((_, i) => (
            <line
              key={i}
              x1={center}
              y1={center}
              x2={parseFloat(getCoordinates(i, 1).split(',')[0])}
              y2={parseFloat(getCoordinates(i, 1).split(',')[1])}
              className="stroke-slate-300 dark:stroke-slate-600"
              strokeWidth="1"
            />
          ))}
          
          {/* Data polygon */}
          <polygon
            points={scorePoints}
            className="fill-[#5890AD]/40 stroke-[#5890AD] dark:fill-[#9BBBCC]/40 dark:stroke-[#9BBBCC] transition-transform duration-1000 ease-in-out"
            strokeWidth="2"
            style={{
                transformOrigin: `${center}px ${center}px`,
                transform: isMounted ? 'scale(1)' : 'scale(0)',
                transitionDelay: '300ms',
            }}
          />
          
          {/* Labels and interactive points */}
          {categoryOrder.map((category, i) => {
            const data = scores[category];
            const value = data ? data.score / data.maxScore : 0;
            const labelValue = 1.28;
            const labelCoords = getCoordinates(i, labelValue).split(',');
            const pointCoords = getCoordinates(i, value).split(',');
            
            let textAnchor: React.CSSProperties['textAnchor'] = 'middle';
            const angleDegrees = (i * 360 / numAxes);
            
            if (angleDegrees > 10 && angleDegrees < 170) {
                textAnchor = 'start';
            } else if (angleDegrees > 190 && angleDegrees < 350) {
                textAnchor = 'end';
            }
            
            return (
              <g 
                key={category}
                className="transition-opacity duration-500 ease-out cursor-pointer"
                onClick={() => onWhyClick(category)}
                onMouseEnter={() => {
                  if (data) {
                    setTooltip({
                      visible: true,
                      category,
                      score: data.score,
                      maxScore: data.maxScore,
                      x: parseFloat(pointCoords[0]),
                      y: parseFloat(pointCoords[1]),
                    });
                  }
                }}
                onMouseLeave={() => setTooltip(null)}
                style={{
                    opacity: isMounted ? 1 : 0,
                    transitionDelay: `${600 + i * 75}ms`
                }}
              >
                <RadarLabel
                    x={parseFloat(labelCoords[0])}
                    y={parseFloat(labelCoords[1])}
                    textAnchor={textAnchor}
                    label={category}
                />
                {/* Invisible larger tap target for mobile */}
                <circle
                  cx={pointCoords[0]}
                  cy={pointCoords[1]}
                  r="12"
                  fill="transparent"
                />
                <circle
                  cx={pointCoords[0]}
                  cy={pointCoords[1]}
                  r="5"
                  className="fill-[#5890AD] dark:fill-[#9BBBCC] stroke-white dark:stroke-slate-800 transition-all duration-300 group-hover:scale-125 focus:scale-125 focus:outline-none"
                  strokeWidth="2"
                  aria-label={`Lihat detail untuk kategori ${category}`}
                />
              </g>
            );
          })}

          {/* Tooltip */}
          {tooltip && tooltip.visible && (
            <g transform={`translate(${tooltip.x}, ${tooltip.y})`} className="pointer-events-none transition-opacity duration-200" style={{ opacity: isMounted ? 1 : 0 }}>
                {/* Tooltip Background */}
                <rect x="-25" y="-30" width="50" height="20" rx="4" className="fill-slate-800/80 dark:fill-black/80" />
                {/* Tooltip Text */}
                <text x="0" y="-16" textAnchor="middle" className="fill-white font-semibold text-[9px]">
                {`${tooltip.score} / ${tooltip.maxScore}`}
                </text>
                {/* Tooltip Arrow */}
                <polygon points="-5,-10 5,-10 0, -5" className="fill-slate-800/80 dark:fill-black/80" />
            </g>
          )}

        </g>
      </svg>
      <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 text-center">Arahkan atau klik pada titik untuk melihat detail.</p>
    </div>
  );
};

export default RadarChart;