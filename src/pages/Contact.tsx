
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';

type FormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export function Contact() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      console.log('Form data:', data);
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Message sent successfully! We will get back to you soon.');
      reset();
    } catch (error) {
      toast.error('Failed to send message. Please try again later.');
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-24">
      {/* Header */}
      <div className="text-center mb-16">
        <Badge className="bg-royal-gold/10 text-royal-gold hover:bg-royal-gold/20 mb-4">
          Get in Touch
        </Badge>
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-royal-brown mb-6">
          Contact Us
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          We'd love to hear from you. Send us a message and we'll respond as soon as possible.
        </p>
      </div>
      
      <div className="grid lg:grid-cols-3 gap-12">
        {/* Contact Information */}
        <div className="lg:col-span-1">
          <h2 className="text-2xl font-bold text-royal-brown mb-8">Contact Information</h2>
          
          <div className="space-y-8">
            <div className="flex items-start group">
              <div className="w-12 h-12 bg-royal-gold/20 rounded-full flex items-center justify-center mr-4 group-hover:bg-royal-gold/30 transition-colors">
                <MapPin className="h-5 w-5 text-royal-gold" />
              </div>
              <div>
                <h3 className="font-semibold text-royal-brown mb-2">Visit Our Store</h3>
                <p className="text-gray-600 leading-relaxed">
                  123 Sweet Street<br />
                  Heritage Market, Old City<br />
                  Mumbai, Maharashtra 400001<br />
                  India
                </p>
              </div>
            </div>
            
            <div className="flex items-start group">
              <div className="w-12 h-12 bg-royal-gold/20 rounded-full flex items-center justify-center mr-4 group-hover:bg-royal-gold/30 transition-colors">
                <Phone className="h-5 w-5 text-royal-gold" />
              </div>
              <div>
                <h3 className="font-semibold text-royal-brown mb-2">Call Us</h3>
                <p className="text-gray-600">
                  +91 98765 43210<br />
                  +91 98765 43211
                </p>
              </div>
            </div>
            
            <div className="flex items-start group">
              <div className="w-12 h-12 bg-royal-gold/20 rounded-full flex items-center justify-center mr-4 group-hover:bg-royal-gold/30 transition-colors">
                <Mail className="h-5 w-5 text-royal-gold" />
              </div>
              <div>
                <h3 className="font-semibold text-royal-brown mb-2">Email Us</h3>
                <p className="text-gray-600">
                  info@mithadipalace.com<br />
                  orders@mithadipalace.com
                </p>
              </div>
            </div>
            
            <div className="flex items-start group">
              <div className="w-12 h-12 bg-royal-gold/20 rounded-full flex items-center justify-center mr-4 group-hover:bg-royal-gold/30 transition-colors">
                <Clock className="h-5 w-5 text-royal-gold" />
              </div>
              <div>
                <h3 className="font-semibold text-royal-brown mb-2">Store Hours</h3>
                <p className="text-gray-600 leading-relaxed">
                  Monday - Saturday: 9:00 AM - 9:00 PM<br />
                  Sunday: 10:00 AM - 8:00 PM<br />
                  <span className="text-sm text-royal-gold">Festival hours may vary</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Contact Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl p-8 shadow-lg border">
            <h2 className="text-2xl font-bold text-royal-brown mb-6">Send us a Message</h2>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-royal-brown mb-2">
                    Full Name *
                  </label>
                  <Input
                    id="name"
                    placeholder="Your full name"
                    {...register('name', { required: 'Name is required' })}
                    className={`${errors.name ? 'border-red-500' : 'border-gray-300'} focus:border-royal-gold`}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
                  )}
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
                    className={`${errors.email ? 'border-red-500' : 'border-gray-300'} focus:border-royal-gold`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                  )}
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-royal-brown mb-2">
                  Subject *
                </label>
                <Input
                  id="subject"
                  placeholder="How can we help you?"
                  {...register('subject', { required: 'Subject is required' })}
                  className={`${errors.subject ? 'border-red-500' : 'border-gray-300'} focus:border-royal-gold`}
                />
                {errors.subject && (
                  <p className="mt-1 text-sm text-red-500">{errors.subject.message}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-royal-brown mb-2">
                  Message *
                </label>
                <Textarea
                  id="message"
                  placeholder="Tell us more about your inquiry..."
                  rows={6}
                  {...register('message', { required: 'Message is required' })}
                  className={`${errors.message ? 'border-red-500' : 'border-gray-300'} focus:border-royal-gold resize-none`}
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>
                )}
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-royal-gold hover:bg-royal-darkGold text-white py-3 text-lg font-semibold"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="mt-20">
        <h2 className="text-3xl font-bold text-royal-brown text-center mb-8">Find Our Store</h2>
        <div className="bg-gray-100 rounded-2xl h-96 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="h-12 w-12 text-royal-gold mx-auto mb-4" />
            <p className="text-gray-600 text-lg">Interactive map coming soon</p>
            <p className="text-sm text-gray-500 mt-2">123 Sweet Street, Heritage Market, Mumbai</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
