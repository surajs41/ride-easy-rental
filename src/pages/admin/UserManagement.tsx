
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

const DUMMY_USERS = [
  { id: 1, name: 'John Doe', email: 'john@example.com', phone: '9876543210', status: 'active', registeredOn: '2025-03-15' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '9876543211', status: 'active', registeredOn: '2025-03-16' },
  { id: 3, name: 'Robert Johnson', email: 'robert@example.com', phone: '9876543212', status: 'inactive', registeredOn: '2025-02-28' },
  { id: 4, name: 'Emily Davis', email: 'emily@example.com', phone: '9876543213', status: 'active', registeredOn: '2025-04-01' },
  { id: 5, name: 'Michael Wilson', email: 'michael@example.com', phone: '9876543214', status: 'active', registeredOn: '2025-03-25' },
];

const UserManagement = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">User Management</h1>
      </div>
      
      <div className="flex justify-between items-center">
        <div className="relative w-96">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search users..."
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
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Registered On</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {DUMMY_USERS.map(user => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.phone}</TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {user.status}
                </span>
              </TableCell>
              <TableCell>{user.registeredOn}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">View</Button>
                  <Button variant="outline" size="sm" className="text-red-600">Block</Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserManagement;
