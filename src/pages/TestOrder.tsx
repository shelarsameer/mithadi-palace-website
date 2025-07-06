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
        app_key:"of40kvz679yabmignuqjrsdht135exw2",
        app_secret: "adc43f60895ac52cd2983f2d055920badf310c28",
        access_token: "973ac7d4358f7badc9deb439e60a7e5a3df8110f",
        res_name: 'Dynamite Lounge',
        address: '2nd Floor, Reliance Mall, Nr.Akshar Chowk',
        Contact_information: '9427846660',
        restID: '4pv3z1uks5',
        'OrderInfo / Customer': {
          email: 'test@example.com',
          name: data.customerName,
          address: 'Sample address',
          phone: data.customerPhone,
          latitude: '23.0225',
          longitude: '72.5714',
        },
        'OrderInfo / Order': {
          orderID: 'G-1',
          preorder_date,
          preorder_time,
          delivery_charges: '0',
          order_type: data.orderType,
          ondc_bap: 'LovableApp',
          advanced_order: 'N',
          urgent_order: false,
          urgent_time: 20,
          payment_type: data.paymentType,
          table_no: '',
          no_of_persons: '0',
          discount_total: '0',
          discount: '0',
          discount_type: 'F',
          total: '100',
          tax_total: '0',
          description: '',
          created_on,
          packing_charges: '0',
          min_prep_time: 15,
          callback_url: 'https://webhook.site/test-callback',
          collect_cash: '100',
          otp: '1234',
          enable_delivery: 1,
          service_charge: '0',
          sc_tax_amount: '0',
          dc_tax_amount: '0',
          dc_gst_details: {
            gst_liable: 'vendor',
            amount: '0',
          },
          pc_tax_amount: '0',
          pc_gst_details: {
            gst_liable: 'vendor',
            amount: '0',
          },
        },
        'OrderInfo/ OrderItem': {
          id: data.itemId,
          name: selectedItem?.name || 'Item',
          gst_liability: 'vendor',
          item_tax: {
            id: 'tax001',
            name: 'CGST',
            amount: '0',
          },
          item_discount: '0',
          price: '100.00',
          final_price: '100.00',
          quantity: '1',
          description: '',
          variation_name: '',
          variation_id: data.variationId || '',
        },
        'OrderInfo/ OrderItem / AddonItem': data.addonId
          ? {
              id: data.addonId,
              name: 'Addon Item',
              group_name: 'Addons',
              price: '10',
              group_id: '1',
              quantity: '1',
            }
          : {},
        'OrderInfo/Tax': {
          id: 'tax001',
          title: 'CGST',
          type: 'P',
          price: '2.5',
          tax: '0',
          restaurant_liable_amt: '0',
        },
        'OrderInfo/ Discount': {
          id: 'discount001',
          title: 'Flat Discount',
          type: 'F',
          price: '0',
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
          {/* form remains unchanged */}
        </div>
      </div>
    </div>
  );
};

export default TestOrder;
