import React from 'react';

const PasswordStrengthIndicator = ({ password }) => {
  const getStrength = (password) => {
    let score = 0;
    if (!password) return score;

    // Award points for different character types
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    return score;
  };

  const strength = getStrength(password);
  const strengthLabels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
  const barColor = [
    'bg-red-500',
    'bg-orange-500',
    'bg-yellow-500',
    'bg-blue-500',
    'bg-green-500',
  ];

  return (
    <div className="w-full mt-2">
      <div className="grid grid-cols-5 gap-x-2">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className={`h-1 rounded-full ${index < strength ? barColor[strength - 1] : 'bg-gray-200'}`}
          ></div>
        ))}
      </div>
      <p className={`text-xs mt-1 ${strength > 0 ? 'text-gray-600' : 'text-gray-400'}`}>
        {strength > 0 ? strengthLabels[strength - 1] : 'A strong password is required'}
      </p>
    </div>
  );
};

export default PasswordStrengthIndicator;
