import Head from "next/head";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { Box, Container, Stack, Typography } from "@mui/material";
import { useCallback, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { PricingPlan } from "src/components/pricing/pricing-plan";
import { PLAN_LABELS } from "src/utils/constants";
import { StripeService } from "src/services";
import { PricingSkeleton } from "src/components/skeleton/pricing-skeleton";
import { useAuth } from "src/hooks/use-auth";

const Pricing = () => {
  const searchParams = useSearchParams();
  const success = searchParams.get("success");
  const session_id = searchParams.get("session_id");
  const router = useRouter();

  const { user } = useAuth();

  const { isLoading, data: products } = useQuery({
    queryKey: ["getProducts"],
    queryFn: async () => {
      const { data } = await StripeService.getProducts();
      return data.result;
    },
  });

  const {
    isPending: isPricingPending,
    isLoading: isPricingLoading,
    mutate: checkoutWithStripe,
  } = useMutation({
    mutationFn: async (price) => {
      const { data } = await StripeService.checkoutWithStripe(price);
      router.push(data.result);

      return data.result;
    },
  });

  const {
    isPending: isPortalPending,
    isLoading: isPortalLoading,
    mutate: poralWithStripe,
  } = useMutation({
    mutationFn: async () => {
      const { data } = await StripeService.portalWithStripe();
      router.push(data.result);

      return data.result;
    },
  });

  const isCurrentPlan = useCallback(
    (plan) => {
      if (!user || user?.subscriptions?.length < 1) return false;
      return user.subscriptions[0].meta_data.product === plan;
    },
    [user],
  );

  const buttonLabel = useCallback(
    (plan) => {
      if (!user || user?.subscriptions?.length < 1) return "Subscribe";
      const metadata = user.subscriptions[0].meta_data;
      if (!metadata) return "";
      if (metadata.product === plan) return "Cancel Subscription";
      return "Change Subscription";
    },
    [user],
  );

  const handleCheckout = async (id) => {
    try {
      if (user?.subscriptions?.length < 1) {
        const price = products.find((p) => p.id === id).prices[0];
        checkoutWithStripe(price);
      } else {
        poralWithStripe();
      }
    } catch (error) {
      console.log("error", error);
      toast.error("Please try again later or contact a system administrator.");
    }
  };

  useEffect(() => {
    if (!success || !session_id) return;

    // checkoutSession();
    toast.success("Successfully subscribed!");
    router.replace("/pricing");
  }, [session_id, router, success]);

  if (isLoading) return <PricingSkeleton />;

  return (
    <>
      <Head>
        <title>Pricing</title>
      </Head>
      <Box
        component="main"
        sx={{
          backgroundColor: "background.paper",
          flexGrow: 1,
          pb: 6,
          maxHeight: 500,
        }}
      >
        <Container maxWidth="xl">
          <Typography component="h1" variant="h5" marginBottom={7}>
            Pricing Plan
          </Typography>
          <Stack direction="row" spacing={3} justifyContent="center">
            {products &&
              products.map(({ id, name, prices }) => (
                <PricingPlan
                  key={id}
                  loading={isPricingLoading || isPricingPending}
                  handleCheckout={() => handleCheckout(id)}
                  cta={buttonLabel(id)}
                  currency="$"
                  description="To familiarize yourself with our tools."
                  features={[
                    "All previous",
                    "Highlights reporting",
                    "Data history",
                    "Unlimited users",
                  ]}
                  image="/static/pricing/plan2.svg"
                  name={name}
                  popular
                  price={prices[0].unit_amount}
                  label={PLAN_LABELS[name]}
                  isCurrent={isCurrentPlan(id)}
                  sx={{
                    height: "100%",
                    maxWidth: 460,
                    mx: "auto",
                  }}
                />
              ))}
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Pricing.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Pricing;
