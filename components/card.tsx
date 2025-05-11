import React from 'react';

type IProps = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
};

const Card: React.FC<IProps> & {
  Header: React.FC<{ children: React.ReactNode; className?: string }>;
  Body: React.FC<{ children: React.ReactNode; className?: string }>;
  Footer: React.FC<{ children: React.ReactNode; className?: string }>;
} = ({ children, className = '', onClick, hoverable = false }) => {
  const hoverClass = hoverable
    ? 'transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer'
    : '';

  return (
    <div
      className={`bg-white rounded-xl shadow-md overflow-hidden ${hoverClass} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

const Header: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => <div className={`p-4 ${className}`}>{children}</div>;
Header.displayName = 'Card.Header';

const Body: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => <div className={`p-4 ${className}`}>{children}</div>;
Body.displayName = 'Card.Body';

const Footer: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => <div className={`p-4 ${className}`}>{children}</div>;
Footer.displayName = 'Card.Footer';

Card.Header = Header;
Card.Body = Body;
Card.Footer = Footer;

Card.displayName = 'Card';

export default Card;
