
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { toast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';

// Dummy data for testing - replace with real IDs later
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
    },
  });

  const handleItemChange = (itemId: string) => {
    const item = DUMMY_ITEMS.find(i => i.id === itemId);
    setSelectedItem(item || null);
    form.setValue('itemId', itemId);
    // Reset dependent fields when item changes
    form.setValue('variationId', '');
    form.setValue('addonId', '');
  };

  const onSubmit = async (data: OrderFormData) => {
    setIsLoading(true);
    
    try {
      // Construct order object according to PetPooja API structure
      const orderPayload = {
        app_key: import.meta.env.VITE_PETPOOJA_APP_KEY,
        app_secret: import.meta.env.VITE_PETPOOJA_APP_SECRET,
        access_token: import.meta.env.VITE_PETPOOJA_ACCESS_TOKEN,
        restID: "4pv3z1uks5",
        client_order_id: "lovable_test_" + Date.now(),
        order_source: "lovable_web",
        customer_details: {
          name: data.customerName,
          phone: data.customerPhone
        },
        order_details: [
          {
            item_id: data.itemId,
            quantity: 1,
            ...(data.variationId && { variation_id: data.variationId }),
            ...(data.addonId && {
              addon: [
                {
                  addon_item_id: data.addonId,
                  quantity: 1
                }
              ]
            })
          }
        ],
        callback_url: "https://webhook.site/test-callback"
      };

      console.log('Sending order payload:', orderPayload);

      const response = await fetch('https://qle1yy2ydc.execute-api.ap-southeast-1.amazonaws.com/V1/save_order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderPayload)
      });

      const result = await response.json();
      console.log('Order response:', result);

      if (response.ok && result.success) {
        toast({
          title: "Order Placed Successfully!",
          description: `Order ID: ${result.order_id || 'Generated'}`,
        });
        form.reset();
        setSelectedItem(null);
      } else {
        throw new Error(result.message || 'Order placement failed');
      }
    } catch (error) {
      console.error('Error placing order:', error);
      toast({
        title: "Order Failed",
        description: error instanceof Error ? error.message : 'Failed to place order. Please try again.',
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-24 max-w-2xl">
      <h1 className="text-3xl font-bold mb-8">Test PetPooja Order Integration</h1>
      
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <h2 className="font-semibold text-blue-800 mb-2">Test Cases:</h2>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Item + tax (select any item without variations/addons)</li>
          <li>• Item + addon + tax (select item + addon)</li>
          <li>• Item + variation + tax (select item + variation)</li>
          <li>• Item + discount + tax (backend configured)</li>
          <li>• Item + variation + addon + tax (select all options)</li>
        </ul>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="itemId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Menu Item</FormLabel>
                <Select onValueChange={handleItemChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a menu item" />
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
                  <FormLabel>Variation (Optional)</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select variation" />
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
                  <FormLabel>Addon (Optional)</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select addon" />
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

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Placing Order...
              </>
            ) : (
              'Place Order'
            )}
          </Button>
        </form>
      </Form>

      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-semibold mb-2">Environment Variables Status:</h3>
        <div className="text-sm space-y-1">
          <p>App Key: {import.meta.env.VITE_PETPOOJA_APP_KEY ? '✅ Set' : '❌ Missing'}</p>
          <p>App Secret: {import.meta.env.VITE_PETPOOJA_APP_SECRET ? '✅ Set' : '❌ Missing'}</p>
          <p>Access Token: {import.meta.env.VITE_PETPOOJA_ACCESS_TOKEN ? '✅ Set' : '❌ Missing'}</p>
        </div>
      </div>
    </div>
  );
};

export default TestOrder;
