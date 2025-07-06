
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { toast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';

const DUMMY_ITEMS = [
  { id: 'item_001', name: 'Margherita Pizza', hasVariations: true, hasAddons: true },
  { id: 'item_002', name: 'Chicken Burger', hasVariations: false, hasAddons: true },
  { id: 'item_003', name: 'Caesar Salad', hasVariations: false, hasAddons: false },
  { id: 'item_004', name: 'Pasta Alfredo', hasVariations: true, hasAddons: false },
];

const DUMMY_VARIATIONS = [
  { id: 'var_001', name: 'Small' },
  { id: 'var_002', name: 'Medium' },
  { id: 'var_003', name: 'Large' },
];

const DUMMY_ADDONS = [
  { id: 'addon_001', name: 'Extra Cheese' },
  { id: 'addon_002', name: 'Extra Mushrooms' },
  { id: 'addon_003', name: 'Garlic Bread' },
];

interface OrderFormData {
  itemId: string;
  variationId?: string;
  addonId?: string;
  customerName: string;
  customerPhone: string;
  orderType: string;
  paymentType: string;
}

const TestOrder = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState<typeof DUMMY_ITEMS[0] | null>(null);

  const form = useForm<OrderFormData>({
    defaultValues: {
      itemId: '',
      variationId: '',
      addonId: '',
      customerName: '',
      customerPhone: '',
      orderType: 'H',
      paymentType: 'COD',
    },
  });

  const handleItemChange = (itemId: string) => {
    const item = DUMMY_ITEMS.find(i => i.id === itemId);
    setSelectedItem(item || null);
    form.setValue('itemId', itemId);
    form.setValue('variationId', '');
    form.setValue('addonId', '');
  };

  const getCurrentTime = () => {
    const now = new Date();
    return {
      preorder_date: now.toISOString().slice(0, 10),
      preorder_time: now.toTimeString().slice(0, 8),
      created_on: now.toISOString().slice(0, 19).replace('T', ' '),
    };
  };

  const onSubmit = async (data: OrderFormData) => {
    setIsLoading(true);
    try {
      const { preorder_date, preorder_time, created_on } = getCurrentTime();
      const orderPayload = {
        app_key: import.meta.env.VITE_PETPOOJA_APP_KEY,
        app_secret: import.meta.env.VITE_PETPOOJA_APP_SECRET,
        access_token: import.meta.env.VITE_PETPOOJA_ACCESS_TOKEN,
        orderinfo: {
          OrderInfo: {
            Restaurant: {
              details: {
                res_name: 'Dynamite Lounge',
                address: '2nd Floor, Reliance Mall, Nr.Akshar Chowk',
                contact_information: '9427846660',
                restID: '4pv3z1uks5'
              }
            },
            Customer: {
              details: {
                email: 'test@example.com',
                name: data.customerName,
                address: 'Sample address',
                phone: data.customerPhone,
                latitude: '23.0225',
                longitude: '72.5714'
              }
            },
            Order: {
              details: {
                orderID: "G-1",
                preorder_date,
                preorder_time,
                service_charge: '0',
                sc_tax_amount: '0',
                delivery_charges: '0',
                dc_tax_amount: '0',
                dc_gst_details: [],
                packing_charges: '0',
                pc_tax_amount: '0',
                pc_gst_details: [],
                order_type: data.orderType,
                ondc_bap: 'LovableApp',
                advanced_order: 'N',
                urgent_order: false,
                urgent_time: 20,
                payment_type: data.paymentType,
                table_no: '',
                no_of_persons: '0',
                discount_total: '0',
                tax_total: '0',
                discount_type: 'F',
                total: '100',
                description: '',
                created_on,
                enable_delivery: 1,
                min_prep_time: 15,
                callback_url: 'https://webhook.site/test-callback',
                collect_cash: '100',
                otp: '1234'
              }
            },
            OrderItem: {
              details: [
                {
                  id: data.itemId,
                  name: selectedItem?.name || 'Item',
                  gst_liability: 'vendor',
                  item_tax: [],
                  item_discount: '0',
                  price: '100.00',
                  final_price: '100.00',
                  quantity: '1',
                  description: '',
                  variation_name: '',
                  variation_id: data.variationId || '',
                  AddonItem: {
                    details: data.addonId
                      ? [
                          {
                            id: data.addonId,
                            name: 'Addon Item',
                            group_name: 'Addons',
                            price: '10',
                            group_id: 1,
                            quantity: '1',
                          },
                        ]
                      : [],
                  },
                },
              ],
            },
            Tax: {
              details: [],
            },
            Discount: {
              details: [],
            },
          },
        },
        udid: '',
        device_type: 'Web',
      };

      const response = await fetch('https://qle1yy2ydc.execute-api.ap-southeast-1.amazonaws.com/V1/save_order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload),
      });

      const result = await response.json();
      if (response.ok && result.success) {
        toast({
          title: 'Order Placed Successfully!',
          description: `Order ID: ${result.order_id || 'Generated'}`,
        });
        form.reset();
        setSelectedItem(null);
      } else {
        throw new Error(result.message || 'Order placement failed');
      }
    } catch (error) {
      toast({
        title: 'Order Failed',
        description: error instanceof Error ? error.message : 'Unknown error',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Test PetPooja Order</h1>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="itemId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select Item</FormLabel>
                    <Select onValueChange={handleItemChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose an item" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {DUMMY_ITEMS.map((item) => (
                          <SelectItem key={item.id} value={item.id}>
                            {item.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {selectedItem?.hasVariations && (
                <FormField
                  control={form.control}
                  name="variationId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Select Variation</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Choose a variation" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {DUMMY_VARIATIONS.map((variation) => (
                            <SelectItem key={variation.id} value={variation.id}>
                              {variation.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {selectedItem?.hasAddons && (
                <FormField
                  control={form.control}
                  name="addonId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Select Addon</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Choose an addon" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {DUMMY_ADDONS.map((addon) => (
                            <SelectItem key={addon.id} value={addon.id}>
                              {addon.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <FormField
                control={form.control}
                name="customerName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Customer Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter customer name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="customerPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Customer Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter phone number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="orderType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Order Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="H">Home Delivery</SelectItem>
                          <SelectItem value="T">Takeaway</SelectItem>
                          <SelectItem value="D">Dine In</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="paymentType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Payment Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="COD">Cash on Delivery</SelectItem>
                          <SelectItem value="PAID">Paid Online</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Place Order
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default TestOrder;
