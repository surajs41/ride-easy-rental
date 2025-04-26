
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const DashboardCard = ({ title, value, description }: { title: string; value: string; description?: string }) => (
  <Card>
    <CardHeader className="pb-2">
      <CardTitle className="text-xl">{title}</CardTitle>
      {description && <CardDescription>{description}</CardDescription>}
    </CardHeader>
    <CardContent>
      <div className="text-3xl font-bold">{value}</div>
    </CardContent>
  </Card>
);

const AdminDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard title="Total Rentals" value="152" description="All-time bike rentals" />
        <DashboardCard title="Active Rentals" value="24" description="Currently rented bikes" />
        <DashboardCard title="Total Revenue" value="₹28,500" description="All-time earnings" />
        <DashboardCard title="Available Bikes" value="48" description="Ready for rent" />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Bookings</CardTitle>
            <CardDescription>Latest rental activity</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Implement chart with rental data</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Popular Bikes</CardTitle>
            <CardDescription>Most rented models</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Implement chart with popular bikes</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
