import React from 'react';
import Button from './button';

interface IProps {
  phone?: string;
  businessName: string;
  product?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  fullWidth?: boolean;
};

const ButtonWhatsapp: React.FC<IProps> = ({
  phone = '087774903902',
  businessName,
  product,
  size = 'md',
  className = '',
  fullWidth = false
}) => {
  const message = product
    ? `Halo ${businessName}, saya tertarik dengan produk ${product}. Apakah masih tersedia?`
    : `Halo ${businessName}, saya tertarik dengan bisnis kuliner Anda. Bisa minta informasi lebih lanjut?`;

  const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  const handleClick = () => {
    window.open(whatsappUrl, '_blank');
  };

  return (
    <Button
      variant="whatsapp"
      size={size}
      onClick={handleClick}
      fullWidth={fullWidth}
      className={`${className}`}
    >
      <svg
        className="w-5 h-5 mr-2"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M17.498 14.382c-.301-.15-1.767-.867-2.04-.966-.273-.101-.473-.15-.673.15-.2.3-.767.966-.94 1.164-.173.199-.347.223-.647.075-.3-.15-1.267-.465-2.414-1.485-.893-.795-1.494-1.777-1.668-2.077-.173-.3-.018-.465.13-.613.134-.135.301-.345.451-.52.151-.174.2-.3.3-.5.1-.2.05-.374-.05-.524-.1-.15-.673-1.622-.923-2.222-.242-.58-.487-.5-.673-.51-.172-.008-.371-.01-.571-.01-.2 0-.522.074-.795.375-.273.3-1.045 1.02-1.045 2.49s1.07 2.89 1.22 3.09c.15.2 2.11 3.22 5.113 4.52.714.31 1.27.5 1.705.64.714.24 1.364.207 1.878.125.572-.085 1.767-.72 2.016-1.415.255-.695.255-1.29.18-1.414-.074-.124-.272-.2-.572-.35z" />
        <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-18c-4.418 0-8 3.582-8 8s3.582 8 8 8 8-3.582 8-8-3.582-8-8-8z" />
      </svg>
      Chat di WhatsApp
    </Button>
  );
};

export default ButtonWhatsapp;