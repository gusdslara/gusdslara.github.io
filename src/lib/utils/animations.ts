export const springTransition: any = {
    type: 'spring',
    stiffness: 300,
    damping: 20
};

export const bouncyTransition: any = {
    type: 'spring',
    stiffness: 400,
    damping: 10
};

export const fadeUpVariant: any = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: springTransition
    }
};

export const staggerContainer: any = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.05,
            delayChildren: 0.0
        }
    }
};

export const hoverSpring = {
    scale: 1.05,
    transition: springTransition
};

export const tapSpring = {
    scale: 0.95,
    transition: bouncyTransition
};
