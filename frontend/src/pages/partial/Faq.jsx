import React, { useState } from "react";

// IMPORT FRAMER MOTION
import { AnimatedPage } from "../../components/FramerMotion/AnimatedPage";

export const Faq = () => {
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const faqData = [
    {
      category: "About Us",
      questions: [
        {
          question: "What is Bicol One Community and what is its mission?",
          answer:
            "Bicol One Community is a non-profit organization with a mission to empower and uplift communities in the Bicol region. Our primary goal is to improve the lives of people through various initiatives that promote education, alleviate poverty, and foster sustainable development.",
        },
        {
          question:
            "Is Bicol One Community a registered non-profit organization?",
          answer:
            "Yes, Bicol One Community is a registered non-profit organization. We are committed to operating transparently and in compliance with all legal requirements. You can find our registration details on our website or request them directly from our team.",
        },
        {
          question:
            "How can I stay updated on Bicol One Community's work and impact?",
          answer:
            "You can stay informed about Bicol One Community's work and impact by subscribing to our newsletter, following us on social media, and accessing our annual reports. These channels provide regular updates on our activities and the positive changes we're making in the community.",
        },
        {
          question:
            "What is your privacy policy regarding donor and volunteer information?",
          answer:
            "We take privacy and data security seriously. Our privacy policy outlines how we collect, use, and protect donor and volunteer information. You can find detailed information in the 'Privacy Policy' section on our website. Your personal information is handled with care and in accordance with applicable laws.",
        },
        {
          question:
            "How can I contact Bicol One Community for further inquiries?",
          answer:
            "For any inquiries or additional information, you can contact Bicol One Community through our official email address at contact@bicolonecommunity.org. Additionally, you can reach us by phone at [Phone Number]. Our team is here to assist you and address your questions.",
        },
        {
          question:
            "Do you have a yearly report or financial statements available for review?",
          answer:
            "Yes, we provide access to our yearly reports and financial statements to promote transparency and accountability. You can find these documents on our website's 'Reports' section or request a copy by reaching out to us directly.",
        },
        {
          question:
            "Can I leave a legacy gift or include Bicol One Community in my will?",
          answer:
            "Leaving a legacy gift or including Bicol One Community in your will is a wonderful way to support our organization's long-term mission. You can find information on how to make planned giving arrangements on our website or by contacting us directly.",
        },
      ],
    },
    {
      category: "Donations and Financials",
      questions: [
        {
          question: "How can I make a donation to support your cause?",
          answer:
            "Making a donation to support our cause is a meaningful way to contribute to our mission. You can donate online through our secure donation portal on our website. We also accept in-kind donations, and more information can be found on our donation page.",
        },
        {
          question:
            "Can I designate my donation to a specific project or cause within Bicol One Community?",
          answer:
            "Yes, donors have the option to specify where their donations will be used. We offer the flexibility to designate your donation to a particular project or cause that resonates with your values. Please indicate your preference when making a donation.",
        },
        {
          question: "Is my donation tax-deductible?",
          answer:
            "Yes, your donation to Bicol One Community may be tax-deductible, depending on your local tax laws and regulations. We are a registered non-profit organization, and many donations are eligible for tax benefits. Please consult with your tax advisor for specific details.",
        },
        {
          question:
            "What percentage of my donation goes directly to the cause, and how much is spent on administrative costs?",
          answer:
            "We are committed to financial transparency. A significant portion of every donation goes directly to supporting our charitable programs and initiatives. We strive to keep administrative costs low to maximize the impact of your contribution. Detailed financial information can be found in our annual reports.",
        },
      ],
    },
    {
      category: "Getting Involved",
      questions: [
        {
          question:
            "How can I get involved as a volunteer with Bicol One Community?",
          answer:
            "Getting involved as a volunteer with Bicol One Community is easy and rewarding. You can explore our volunteer opportunities on our website and fill out our volunteer registration form. We welcome individuals who are passionate about making a positive impact in our community.",
        },
        {
          question:
            "Do you offer scholarships or financial assistance for individuals in need?",
          answer:
            "Yes, we offer scholarships and financial assistance programs to individuals in need. Our scholarship initiatives aim to support education and skill development. Please visit our 'Programs' section on the website for more information on how to apply for these opportunities.",
        },
        {
          question:
            "How can I request support or assistance from Bicol One Community?",
          answer:
            "If you are in need of support or assistance, we encourage you to reach out to us. You can submit your request through our 'Contact Us' page on our website. Our team will assess your needs and provide guidance on the available support options.",
        },
        {
          question:
            "Can my company or organization partner with Bicol One Community on a corporate social responsibility (CSR) project?",
          answer:
            "We welcome corporate partnerships and collaborations through CSR projects. These partnerships can have a significant positive impact on our initiatives. Please contact our Corporate Partnerships team through our 'Contact Us' page to discuss potential collaborations and how your company can get involved.",
        },
      ],
    },
  ];

  const handleQuestionClick = (question) => {
    if (selectedQuestion === question) {
      setSelectedQuestion(null);
    } else {
      setSelectedQuestion(question);
    }
  };

  return (
    <AnimatedPage>
      <section className="pt-24">
        <div className="container mx-auto p-4">
          <h1 className="text-2xl md:text-4xl text-center font-bold mb-4">
            Frequently Asked Questions (FAQ)
          </h1>
          {faqData.map((categoryData, index) => (
            <div key={index} className="mb-10">
              <h2 className="text-2xl font-semibold mb-3">
                {categoryData.category}
              </h2>
              <ul>
                {categoryData.questions.map((item, itemIndex) => (
                  <li key={itemIndex}>
                    <div
                      className="cursor-pointer px-2 py-4 text-gray-900 dark:text-gray-100"
                      onClick={() => handleQuestionClick(item.question)}
                    >
                      <div className="flex w-full justify-between hover:underline hover:text-blue-900 bg-gray-100 rounded-3xl px-2">
                        <p>{item.question}</p>
                        {selectedQuestion !== item.question ? (
                          <i className="fa-solid fa-chevron-down text-right"></i>
                        ) : (
                          <i className="fa-solid fa-chevron-up text-right"></i>
                        )}
                      </div>
                    </div>
                    <div
                      className={`transition bg-blue-200 dark:bg-blue-950 rounded-b-3xl pl-10 pr-5 overflow-hidden mb-1 ${
                        selectedQuestion === item.question
                          ? "max-h-96 text-xl transition ease-in duration-1000"
                          : "max-h-0"
                      }`}
                    >
                      <div
                        className={`py-2 ${
                          selectedQuestion === item.question
                            ? "text-black dark:text-white transition ease-in duration-1000"
                            : "text-white dark:text-black transition ease-in duration-1000"
                        }`}
                      >
                        {item.answer}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </AnimatedPage>
  );
};

