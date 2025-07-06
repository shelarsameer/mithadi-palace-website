import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface OrderFormData {
  itemId: string;
  itemName: string;
  variationId?: string;
  variationName?: string;
  addonId?: string;
  addonName?: string;
  addonGroupName?: string;
  addonGroupId?: string;
  customerName: string;
  customerPhone: string;
  paymentType: string;
}

const TestOrder = () => {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<OrderFormData>({
    defaultValues: {
      itemId: '',
      itemName: '',
      variationId: '',
      variationName: '',
      addonId: '',
      addonName: '',
      addonGroupName: '',
      addonGroupId: '',
      customerName: '',
      customerPhone: '',
      paymentType: 'COD',
    },
  });

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
    const { preorder_date, preorder_time, created_on } = getCurrentTime();

    const orderPayload = {
      app_key: 'of40kvz679yabmignuqjrsdht135exw2',
      app_secret: 'adc43f60895ac52cd2983f2d055920badf310c28',
      access_token: '973ac7d4358f7badc9deb439e60a7e5a3df8110f',
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
              email: 'demo@email.com',
              name: data.customerName,
              address: 'Sample Address',
              phone: data.customerPhone,
              latitude: '23.0225',
              longitude: '72.5714',
            },
          },
          Order: {
            details: {
              orderID: 'G-1',
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
              order_type: 'H',
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
                name: data.itemName,
                gst_liability: 'vendor',
                item_tax: [],
                item_discount: '0',
                price: '100.00',
                final_price: '100.00',
                quantity: '1',
                description: '',
                variation_name: data.variationName || '',
                variation_id: data.variationId || '',
                AddonItem: {
                  details: data.addonId
                    ? [
                        {
                          id: data.addonId,
                          name: data.addonName!,
                          group_name: data.addonGroupName!,
                          price: '10',
                          group_id: Number(data.addonGroupId),
                          quantity: '1',
                        },
                      ]
                    : [],
                },
              },
            ],
          },
          Tax: { details: [] },
          Discount: {
            details: [
              {
                id: 'discount001',
                title: 'Flat Discount',
                type: 'F',
                price: '0',
              },
            ],
          },
        },
        udid: '',
        device_type: 'Web',
      },
    };

    try {
      const response = await fetch(
        'https://47pfzh5sf2.execute-api.ap-southeast-1.amazonaws.com/V1/save_order',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(orderPayload),
        }
      );

      const result = await response.json();

      if (response.ok && result.success) {
        console.log('✅ Status:', response.status); // 200
        toast({ title: 'Order Success', description: `Status: 200` });
      } else {
        console.error('❌ Error:', result.message);
        toast({
          title: 'Order Failed',
          description: `Error: ${result.message}`,
          variant: 'destructive',
        });
      }
    } catch (error: any) {
      console.error('❌ Request failed:', error.message);
      toast({
        title: 'Request Error',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 border rounded-lg shadow">
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <Input {...form.register('itemId')} placeholder="Item ID" required />
        <Input {...form.register('itemName')} placeholder="Item Name" required />
        <Input {...form.register('variationId')} placeholder="Variation ID (optional)" />
        <Input {...form.register('variationName')} placeholder="Variation Name (optional)" />
        <Input {...form.register('addonId')} placeholder="Addon ID (optional)" />
        <Input {...form.register('addonName')} placeholder="Addon Name (optional)" />
        <Input {...form.register('addonGroupName')} placeholder="Addon Group Name (optional)" />
        <Input {...form.register('addonGroupId')} placeholder="Addon Group ID (optional)" />
        <Input {...form.register('customerName')} placeholder="Customer Name" required />
        <Input {...form.register('customerPhone')} placeholder="Customer Phone" required />
        <Input {...form.register('paymentType')} placeholder="Payment Type (e.g., COD)" required />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Placing Order...' : 'Place Order'}
        </Button>
      </form>
    </div>
  );
};

export default TestOrder;
