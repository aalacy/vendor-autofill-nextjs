import Head from 'next/head';
import { Box, Stack, Switch, Typography } from '@mui/material';
import { useMemo, useState } from 'react';

import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { PricingPlan } from 'src/components/pricing/pricing-plan';

const Pricing = () => {
  const [checked, setChecked] = useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const standardPrices = useMemo(() => {
    return checked ? 999 : 99;
  }, [checked])

  return (
    <>
      <Head>
        <title>
          Pricing
        </title>
      </Head>
      <Stack direction="row" spacing={1} alignItems="center" justifyContent="center" mb={3}>
        <Typography>Monthly</Typography>
        <Switch
          checked={checked}
          onChange={handleChange}
          inputProps={{ 'aria-label': 'controlled' }}
        />
        <Typography>Annual</Typography>
      </Stack>
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
          isAnnual={checked}
          cta="Start Free Trial"
          currency="$"
          description="To familiarize yourself with our tools."
          features={[
            'Create contracts',
            'Chat support',
            'Email alerts'
          ]}
          image="/static/pricing/plan1.svg"
          name="Startup"
          price="0"
          sx={{
            height: '100%',
            maxWidth: 460,
            mx: 'auto'
          }}
        />
        <PricingPlan
          isAnnual={checked}
          cta="Start Free Trial"
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
          sx={{
            height: '100%',
            maxWidth: 460,
            mx: 'auto'
          }}
        />

        {/* <Grid
            container
            spacing={4}
          >
            <Grid
              item
              md={4}
              xs={12}
            >
              
            </Grid>
            <Grid
              item
              md={4}
              xs={12}
            >
              
            </Grid>
          </Grid> */}
      </Box>
    </>
  );
};

Pricing.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Pricing;