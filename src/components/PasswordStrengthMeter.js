export const PasswordStrengthMeter = ({ password }) => {
    const strength = calculatePasswordStrength(password); // 复用之前的函数
    const colors = ['bg-red-500', 'bg-yellow-500', 'bg-blue-500', 'bg-green-500'];

    return (
        <div className="space-y-2">
            <div className="flex gap-1 h-1">
                {[...Array(4)].map((_, i) => (
                    <div
                        key={i}
                        className={`flex-1 rounded-full transition-all ${i < strength ? colors[strength-1] : 'bg-gray-200'}`}
                    />
                ))}
            </div>
            <div className="text-sm text-gray-500">
                密码强度：{['弱', '一般', '强', '非常强'][strength-1]}
            </div>
        </div>
    );
};

// 密码强度计算
const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.match(/[A-Z]/)) strength++;
    if (password.match(/[0-9]/)) strength++;
    if (password.match(/[^A-Za-z0-9]/)) strength++;
    return Math.min(strength, 4);
};