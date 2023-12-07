import { GetStaticProps, NextPage } from "next";
import FaqSection from "dh-marvel/components/faqs/FaqSection";
import LayoutGeneral from "dh-marvel/components/layouts/layout-general";
import { FaqsType, faqsData } from "dh-marvel/components/faqs/faqsData";

interface Props {
  faqs: FaqsType[];
}

const faqsPage: NextPage<Props> = ({ faqs }) => {
  return (
    <LayoutGeneral>
      <FaqSection faqs={faqs} />
    </LayoutGeneral>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const fetchedFaqs = faqsData;

  return {
    props: {
      faqs: fetchedFaqs,
    },
  };
};

export default faqsPage;
