import React from "react";

import { Container } from "../../../reusecore/Layout";
import SectionTitle from "../../../reusecore/SectionTitle";
// import { FiSearch } from "@react-icons/all-files/fi/FiSearch";
import Button from "../../../reusecore/Button";
import {
  Accordion,
  AccordionItem,
  AccordionTitle,
  AccordionBody,
  IconWrapper,
  OpenIcon,
  CloseIcon
} from "../../../reusecore/Accordion";

import { IoIosArrowDown } from "@react-icons/all-files/io/IoIosArrowDown";
import { IoIosArrowUp } from "@react-icons/all-files/io/IoIosArrowUp";

import data from "../../../assets/data/faq";

import FaqSectionWrapper from "./faqSection.style";

const Faq = (props) => {

  let faq_keys = [];
  let faqs_data = [];
  if (props.category === undefined)
    faqs_data = data.faqs;
  else {
    props.category.forEach(item => {
      if (item === "all")
        faqs_data = data.faqs;
      else {
        data.faqs.forEach(faq => {
          if (faq.category.toString() === item) {
            faqs_data.push(faq);
          }
        });
      }
    });
  }

  let faqs = faqs_data.reduce((faq, ind) => {
    faq[ind.category] = [...faq[ind.category] || [], ind];
    return faq;
  }, {});

  faq_keys = Object.keys(faqs);

  return (
    <FaqSectionWrapper id="faq">
      <Container >
        <SectionTitle
          className="section-title"
          $leftAlign={true}
          $UniWidth="100%"
        >
          <h1>
            <span>Frequently Asked Questions</span>
          </h1>
          {/* <div className="search">
            <Button>
                <FiSearch size={22} />
            </Button>
            <input type="text" placeholder="Search" />
          </div> */}
        </SectionTitle>
        <Accordion allowMultipleExpanded={false} allowZeroExpanded={true}>
          {faq_keys.map((key, index) => (
            <React.Fragment key={index}>
              <h2 className="category_name">{key}</h2>
              {faqs[key].map((faq, index) => (
                <AccordionItem key={index}>
                  <AccordionTitle>
                    <IconWrapper>
                      <h5>{faq.question}</h5>
                      <OpenIcon>
                        <IoIosArrowUp size={22} color="white" />
                      </OpenIcon>
                      <CloseIcon>
                        <IoIosArrowDown size={22} color="white" />
                      </CloseIcon>
                    </IconWrapper>
                  </AccordionTitle>
                  <AccordionBody>
                    <div className="inner">
                      {
                        faq.answer.length >= 1 ? <ul>{faq.answer.map((ans, id) => (<li key={id}><p key={id}>{ans}</p></li>))}</ul> : <br />
                      }
                      {faq.link &&
                       <div className="faqbutton">
                         {faq.link.startsWith("/")
                           ? <Button $primary className="faqbutton" $url={faq.link} title={faq.linktext} $external={false} />
                           :  <Button $primary className="faqbutton" $url={faq.link} title={faq.linktext} $external={true} />
                         }
                       </div>
                      }
                    </div>
                  </AccordionBody>
                </AccordionItem>
              ))}
            </React.Fragment>
          ))}
        </Accordion>
        <div className="askus_section">
          <h2>Didn't find an answer to your question?</h2>
          <Button $secondary title="Just Ask" $url="https://layer5.io/company/contact" $external={ true } />
        </div>
      </Container>
    </FaqSectionWrapper>
  );
};

export default Faq;
