export const getImageLink = (link: string | undefined) => {
  if (!link) return '';
  return `${import.meta.env.VITE_APP_MEDIA_URL}/${link}`;
};

export const formatMoney = (money: number, showPrefix = true) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  });
  if (showPrefix) {
    return formatter.format(money);
  }
  return new Intl.NumberFormat().format(money);
};

export const formatProductLink = (name: string) => {
  return name.toLowerCase().replace(' ', '-');
};

export const maskEmail = (email: string) => {
  const atIndex = email.indexOf('@');
  if (atIndex !== -1) {
    const firstThreeChars = email.substring(0, Math.min(3, atIndex));
    const lastTwoChars = email.substring(atIndex - 2, atIndex);
    return firstThreeChars + '*'.repeat(Math.max(atIndex - 3, 0)) + lastTwoChars + email.substring(atIndex);
  }
  return email;
};

export const isMobile = (): boolean => {
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    return true;
  } else {
    return false;
  }
};
