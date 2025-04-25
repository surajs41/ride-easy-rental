
import React from 'react';
import { Button } from '@/components/ui/button';
import { BikeType } from '@/data/bikes';

interface BikeTypeFilterProps {
  currentType: BikeType | 'all';
  onTypeChange: (type: BikeType | 'all') => void;
}

const BikeTypeFilter = ({ currentType, onTypeChange }: BikeTypeFilterProps) => {
  const types: Array<{ value: BikeType | 'all'; label: string }> = [
    { value: 'all', label: 'All Bikes' },
    { value: 'city', label: 'City' },
    { value: 'mountain', label: 'Mountain' },
    { value: 'road', label: 'Road' },
    { value: 'electric', label: 'Electric' },
    { value: 'hybrid', label: 'Hybrid' },
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {types.map((type) => (
        <Button
          key={type.value}
          variant={currentType === type.value ? "default" : "outline"}
          className={
            currentType === type.value
              ? "bg-brand-teal hover:bg-brand-teal/90"
              : "hover:bg-brand-teal/10 hover:text-brand-teal hover:border-brand-teal"
          }
          onClick={() => onTypeChange(type.value)}
        >
          {type.label}
        </Button>
      ))}
    </div>
  );
};

export default BikeTypeFilter;
