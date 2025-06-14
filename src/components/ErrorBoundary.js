import React from "react";

export class ErrorBoundary extends React.Component {
    state = { hasError: false };
    
    static getDerivedStateFromError() {
        return { hasError: true };
    }
    
    render() {
        if (this.state.hasError) {
            return (
                <div className="p-4 text-red-500 border border-red-200 rounded-lg">
                    组件加载出现异常，请刷新页面重试
                </div>
            );
        }
        return this.props.children;
    }
}

// 使用方式
<ErrorBoundary>
    <NestedOutlineEditor ... />
</ErrorBoundary> 