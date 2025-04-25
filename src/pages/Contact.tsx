
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

const Contact = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Thank you for your message! We'll get back to you soon.");
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8">Contact Us</h1>
      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <p className="text-lg mb-6">
            Have questions? We're here to help! Send us a message and we'll get back to you as soon as possible.
          </p>
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-semibold mb-2">Location</h3>
              <p>123 Bike Street, Cycling City, CC 12345</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Email</h3>
              <p>support@rideeasy.com</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Phone</h3>
              <p>+1 (555) 123-4567</p>
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" required />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" required />
          </div>
          <div>
            <Label htmlFor="message">Message</Label>
            <Textarea id="message" required className="min-h-[150px]" />
          </div>
          <Button type="submit" className="w-full bg-brand-teal hover:bg-brand-teal/90">
            Send Message
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
