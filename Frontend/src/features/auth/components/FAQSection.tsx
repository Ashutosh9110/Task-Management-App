import styles from './FAQSection.module.css';

interface FAQItem {
    question: string;
    answer: string;
}

const faqs: FAQItem[] = [
    {
        question: "Is there a free trial?",
        answer: "Yes, we offer a 14-day free trial on all paid plans. You can cancel at any time during the trial period without being charged."
    },
    {
        question: "Can I collaborate with my team?",
        answer: "Absolutely! TaskFlow is designed for collaboration. You can invite team members, assign tasks, and share projects seamlessly."
    },
    {
        question: "Is my data secure?",
        answer: "We take security seriously. All data is encrypted at rest and in transit, and we follow industry best practices to ensure your information is safe."
    },
    {
        question: "Can I upgrade or downgrade my plan?",
        answer: "Yes, you can change your plan at any time. Changes will be reflected in your next billing cycle."
    },
    {
        question: "Do you offer customer support?",
        answer: "Yes, our support team is available 24/7 to assist you with any questions or issues you may have."
    }
];

export const FAQSection = () => {
    return (
        <section className={`container mx-auto px-4 py-12 ${styles.faqSection}`}>
            <h2 className={styles.title}>Frequently Asked Questions</h2>
            <div className="max-w-3xl mx-auto">
                {faqs.map((faq, index) => (
                    <details key={index} className={styles.faqItem}>
                        <summary className={styles.summary}>
                            <span>{faq.question}</span>
                            {/* Custom SVG to match the requested animation structure */}
                            <svg viewBox="0 0 38 38" className={styles.icon}>
                                <path className={styles.vertical} d="M19 10.5l0 17" />
                                <path className={styles.horizontal} d="M10.5 19l17 0" />
                            </svg>
                        </summary>
                        <p className={styles.answer}>
                            {faq.answer}
                        </p>
                    </details>
                ))}
            </div>
        </section>
    );
};
