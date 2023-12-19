import { SVGProps } from 'react';

export const DropDownArrow = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={12}
    height={7}
    fill="none"
    {...props}
  >
    <path
      fill="currentColor"
      d="M6 4.915 10.073.858a.744.744 0 0 1 .514-.22.697.697 0 0 1 .54.22c.145.144.217.32.217.526a.717.717 0 0 1-.217.527L7.079 5.96c-.294.294-.653.44-1.079.44-.426 0-.785-.146-1.079-.44L.873 1.911a.744.744 0 0 1-.22-.514.697.697 0 0 1 .22-.54A.718.718 0 0 1 1.4.64c.206 0 .382.073.527.218L6 4.915Z"
    />
  </svg>
);
