
import React from 'react';
import { useLocation } from 'react-router-dom';

const AdminPlaceholder = () => {
  const location = useLocation();
  const pageName = location.pathname.split('/').pop() || 'Page';

  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center">
      <h1 className="text-3xl font-bold capitalize mb-4">{pageName}</h1>
      <p className="text-muted-foreground max-w-md">
        This section is under development. Full implementation coming soon.
      </p>
    </div>
  );
};

export default AdminPlaceholder;
