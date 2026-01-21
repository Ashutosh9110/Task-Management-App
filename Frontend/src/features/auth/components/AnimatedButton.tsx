import { Link } from 'react-router-dom';
import styles from './AnimatedButton.module.css';

interface AnimatedButtonProps {
    to: string;
    children: React.ReactNode;
    hueRotate?: number; // Optional prop to control hue rotation
    className?: string;
}

export const AnimatedButton = ({ to, children, hueRotate = 0, className = '' }: AnimatedButtonProps) => {
    const style = hueRotate ? { filter: `hue-rotate(${hueRotate}deg)` } : {};

    return (
        <Link 
            to={to} 
            className={`${styles.animatedLink} ${className}`}
            style={style}
        >
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            {children}
        </Link>
    );
};
