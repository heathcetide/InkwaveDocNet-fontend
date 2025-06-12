import React from "react";
import { clsx } from "clsx";

export const Stepper = ({
                            steps = [], // [{ title, description }]
                            currentStep = 0,
                            onStepChange = () => {},
                            themeColor = "cyan",
                            showNavigation = true,
                            children,
                        }) => {
    return (
        <div className="w-full max-w-4xl mx-auto">
            {/* Step headers */}
            <div className="flex justify-between items-center mb-8">
                {steps.map((step, index) => {
                    const isActive = index === currentStep;
                    const isCompleted = index < currentStep;

                    return (
                        <div key={index} className="flex-1 flex flex-col items-center text-center relative">
                            <div
                                className={clsx(
                                    "w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold z-10",
                                    isCompleted
                                        ? `bg-${themeColor}-500 text-white`
                                        : isActive
                                            ? `bg-${themeColor}-100 text-${themeColor}-600`
                                            : "bg-neutral-200 text-neutral-600"
                                )}
                            >
                                {isCompleted ? "✓" : index + 1}
                            </div>
                            <div className="mt-2 text-sm font-medium text-neutral-800 dark:text-neutral-200">
                                {step.title}
                            </div>
                            <div className="text-xs text-neutral-500 dark:text-neutral-400">
                                {step.description}
                            </div>
                            {index < steps.length - 1 && (
                                <div
                                    className="absolute top-4 left-full h-0.5 w-full bg-neutral-300 dark:bg-neutral-700 z-0"
                                    style={{ transform: "translateX(-50%)" }}
                                />
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Step content */}
            <div className="mb-6">
                {children && children[currentStep]}
            </div>

            {/* Navigation buttons */}
            {showNavigation && (
                <div className="flex justify-between">
                    <button
                        disabled={currentStep === 0}
                        onClick={() => onStepChange(currentStep - 1)}
                        className="px-4 py-2 text-sm rounded bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-white disabled:opacity-50"
                    >
                        上一步
                    </button>
                    <button
                        disabled={currentStep >= steps.length - 1}
                        onClick={() => onStepChange(currentStep + 1)}
                        className={clsx(
                            "px-4 py-2 text-sm rounded text-white",
                            currentStep < steps.length - 1
                                ? `bg-${themeColor}-500 hover:bg-${themeColor}-600`
                                : "bg-neutral-300 cursor-not-allowed"
                        )}
                    >
                        下一步
                    </button>
                </div>
            )}
        </div>
    );
};
