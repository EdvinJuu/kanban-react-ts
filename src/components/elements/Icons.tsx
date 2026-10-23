import { levelAccent } from "../../utils/themeUtils";

interface IconProps {
  depth: number;
  variableName: string;
  hueShift?: number;
  depthShift?: number;
}

export const EditIcon = ({
  depth,
  variableName,
  hueShift,
  depthShift,
}: IconProps) => (
  <span
    style={{ color: levelAccent(depth, variableName, hueShift, depthShift) }}
    aria-hidden
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 -960 960 960"
      width="24px"
      fill="currentColor"
    >
      <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h357l-80 80H200v560h560v-278l80-80v358q0 33-23.5 56.5T760-120H200Zm280-360ZM360-360v-170l367-367q12-12 27-18t30-6q16 0 30.5 6t26.5 18l56 57q11 12 17 26.5t6 29.5q0 15-5.5 29.5T897-728L530-360H360Zm481-424-56-56 56 56ZM440-440h56l232-232-28-28-29-28-231 231v57Zm260-260-29-28 29 28 28 28-28-28Z" />
    </svg>
  </span>
);

export const CheckIcon = ({
  depth,
  variableName,
  hueShift,
  depthShift,
}: IconProps) => (
  <span
    style={{ color: levelAccent(depth, variableName, hueShift, depthShift) }}
    aria-hidden
  >
    <svg
      color="currentColor"
      height="24px"
      width="24px"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10Zm-5.186-2.419a1 1 0 1 0-1.628-1.162l-4.314 6.04-2.165-2.166a1 1 0 0 0-1.414 1.414l3 3a1 1 0 0 0 1.52-.126l5-7Z"
          fill="currentColor"
        ></path>
      </g>
    </svg>
  </span>
);
export const DeleteIcon = ({
  depth,
  variableName,
  hueShift,
  depthShift,
}: IconProps) => (
  <span
    style={{ color: levelAccent(depth, variableName, hueShift, depthShift) }}
    aria-hidden
  >
    <svg
      width="24"
      height="24"
      viewBox="0 0 28 28"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      transform=""
    >
      <path d="M4.1863 4.1005A14 14-45 1023.9853 23.8995 14 14-45 004.1863 4.1005ZM18.9479 9.7574A1 1-45 0118.9479 11.1716L16.1194 14 18.9479 16.8284A1 1-45 0118.9479 18.2426L18.2407 18.9497A1 1-45 0116.8265 18.9497L13.9981 16.1213 11.1697 18.9497A1 1-45 019.7555 18.9497L9.0484 18.2426A1 1-45 019.0484 16.8284L11.8768 14 9.0484 11.1716A1 1-45 019.0484 9.7574L9.7555 9.0503A1 1-45 0111.1697 9.0503L13.9981 11.8787 16.8265 9.0503A1 1-45 0118.2407 9.0503L18.9479 9.7574Z" />
    </svg>
  </span>
);
export const PlusIcon = ({
  depth,
  variableName,
  hueShift,
  depthShift,
}: IconProps) => (
  <span
    style={{ color: levelAccent(depth, variableName, hueShift, depthShift) }}
    aria-hidden
  >
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13 9C13 8.44772 12.5523 8 12 8C11.4477 8 11 8.44772 11 9V11H9C8.44772 11 8 11.4477 8 12C8 12.5523 8.44772 13 9 13H11V15C11 15.5523 11.4477 16 12 16C12.5523 16 13 15.5523 13 15V13H15C15.5523 13 16 12.5523 16 12C16 11.4477 15.5523 11 15 11H13V9ZM7.25007 2.38782C8.54878 2.0992 10.1243 2 12 2C13.8757 2 15.4512 2.0992 16.7499 2.38782C18.06 2.67897 19.1488 3.176 19.9864 4.01358C20.824 4.85116 21.321 5.94002 21.6122 7.25007C21.9008 8.54878 22 10.1243 22 12C22 13.8757 21.9008 15.4512 21.6122 16.7499C21.321 18.06 20.824 19.1488 19.9864 19.9864C19.1488 20.824 18.06 21.321 16.7499 21.6122C15.4512 21.9008 13.8757 22 12 22C10.1243 22 8.54878 21.9008 7.25007 21.6122C5.94002 21.321 4.85116 20.824 4.01358 19.9864C3.176 19.1488 2.67897 16.7499 2.38782 16.7499C2.0992 15.4512 2 13.8757 2 12C2 10.1243 2.0992 8.54878 2.38782 7.25007C2.67897 5.94002 3.176 4.85116 4.01358 4.01358C4.85116 3.176 5.94002 2.67897 7.25007 2.38782Z"
      />
    </svg>
  </span>
);

