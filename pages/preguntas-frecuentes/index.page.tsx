import { GetStaticProps, NextPage } from "next";
import FaqSection from "dh-marvel/components/faqs/FaqSection";
import LayoutGeneral from "dh-marvel/components/layouts/layout-general";
import { FaqsType } from "dh-marvel/components/faqs/faqsData";

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
  const url = "http://comics-online.vercel.app";
  const response = await fetch(`${url}/api/faqs`);
  const faqs = await response.json();

  return {
    props: {
      faqs,
    },
  };
};

export default faqsPage;
