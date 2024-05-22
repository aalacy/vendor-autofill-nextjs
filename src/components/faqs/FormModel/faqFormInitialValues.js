/* eslint-disable import/no-anonymous-default-export */
import faqFormModel from './faqFormModel';
const {
  formField: {
    question,
    answer,
  }
} = faqFormModel;

export default {
  [question.name]: '',
  [answer.name]: '',
};
