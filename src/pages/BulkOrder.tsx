
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Package, Users, Calendar, Phone, Mail, CheckCircle } from 'lucide-react';

type BulkOrderForm = {
  name: string;
  email: string;
  phone: string;
  company: string;
  eventType: string;
  quantity: string;
  deliveryDate: string;
  requirements: string;
};

const BulkOrder = () => {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<BulkOrderForm>();

  const onSubmit = async (data: BulkOrderForm) => {
    try {
      console.log('Bulk order data:', data);
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Bulk order request submitted successfully! We will contact you within 24 hours.');
      reset();
    } catch (error) {
      toast.error('Failed to submit bulk order request. Please try again later.');
      console.error('Error submitting bulk order:', error);
    }
  };

  const benefits = [
    "Competitive wholesale pricing",
    "Custom packaging options",
    "Flexible delivery schedules",
    "Quality assurance guarantee",
    "Dedicated account manager",
    "Fresh preparation guarantee"
  ];

  const eventTypes = [
    "Corporate Events",
    "Weddings",
    "Festivals",
    "Birthday Parties",
    "Religious Ceremonies",
    "Conference & Meetings",
    "Other Celebrations"
  ];

  return (
    <div className="container mx-auto px-4 py-24">
      {/* Header */}
      <div className="text-center mb-16">
        <Badge className="bg-royal-gold/10 text-royal-gold hover:bg-royal-gold/20 mb-4">
          Wholesale Orders
        </Badge>
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-royal-brown mb-6">
          Bulk Orders
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Perfect for corporate events, weddings, festivals, and special occasions. Get premium quality sweets at wholesale prices with custom packaging options.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-16">
        {/* Benefits & Info */}
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-royal-brown mb-6 flex items-center gap-3">
              <Package className="w-6 h-6 text-royal-gold" />
              Why Choose Our Bulk Orders?
            </h2>
            
            <div className="grid gap-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3 p-4 bg-royal-cream/20 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-royal-gold flex-shrink-0" />
                  <span className="text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg border">
            <h3 className="text-xl font-bold text-royal-brown mb-6 flex items-center gap-3">
              <Users className="w-5 h-5 text-royal-gold" />
              Minimum Order Requirements
            </h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b">
                <span className="font-medium">Corporate Events</span>
                <span className="text-royal-gold font-semibold">50+ boxes</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b">
                <span className="font-medium">Weddings</span>
                <span className="text-royal-gold font-semibold">100+ boxes</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b">
                <span className="font-medium">Festivals</span>
                <span className="text-royal-gold font-semibold">200+ boxes</span>
              </div>
              <div className="flex justify-between items-center py-3">
                <span className="font-medium">Other Events</span>
                <span className="text-royal-gold font-semibold">30+ boxes</span>
              </div>
            </div>
          </div>

          <div className="bg-royal-gold/10 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-royal-brown mb-4">Need Immediate Assistance?</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-royal-gold" />
                <span className="text-gray-700">+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-royal-gold" />
                <span className="text-gray-700">bulk@mithadipalace.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Order Form */}
        <div className="bg-white rounded-2xl p-8 shadow-lg border">
          <h2 className="text-2xl font-bold text-royal-brown mb-6">Request Bulk Order Quote</h2>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-royal-brown mb-2">
                  Full Name *
                </label>
                <Input
                  id="name"
                  placeholder="Your full name"
                  {...register('name', { required: 'Name is required' })}
                  className={errors.name ? 'border-red-500' : 'border-gray-300'}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-royal-brown mb-2">
                  Phone Number *
                </label>
                <Input
                  id="phone"
                  placeholder="+91 98765 43210"
                  {...register('phone', { required: 'Phone number is required' })}
                  className={errors.phone ? 'border-red-500' : 'border-gray-300'}
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-royal-brown mb-2">
                Email Address *
              </label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                {...register('email', { 
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address'
                  }
                })}
                className={errors.email ? 'border-red-500' : 'border-gray-300'}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="company" className="block text-sm font-medium text-royal-brown mb-2">
                Company/Organization
              </label>
              <Input
                id="company"
                placeholder="Company name (optional)"
                {...register('company')}
                className="border-gray-300"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="eventType" className="block text-sm font-medium text-royal-brown mb-2">
                  Event Type *
                </label>
                <select
                  id="eventType"
                  {...register('eventType', { required: 'Event type is required' })}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:border-royal-gold ${
                    errors.eventType ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select event type</option>
                  {eventTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                {errors.eventType && (
                  <p className="mt-1 text-sm text-red-500">{errors.eventType.message}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="quantity" className="block text-sm font-medium text-royal-brown mb-2">
                  Estimated Quantity *
                </label>
                <Input
                  id="quantity"
                  placeholder="e.g., 100 boxes"
                  {...register('quantity', { required: 'Quantity is required' })}
                  className={errors.quantity ? 'border-red-500' : 'border-gray-300'}
                />
                {errors.quantity && (
                  <p className="mt-1 text-sm text-red-500">{errors.quantity.message}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="deliveryDate" className="block text-sm font-medium text-royal-brown mb-2">
                Required Delivery Date *
              </label>
              <Input
                id="deliveryDate"
                type="date"
                {...register('deliveryDate', { required: 'Delivery date is required' })}
                className={errors.deliveryDate ? 'border-red-500' : 'border-gray-300'}
              />
              {errors.deliveryDate && (
                <p className="mt-1 text-sm text-red-500">{errors.deliveryDate.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="requirements" className="block text-sm font-medium text-royal-brown mb-2">
                Special Requirements
              </label>
              <Textarea
                id="requirements"
                placeholder="Please specify any special packaging, dietary restrictions, or other requirements..."
                rows={4}
                {...register('requirements')}
                className="border-gray-300 resize-none"
              />
            </div>

            <Button 
              type="submit" 
              className="w-full bg-royal-gold hover:bg-royal-darkGold text-white py-3 text-lg font-semibold"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Submitting Request...
                </>
              ) : (
                <>
                  <Calendar className="w-5 h-5 mr-2" />
                  Submit Bulk Order Request
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BulkOrder;
