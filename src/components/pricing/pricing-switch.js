import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useEffect } from "react";

export default function PlanToggleButton({ products, plan, setPlan }) {
  const handleChange = (event, newPlan) => {
    if (newPlan !== null) {
      setPlan(newPlan);
    }
  };

  useEffect(() => {
    if (products?.length < 1) return;
    setPlan(products[0].id);
  }, [products]);

  return (
    <ToggleButtonGroup
      color="primary"
      value={plan}
      exclusive
      onChange={handleChange}
      aria-label="Plan"
    >
      {products?.map(({ id, name }) => (
        <ToggleButton key={id}
size="small"
value={id}>
          {name}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}
