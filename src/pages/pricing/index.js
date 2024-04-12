import Head from 'next/head';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { Box } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { useQuery, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { PricingPlan } from 'src/components/pricing/pricing-plan';
import PlanToggleButton from 'src/components/pricing/pricing-switch';
import { PLAN_LABELS } from 'src/utils/constants';
import { StripeService } from 'src/services';
import { PricingSkeleton } from 'src/components/skeleton/pricing-skeleton';
import { useAuth } from 'src/hooks/use-auth';

const Pricing = () => {
  const [plan, setPlan] = useState();
  const searchParams = useSearchParams();
  const success = searchParams.get('success')
  const session_id = searchParams.get('session_id')
  const router = useRouter();

  const { user } = useAuth();

  const { isLoading, data: products } = useQuery({
    queryKey: [
      "getProducts"
    ],
    queryFn: async () => {
      const { data } = await StripeService.getProducts();
      return data.result;
    },
  });

  const { isPending: isPricingPending, isLoading: isPricingLoading, mutate: checkoutWithStripe } = useMutation(
    {
      mutationFn: async (price) => {
        const { data } = await StripeService.checkoutWithStripe(price);
        router.push(data.result)

        return data.result;
      }
    });

  const { isPending: isPortalPending, isLoading: isPortalLoading, mutate: poralWithStripe } = useMutation(
    {
      mutationFn: async () => {
        const { data } = await StripeService.portalWithStripe();
        router.push(data.result)

        return data.result;
      }
    });

  const standardPrices = useMemo(() => {
    return plan && products?.length > 0 ? products.find(p => p.id === plan).prices[0].unit_amount : 0;
  }, [plan])

  const pricingLabel = useMemo(() => {
    if (!products || products?.length < 1 || !plan) return ""
    const name = products.find(p => p.id === plan).name;
    return PLAN_LABELS[name]
  }, [plan])

  const buttonLabel = useMemo(() => {
    if (user.subscriptions?.length < 1) return "Subscribe"
    const metadata = user.subscriptions[0].meta_data;
    if (!metadata) return ""
    if (metadata.product === plan) return "Cancel Subscription";
    return "Change Subscription"
  }, [plan, user])

  const handleCheckout = async () => {
    try {
      if (buttonLabel === "Subscribe") {
        const price = products.find(p => p.id === plan).prices[0];
        checkoutWithStripe(price);
      } else {
        poralWithStripe()
      }
    } catch (error) {
      console.log('error', error)
      toast.error('Please try again later or contact a system administrator.')
    }
  };

  useEffect(() => {
    if (!success || !session_id) return;

    // checkoutSession();
    toast.success("Successfully subscribed!");
    router.replace('/pricing');
  }, [session_id])

  if (isLoading) return <PricingSkeleton />

  return (
    <>
      <Head>
        <title>
          Pricing
        </title>
      </Head>
      <Box sx={{ textAlign: "center", mb: 2 }}>
        <PlanToggleButton
          plan={plan}
          setPlan={setPlan}
          products={products}
        />
      </Box>
      <Box
        component="main"
        sx={{
          backgroundColor: 'background.paper',
          flexGrow: 1,
          justifyContent: "center",
          display: "flex",
          flexWrap: "wrap",
          gap: 3,
          pb: 6
        }}
      >
        <PricingPlan
          loading={isPricingLoading || isPricingPending}
          handleCheckout={handleCheckout}
          cta={buttonLabel}
          currency="$"
          description="To familiarize yourself with our tools."
          features={[
            'All previous',
            'Highlights reporting',
            'Data history',
            'Unlimited users'
          ]}
          image="/static/pricing/plan2.svg"
          name="Standard"
          popular
          price={standardPrices}
          label={pricingLabel}
          sx={{
            height: '100%',
            maxWidth: 460,
            mx: 'auto'
          }}
        />
      </Box>
    </>
  );
};

Pricing.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Pricing;