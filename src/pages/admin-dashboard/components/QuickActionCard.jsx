import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const QuickActionCard = ({ title, description, icon, path, color = 'blue' }) => {
  const colorClasses = {
    blue: 'bg-blue-50 hover:bg-blue-100 text-blue-600 border-blue-200',
    green: 'bg-green-50 hover:bg-green-100 text-green-600 border-green-200',
    amber: 'bg-amber-50 hover:bg-amber-100 text-amber-600 border-amber-200',
    purple: 'bg-purple-50 hover:bg-purple-100 text-purple-600 border-purple-200'
  };

  return (
    <Link 
      to={path}
      className={`block p-6 rounded-lg border transition-smooth ${colorClasses?.[color]}`}
    >
      <div className="flex items-start space-x-4">
        <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center shadow-soft">
          <Icon name={icon} size={20} />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-foreground mb-1">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <Icon name="ArrowRight" size={16} className="text-muted-foreground" />
      </div>
    </Link>
  );
};

export default QuickActionCard;