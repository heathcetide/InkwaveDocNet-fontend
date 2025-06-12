import React, { useState } from "react";
import {
    LineChart,
    BarChart,
    PieChart,
    Line,
    Bar,
    Pie,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import chroma from "chroma-js";

const VIBRANT_COLORS = chroma.scale(["#06b6d4", "#10b981", "#8b5cf6", "#f59e0b", "#ef4444"]).mode("lch").colors(12);

export const Chart = ({
                          type = "line", // line | bar | pie
                          data = [],
                          dataKey = "value",
                          nameKey = "name",
                          color = "auto", // auto | array | string
                          height = 300,
                          className = "",
                          strokeWidth = 3,
                          showGrid = true,
                          showTooltip = true,
                          showLegend = true,
                          animation = true,
                          filterKeys = [],
                      }) => {
    const [activeKeys, setActiveKeys] = useState(
        Array.isArray(filterKeys) ? filterKeys : []
    );
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleKey = (key) => {
        setActiveKeys((prev) =>
            prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
        );
    };

    const getColor = (i) => {
        if (Array.isArray(color)) return color[i % color.length];
        if (color === "auto") return VIBRANT_COLORS[i % VIBRANT_COLORS.length];
        return color;
    };

    const allKeys = Array.from(
        new Set(data.flatMap((item) => Object.keys(item).filter((k) => k !== nameKey)))
    );

    const renderLine = (keys) =>
        keys.map((key, i) => (
            <Line
                key={key}
                type="monotone"
                dataKey={key}
                stroke={getColor(i)}
                strokeWidth={strokeWidth}
                dot={{ r: 4, stroke: "white", strokeWidth: 1.5 }}
                activeDot={{ r: 6 }}
                isAnimationActive={animation}
                hide={activeKeys.includes(key)}
            />
        ));

    const renderBar = (keys) =>
        keys.map((key, i) => (
            <Bar
                key={key}
                dataKey={key}
                fill={getColor(i)}
                radius={[6, 6, 0, 0]}
                isAnimationActive={animation}
                hide={activeKeys.includes(key)}
            />
        ));

    return (
        <div className={className} style={{ height }}>
            <ResponsiveContainer width="100%" height="100%">
                {type === "line" && (
                    <LineChart data={data} margin={{ top: 10, right: 20, bottom: 10, left: 0 }}>
                        {showGrid && <CartesianGrid strokeDasharray="4 4" stroke="#e5e7eb" />}
                        <XAxis dataKey={nameKey} stroke="#9ca3af" tick={{ fontSize: 12 }} />
                        <YAxis stroke="#9ca3af" tick={{ fontSize: 12 }} />
                        {showTooltip && <Tooltip cursor={{ fill: "rgba(0,0,0,0.05)" }} />}
                        {showLegend && (
                            <Legend
                                onClick={(e) => toggleKey(e.dataKey)}
                                wrapperStyle={{ cursor: "pointer" }}
                            />
                        )}
                        {renderLine(allKeys)}
                    </LineChart>
                )}

                {type === "bar" && (
                    <BarChart data={data} margin={{ top: 10, right: 20, bottom: 10, left: 0 }}>
                        {showGrid && <CartesianGrid strokeDasharray="4 4" stroke="#e5e7eb" />}
                        <XAxis dataKey={nameKey} stroke="#9ca3af" tick={{ fontSize: 12 }} />
                        <YAxis stroke="#9ca3af" tick={{ fontSize: 12 }} />
                        {showTooltip && <Tooltip cursor={{ fill: "rgba(0,0,0,0.05)" }} />}
                        {showLegend && (
                            <Legend
                                onClick={(e) => toggleKey(e.dataKey)}
                                wrapperStyle={{ cursor: "pointer" }}
                            />
                        )}
                        {renderBar(allKeys)}
                    </BarChart>
                )}

                {type === "pie" && (
                    <PieChart>
                        {showTooltip && <Tooltip />}
                        <Pie
                            data={data}
                            dataKey={dataKey}
                            nameKey={nameKey}
                            cx="50%"
                            cy="50%"
                            outerRadius={90}
                            innerRadius={40}
                            onMouseEnter={(_, i) => setActiveIndex(i)}
                            onMouseLeave={() => setActiveIndex(null)}
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            isAnimationActive={animation}
                        >
                            {data.map((_, i) => (
                                <Cell
                                    key={`cell-${i}`}
                                    fill={getColor(i)}
                                    stroke={activeIndex === i ? "#000" : getColor(i)}
                                    strokeWidth={activeIndex === i ? 3 : 1}
                                />
                            ))}
                        </Pie>
                    </PieChart>
                )}
            </ResponsiveContainer>
        </div>
    );
};