export const SaveIcon = ({
  depth,
  variableName,
  hueShift,
  depthShift,
}: IconProps) => (
  <span
    style={{ color: levelAccent(depth, variableName, hueShift, depthShift) }}
    aria-hidden
  >
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3 9C3 6.17157 3 4.75736 3.87868 3.87868C4.75736 3 6.17157 3 9 3H15.3431C16.1606 3 16.5694 3 16.9369 3.15224C17.3045 3.30448 17.5935 3.59351 18.1716 4.17157L19.8284 5.82843C20.4065 6.40649 20.6955 6.69552 20.8478 7.06306C21 7.4306 21 7.83935 21 8.65685V15C21 17.8284 21 19.2426 20.1213 20.1213C19.48 20.7626 18.5534 20.9359 17 20.9827V18C17 17.2843 17 16.6965 16.9362 16.2208C16.8663 15.7015 16.7042 15.1687 16.2678 14.7322C15.8313 14.2958 15.2985 14.1337 14.7792 14.0638C14.3034 13.9999 13.7157 13.9999 13 14H10C9.28427 13.9999 8.69655 13.9999 8.22084 14.0638C7.70149 14.1337 7.16867 14.2958 6.73223 14.7322C6.29579 15.1687 6.13366 15.7015 6.06383 16.2208C5.99988 16.6965 5.99993 17.2843 6 18V20.9239C5.02491 20.828 4.36857 20.6112 3.87868 20.1213C3 19.2426 3 17.8284 3 15V9ZM15 18V21H9C8.64496 21 8.31221 21 8 20.9983V18C8 17.2646 8.00212 16.8137 8.046 16.4873C8.08457 16.2005 8.13942 16.1526 8.14592 16.1469L8.14645 16.1464L8.14692 16.1459C8.1526 16.1394 8.20049 16.0846 8.48734 16.046C8.81369 16.0021 9.26462 16 10 16H13C13.7354 16 14.1863 16.0021 14.5127 16.046C14.7995 16.0846 14.8474 16.1394 14.8531 16.1459L14.8536 16.1464L14.8541 16.1469C14.8606 16.1526 14.9154 16.2005 14.954 16.4873C14.9979 16.8137 15 17.2646 15 18ZM7 7C6.44772 7 6 7.44772 6 8C6 8.55228 6.44772 9 7 9H12C12.5523 9 13 8.55228 13 8C13 7.44772 12.5523 7 12 7H7Z"
      />
    </svg>
  </span>
);

export const DiscardIcon = ({
  depth,
  variableName,
  hueShift,
  depthShift,
}: IconProps) => (
  <span
    style={{ color: levelAccent(depth, variableName, hueShift, depthShift) }}
    aria-hidden
  >
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.7071 4.29289C11.0976 4.68342 11.0976 5.31658 10.7071 5.70711L8.41421 8H13.5C16.5376 8 19 10.4624 19 13.5C19 16.5376 16.5376 19 13.5 19H11C10.4477 19 10 18.5523 10 18C10 17.4477 10.4477 17 11 17H13.5C15.433 17 17 15.433 17 13.5C17 11.567 15.433 10 13.5 10H8.41421L10.7071 12.2929C11.0976 12.6834 11.0976 13.3166 10.7071 13.7071C10.3166 14.0976 9.68342 14.0976 9.29289 13.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289L9.29289 4.29289C9.68342 3.90237 10.3166 3.90237 10.7071 4.29289Z"
      />
    </svg>
  </span>
);
