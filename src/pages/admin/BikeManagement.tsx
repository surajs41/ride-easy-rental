
import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const DUMMY_BIKES = [
  { id: 1, name: 'Honda CBR', type: 'Sports', price: '500', status: 'available', units: 5 },
  { id: 2, name: 'Royal Enfield Classic', type: 'Cruiser', price: '400', status: 'available', units: 3 },
  { id: 3, name: 'TVS Jupiter', type: 'Scooter', price: '250', status: 'maintenance', units: 2 },
  { id: 4, name: 'Yamaha R15', type: 'Sports', price: '450', status: 'available', units: 4 },
  { id: 5, name: 'Hero Electric', type: 'Electric', price: '300', status: 'available', units: 6 },
];

const BikeManagement = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Bike Management</h1>
        <Button>Add New Bike</Button>
      </div>
      
      <div className="flex justify-between items-center">
        <div className="relative w-96">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search bikes..."
            className="pl-8"
          />
        </div>
        <div className="space-x-2">
          <Button variant="outline">Export</Button>
        </div>
      </div>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Price (₹/day)</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Units</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {DUMMY_BIKES.map(bike => (
            <TableRow key={bike.id}>
              <TableCell className="font-medium">{bike.name}</TableCell>
              <TableCell>{bike.type}</TableCell>
              <TableCell>{bike.price}</TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  bike.status === 'available' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
                }`}>
                  {bike.status}
                </span>
              </TableCell>
              <TableCell>{bike.units}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">Edit</Button>
                  <Button variant="outline" size="sm" className="text-red-600">Delete</Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default BikeManagement;
