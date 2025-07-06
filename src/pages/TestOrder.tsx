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
      orderType: 'D',
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
      preorder_time: now.toTimeString().slice(0, 5),
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
        restID: '4pv3z1uks5',
        orderID: 'lovable_' + Date.now(),
        client_order_id: 'lovable_web_' + Date.now(),
        order_source: 'Lovable Web',
        preorder_date,
        preorder_time,
        created_on,
        device_type: 'Web',
        order_type: data.orderType,
        customer_name: data.customerName,
        customer_phone: data.customerPhone,
        payment_type: data.paymentType,
        service_charge: '0',
        sc_tax_amount: '0',
        dc_tax_amount: '0',
        pc_tax_amount: '0',
        order: [
          {
            item_id: data.itemId,
            quantity: 1,
            ...(data.variationId && { variation_group_id: 'var_group_001', variation_id: data.variationId }),
            ...(data.addonId && {
              addon: [
                {
                  addon_group_id: 'addon_grp_001',
                  addon_item_id: data.addonId,
                  quantity: 1,
                },
              ],
            }),
          },
        ],
        callback_url: 'https://webhook.site/test-callback',
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

  return <div>// ... UI remains unchanged</div>;
};

export default TestOrder;
