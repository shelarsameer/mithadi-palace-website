import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { toast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';

interface MenuItem {
  id: string;
  name: string;
  variations?: { id: string; name: string }[];
  addons?: { id: string; name: string; group_name: string; group_id: number; price: string }[];
}

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
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  useEffect(() => {
    // Replace with actual fetch from Push Menu API if needed
    setMenuItems([
      {
        id: '118829149',
        name: 'Veg Loaded Pizza',
        addons: [
          { id: '1150783', name: 'Mojito', group_name: 'Add Beverage', group_id: 135699, price: '0' },
          { id: '1150813', name: 'Cheese', group_name: 'Extra Toppings', group_id: 135707, price: '10' },
        ],
      },
      {
        id: '118807411',
        name: 'Chocolate Cake',
      },
    ]);
  }, []);

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
    const item = menuItems.find(i => i.id === itemId) || null;
    setSelectedItem(item);
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
                restID: '4pv3z1uks5',
              },
            },
            Customer: {
              details: {
                email: 'test@example.com',
                name: data.customerName,
                address: 'Sample Address',
                phone: data.customerPhone,
                latitude: '23.0225',
                longitude: '72.5714',
              },
            },
            Order: {
              details: {
                orderID: 'A-1',
                preorder_date,
                preorder_time,
                service_charge: '0',
                sc_tax_amount: '0',
                delivery_charges: '0',
                dc_tax_amount: '0',
                dc_gst_details: [
                  { gst_liable: 'vendor', amount: '0' },
                ],
                packing_charges: '0',
                pc_tax_amount: '0',
                pc_gst_details: [
                  { gst_liable: 'vendor', amount: '0' },
                ],
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
                otp: '1234',
              },
            },
            OrderItem: {
              details: [
                {
                  id: data.itemId,
                  name: selectedItem?.name || '',
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
                            ...selectedItem?.addons?.find(a => a.id === data.addonId),
                            quantity: '1',
                          },
                        ]
                      : [],
                  },
                },
              ],
            },
            Tax: { details: [] },
            Discount: { details: [] },
          },
        },
        udid: '',
        device_type: 'Web',
      };

      const response = await fetch('https://47pfzh5sf2.execute-api.ap-southeast-1.amazonaws.com/V1/save_order', {
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
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="customerName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl><Input {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="customerPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl><Input {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="itemId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Menu Item</FormLabel>
                    <Select onValueChange={handleItemChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger><SelectValue placeholder="Select an item" /></SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {menuItems.map(item => (
                          <SelectItem key={item.id} value={item.id}>{item.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {selectedItem?.addons?.length && (
                <FormField
                  control={form.control}
                  name="addonId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Add-on</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger><SelectValue placeholder="Select add-on" /></SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {selectedItem.addons.map(addon => (
                            <SelectItem key={addon.id} value={addon.id}>{addon.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Place Order'}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default TestOrder;
