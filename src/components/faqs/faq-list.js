import { Container, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { FaqService } from "src/services";
import { FaqItem } from "./faq-item";

export const FaqList = () => {
  const { isLoading, data } = useQuery({
    queryKey: ["getAllFaqs"],
    queryFn: async () => {
      const {
        data: { result },
      } = await FaqService.all();
      return result;
    },
  });

  return (
    <Container maxWidth="md">
      {data?.map((item) => (
        <FaqItem key={item.id} item={item} />
      ))}
    </Container>
  );
};
