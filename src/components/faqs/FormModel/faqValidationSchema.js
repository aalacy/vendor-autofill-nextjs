/* eslint-disable import/no-anonymous-default-export */
import * as Yup from "yup";
import faqFormModel from "./faqFormModel";
const {
  formField: { question, answer },
} = faqFormModel;

export default Yup.object().shape({
  [question.name]: Yup.string().required(`${question.requiredErrorMsg}`),
  [answer.name]: Yup.string().required(`${answer.requiredErrorMsg}`),
});
